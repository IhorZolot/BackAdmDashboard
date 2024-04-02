import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const { JWT_SECRET } = process.env

const singup = async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	if (user) {
		throw HttpError(409, 'Email already in use!')
	}
	const hashPassword = await bcrypt.hash(password, 10)
	const newUser = await User.create({ ...req.body, password: hashPassword })
	res.status(201).json({
		email: newUser.email,
	})
}
const singin = async (req, res) => {
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
	res.json({ token })
}

export default {
	singup: ctrlWrapper(singup),
	singin: ctrlWrapper(singin),
}
