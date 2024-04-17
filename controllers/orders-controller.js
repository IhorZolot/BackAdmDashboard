import Order from '../models/Order.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getOrderAll = async (req, res) => {
	const { _id: owner } = req.user
	const result = await Order.find({ owner }, '-createdAt -updatedAt').populate('owner', ' username email')
	res.json(result)
}

const getOrderByFilter = async (req, res) => {
	const { id } = req.params
	const result = await Order.findById(id)
	if (!result) {
		throw HttpError(404, `Order with id=${id} not found`)
	}
	res.json(result)
}

const getFilteredAndSortedOrders = async (req, res) => {
	const { sortField, sortOrder, filterField, filterValue } = req.query

	const filterConditions = {}
	if (filterField && filterValue) {
		filterConditions[filterField] = filterValue
	}
	const sortOptions = {}
	if (sortField && ['asc', 'desc'].includes(sortOrder)) {
		sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1
	}
	const orders = await Order.find(filterConditions).sort(sortOptions)
	res.json(orders)
}

export default {
	getOrderAll: ctrlWrapper(getOrderAll),
	getFilteredAndSortedOrders: ctrlWrapper(getFilteredAndSortedOrders),
	getOrderByFilter: ctrlWrapper(getOrderByFilter),
}
