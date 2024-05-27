import Customer from '../models/Customer.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getCustomerAll = async (req, res) => {
	const { page = 1, limit = 5 } = req.query
	const skip = (page - 1) * limit
	const result = await Customer.find({}, '-createdAt -updatedAt', { skip, limit })
	const total = await Customer.countDocuments()
	const totalPages = Math.ceil(total / limit)
	res.json({ data: result, pages: totalPages, currentPage: parseInt(page), perPage: parseInt(limit) })
}

const getCustomerById = async (req, res) => {
	const { id } = req.params
	const result = await Customer.findById(id)
	if (!result) {
		throw HttpError(404, `Customer with id=${id} not found`)
	}
	res.json(result)
}

const getFilteredAndSortedCustomers = async (req, res) => {
	const { filterField, filterValue, sortField, sortValue } = req.query

	const filterConditions = {}
	if (filterField && filterValue) {
		filterConditions[filterField] = { $regex: filterValue, $options: 'i' }
	}
	const sortOptions = {}
	if (sortField && ['asc', 'desc'].includes(sortValue)) {
		sortOptions[sortField] = sortValue === 'asc' ? 1 : -1
	}
	const customers = await Customer.find(filterConditions).sort(sortOptions)

	res.json(customers)
}

export default {
	getCustomerAll: ctrlWrapper(getCustomerAll),
	getCustomerById: ctrlWrapper(getCustomerById),
	getFilteredAndSortedCustomers: ctrlWrapper(getFilteredAndSortedCustomers),
}
