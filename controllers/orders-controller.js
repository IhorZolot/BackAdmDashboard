import Order from '../models/Order.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getOrderAll = async (req, res) => {
	const { page = 1, limit = 5 } = req.query
	const skip = (page - 1) * limit
	const result = await Order.find({}, '-createdAt -updatedAt', { skip, limit })
	const total = await Order.countDocuments()
	const totalPages = Math.ceil(total / limit)
	res.json({ data: result, pages: totalPages, currentPage: parseInt(page), perPage: parseInt(limit) })
}

const getFilteredAndSortedOrders = async (req, res) => {
	const { sortField, sortValue, filterField, filterValue, page = 1, limit = 5 } = req.query

	const pageInt = parseInt(page);
	const limitInt = parseInt(limit);
	const skip = (pageInt - 1) * limitInt;

	const filterConditions = {}
	if (filterField && filterValue) {
		filterConditions[filterField] = { $regex: filterValue, $options: 'i' }
	}
	const sortOptions = {}
	if (sortField && ['asc', 'desc'].includes(sortValue)) {
		sortOptions[sortField] = sortValue === 'asc' ? 1 : -1
	}

	const totalOrders = await Order.countDocuments(filterConditions);
		const totalPages = Math.ceil(totalOrders / limitInt);

	const orders = await Order.find(filterConditions, '-createdAt -updatedAt').sort(sortOptions).skip(skip).limit(limitInt)

	res.json({
		data: orders,
		totalPages,
		currentPage: pageInt,
		perPage: limitInt
	})
}

const getOrderByFilter = async (req, res) => {
	const { id } = req.params
	const result = await Order.findById(id)
	if (!result) {
		throw HttpError(404, `Order with id=${id} not found`)
	}
	res.json(result)
}

export default {
	getOrderAll: ctrlWrapper(getOrderAll),
	getFilteredAndSortedOrders: ctrlWrapper(getFilteredAndSortedOrders),
	getOrderByFilter: ctrlWrapper(getOrderByFilter),
}
