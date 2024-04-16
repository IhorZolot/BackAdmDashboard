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
})

const Customer = model('customer', customerSchema)

export default Customer
