import Product from '../models/Product.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getProductAll = async (req, res) => {
	const result = await Product.find()
	res.json(result)
}
const getProductById = async (req, res) => {
	const { id } = req.params
	const result = await Product.findById(id)
	if (!result) {
		throw HttpError(404, `Product with id=${id} not found`)
	}
	res.json(result)
}
const addProduct = async (req, res) => {
	const { _id: owner } = req.user
	const result = await Product.create(...req.body, owner)
	res.status(201).json(result)
}
const updateProductById = async (req, res) => {
	const { id } = req.params
	const result = await Product.findByIdAndUpdate(id, req.body)
	if (!result) {
		throw HttpError(404, `Product with id=${id} not found`)
	}
	res.json(result)
}
const deleteProductById = async (req, res) => {
	const { id } = req.params
	const result = await Product.findByIdAndDelete(id)
	if (!result) {
		throw HttpError(404, `Product with id=${id} not found`)
	}
	res.json({ message: 'Delete success' })
}

export default {
	getProductAll: ctrlWrapper(getProductAll),
	getProductById: ctrlWrapper(getProductById),
	addProduct: ctrlWrapper(addProduct),
	updateProductById: ctrlWrapper(updateProductById),
	deleteProductById: ctrlWrapper(deleteProductById),
}
