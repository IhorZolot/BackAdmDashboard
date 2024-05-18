import Product from '../models/Product.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getProductAll = async (req, res) => {
	const { page = 1, limit = 5 } = req.query
	const skip = (page - 1) * limit
	const result = await Product.find({}, '-createdAt -updatedAt', { skip, limit })
	res.json(result)
}
const getCategoryAll = async (req, res) => {
	const result = await Product.find({}, 'category')
	res.json([...new Set(result.map(item => item.category))])
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
	const result = await Product.create(req.body)
	res.status(201).json(result)
}
const updateProductById = async (req, res) => {
	const { id } = req.params
	console.log(id)
	const result = await Product.findByIdAndUpdate(id, req.body)
	if (!result) {
		console.log(req.body)
		throw HttpError(404, `Product with id=${id} not found`)
	}
	res.json(result)
}
const deleteProductById = async (req, res) => {
	const { id } = req.params
	console.log(`Attempting to delete product with id=${id}`)
	const result = await Product.findByIdAndDelete(id)
	if (!result) {
		throw HttpError(404, `Product with id=${id} not found`)
	}
	console.log(id)
	res.json({ message: 'Delete success' })
}

export default {
	getProductAll: ctrlWrapper(getProductAll),
	getProductById: ctrlWrapper(getProductById),
	addProduct: ctrlWrapper(addProduct),
	updateProductById: ctrlWrapper(updateProductById),
	deleteProductById: ctrlWrapper(deleteProductById),
	getCategoryAll: ctrlWrapper(getCategoryAll),
}
