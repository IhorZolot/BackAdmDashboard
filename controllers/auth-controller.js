import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'

import User from '../models/User.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const { JWT_SECRET } = process.env

const signup = async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	if (user) {
		throw HttpError(409, 'Email already in use!')
	}
	if (!email || !password) {
		return res.status(400).json({ error: 'All fields must be filled' })
	}
	const hashPassword = await bcrypt.hash(password, 10)
	const verificationToken = nanoid()
	const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken })

	res.status(201).json({
		name: newUser.name,
		email: newUser.email,
	})
}
const signin = async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	if (!user) {
		throw HttpError(401, 'Email or password invalid')
	}
	const passwordCompare = await bcrypt.compare(password, user.password)
	if (!passwordCompare) {
		throw HttpError(401, 'Email or password invalid')
	}
	const payload = {
		id: user._id,
	}
	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '64d' })
	await User.findByIdAndUpdate(user._id, { token })
	res.json({ token, email: user.email })
}
const getUserInfo = async (req, res) => {
	const { name, email } = req.user
	res.json({ name, email })
}
const signout = async (req, res) => {
	const { _id } = req.user
	await User.findByIdAndUpdate(_id, { token: '' })
	res.json({
		message: 'Signout success',
	})
}

export default {
	signup: ctrlWrapper(signup),
	signin: ctrlWrapper(signin),
	signout: ctrlWrapper(signout),
	getUserInfo: ctrlWrapper(getUserInfo),
}
