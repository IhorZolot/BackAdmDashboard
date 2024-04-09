import Product from '../models/Product.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getAll = async (req, res) => {
	const result = await Product.find()
	res.json(result)
}
const getById = async (req, res) => {
	const { id } = req.params
	const result = await Product.findById(id)
	if (!result) {
		throw HttpError(404, `Product with id=${id} not found`)
	}
	res.json(result)
}
const addProduct = async (req, res) => {
	const result = await Product.create(req.body)
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
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	addProduct: ctrlWrapper(addProduct),
	updateProductById: ctrlWrapper(updateProductById),
	deleteProductById: ctrlWrapper(deleteProductById),
}
