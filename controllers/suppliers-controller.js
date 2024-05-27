import Supplier from '../models/Supplier.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getSupplierAll = async (req, res) => {
	const { page = 1, limit = 5 } = req.query
	const skip = (page - 1) * limit
	const result = await Supplier.find({}, '-createdAt -updatedAt', { skip, limit })
	const total = await Supplier.countDocuments()
	const totalPages = Math.ceil(total / limit)

	res.json({ data: result, pages: totalPages, currentPage: parseInt(page), perPage: parseInt(limit) })
}
const getFilteredAndSortedSuppliers = async (req, res) => {
	const { filterField, filterValue, sortField, sortValue } = req.query

	const filterConditions = {}
	if (filterField && filterValue) {
		filterConditions[filterField] = { $regex: filterValue, $options: 'i' }
	}
	const sortOptions = {}
	if (sortField && ['asc', 'desc'].includes(sortValue)) {
		sortOptions[sortField] = sortValue === 'asc' ? 1 : -1
	}
	const suppliers = await Supplier.find(filterConditions).sort(sortOptions)

	res.json(suppliers)
}
const getStatusSuppliers = async (req, res) => {
	const result = await Supplier.find({}, 'status').lean()
	const allStatus = [...new Set(result.map(i => i.status))]
	res.json(allStatus)
}

const addSupplier = async (req, res) => {
	const result = await Supplier.create(req.body)
	res.status(201).json(result)
}

const updateSupplierById = async (req, res) => {
	const { id } = req.params
	const result = await Supplier.findByIdAndUpdate(id, req.body, { new: true })
	if (!result) {
		throw HttpError(404, `Supplier with id=${id} not found`)
	}
	res.json(result)
}
const deleteSupplierById = async (req, res) => {
	const { id } = req.params
	const result = await Supplier.findByIdAndDelete(id)
	if (!result) {
		throw HttpError(404, `Supplier with id=${id} not found`)
	}
	res.json({ message: 'Delete success' })
}

export default {
	getSupplierAll: ctrlWrapper(getSupplierAll),
	addSupplier: ctrlWrapper(addSupplier),
	getStatusSuppliers: ctrlWrapper(getStatusSuppliers),
	updateSupplierById: ctrlWrapper(updateSupplierById),
	deleteSupplierById: ctrlWrapper(deleteSupplierById),
	getFilteredAndSortedSuppliers: ctrlWrapper(getFilteredAndSortedSuppliers),
}
