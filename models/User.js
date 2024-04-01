import { Schema, model } from 'mongoose'
import Joi from 'joi'

import { handleSaveError, preUpdate } from '../hooks/hooks.js'
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema(
	{
		email: {
			type: String,
			match: emailRegexp,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			minlength: 6,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
)

userSchema.post('save', handleSaveError)
userSchema.pre('findOneAndUpdate', preUpdate)
userSchema.post('findOneAndUpdate', handleSaveError)

export const userSinginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
})

const User = model('user', userSchema)
export default User