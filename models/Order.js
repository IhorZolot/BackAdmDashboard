import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
	photo: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	products: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	order_date: {
		type: String,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'product',
		required: true,
	},
})

const Order = model('order', orderSchema)
export default Order
