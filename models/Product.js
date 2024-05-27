import { Schema, model } from 'mongoose'
import Joi from 'joi'

import { handleSaveError, preUpdate } from '../hooks/hooks.js'

const productSchema = new Schema(
	{
		photo: {
			type: String,
		},
		name: {
			type: String,
			required: true,
		},
		suppliers: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
)
productSchema.post('save', handleSaveError)
productSchema.pre('findOneAndUpdate', preUpdate)
productSchema.post('findOneAndUpdate', handleSaveError)

export const productAddSchema = Joi.object({
	photo: Joi.string().uri().optional(),
	name: Joi.string().required(),
	suppliers: Joi.string().required(),
	stock: Joi.number().required(),
	price: Joi.number().required(),
	category: Joi.string().required(),
})
export const productUpdateSchema = Joi.object({
	photo: Joi.string().uri().optional(),
	name: Joi.string().optional(),
	suppliers: Joi.string().optional(),
	stock: Joi.number().optional(),
	price: Joi.number().optional(),
	category: Joi.string().optional(),
})

const Product = model('product', productSchema)
export default Product
