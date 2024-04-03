import Customer from '../models/Customer.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getAll = async (req, res) => {
	// const { _id: owner } = req.user
	const { page = 1, limit = 5 } = req.query
	const skip = (page - 1) * limit
	const result = await Customer.find({}, null, { skip, limit })
	// const result = await Customer.find({}, '-createdAt -updatedAt', { skip, limit }).populate('owner', 'username email')
	res.json(result)
}

export default {
	getAll: ctrlWrapper(getAll),
}
