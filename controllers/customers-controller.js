import Customer from '../models/Customer.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getCustomerAll = async (req, res) => {
	const { _id: owner } = req.user
	const { page = 1, limit = 5 } = req.query
	const skip = (page - 1) * limit
	const result = await Customer.find({ owner }, '-createdAt -updatedAt', { skip, limit }).populate(
		'owner',
		' username email'
	)
	res.json(result)
}
const getCustomerById = async (req, res) => {
	const { id } = req.params
	const result = await Customer.findById(id)
	if (!result) {
		throw HttpError(404, `Customer with id=${id} not found`)
	}
	res.json(result)
}

export default {
	getCustomerAll: ctrlWrapper(getCustomerAll),
	getCustomerById: ctrlWrapper(getCustomerById),
}
