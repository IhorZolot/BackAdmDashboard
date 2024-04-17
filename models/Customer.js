import { Schema, model } from 'mongoose'

const customerSchema = new Schema(
	{
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
	},
	{ versionKey: false, timestamps: true }
)

const Customer = model('customer', customerSchema)

export default Customer
