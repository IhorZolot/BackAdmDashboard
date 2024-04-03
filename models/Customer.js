import { Schema, model } from 'mongoose'
import Joi from 'joi'

import { handleSaveError, preUpdate } from '../hooks/hooks.js'

const customerSchema = new Schema({
	photo: {
		type: String,
	},
	image: {
		type: String,
	},
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	spent: {
		type: String,
	},
	phone: {
		type: String,
	},
	address: {
		type: String,
	},
	register_date: {
		type: String,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
})
customerSchema.post('save', handleSaveError)
customerSchema.pre('findOneAndUpdate', preUpdate)
customerSchema.post('findOneAndUpdate', handleSaveError)

const Customer = model('customer', customerSchema)

export default Customer
