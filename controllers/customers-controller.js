import Customer from '../models/Customer.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getAll = async (req, res) => {
	const result = await Customer.find()
	res.json(result)
}

export default {
	getAll: ctrlWrapper(getAll),
}
