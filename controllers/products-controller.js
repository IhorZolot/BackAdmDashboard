import Product from '../models/Product.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getProductAll = async (req, res) => {
	const { page = 1, limit = 5 } = req.query
	const skip = (page - 1) * limit
	const result = await Product.find({}, '-createdAt -updatedAt', { skip, limit })
	const total = await Product.countDocuments()
	const totalPages = Math.ceil(total / limit)
	res.json({ data: result, pages: totalPages, currentPage: parseInt(page), perPage: parseInt(limit) })
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

	const result = await Product.findByIdAndUpdate(id, req.body, { new: true })
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
const getFilteredAndSortedProducts = async (req, res) => {
	const { sortField, sortValue, filterField, filterValue } = req.query

	const filterConditions = {}
	if (filterField && filterValue) {
		filterConditions[filterField] = { $regex: filterValue, $options: 'i' }
	}
	const sortOptions = {}
	if (sortField && ['asc', 'desc'].includes(sortValue)) {
		sortOptions[sortField] = sortValue === 'asc' ? 1 : -1
	}
	const products = await Product.find(filterConditions).sort(sortOptions)
	res.json(products)
}

export default {
	getProductAll: ctrlWrapper(getProductAll),
	getProductById: ctrlWrapper(getProductById),
	addProduct: ctrlWrapper(addProduct),
	updateProductById: ctrlWrapper(updateProductById),
	deleteProductById: ctrlWrapper(deleteProductById),
	getCategoryAll: ctrlWrapper(getCategoryAll),
	getFilteredAndSortedProducts: ctrlWrapper(getFilteredAndSortedProducts),
}
