import { Schema, model } from 'mongoose'
import Joi from 'joi'

import { handleSaveError, preUpdate } from '../hooks/hooks.js'
const suppliersSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		suppliers: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		amount: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
)
suppliersSchema.post('save', handleSaveError)
suppliersSchema.pre('findOneAndUpdate', preUpdate)
suppliersSchema.post('findOneAndUpdate', handleSaveError)

export const suppliersAddSchema = Joi.object({
	name: Joi.string().required(),
	address: Joi.string().required(),
	suppliers: Joi.string().required(),
	date: Joi.date().required(),
	amount: Joi.string().required(),
	status: Joi.string().required(),
})
export const suppliersUpdateSchema = Joi.object({
	name: Joi.string(),
	address: Joi.string(),
	suppliers: Joi.string(),
	date: Joi.date(),
	amount: Joi.string(),
	status: Joi.string(),
})
const Supplier = model('supplier', suppliersSchema)
export default Supplier
