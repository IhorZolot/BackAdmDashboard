import Supplier from '../models/Supplier.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getSupplierAll = async (req, res) => {
	const { page = 1, limit = 5 } = req.query
	const skip = (page - 1) * limit
	const result = await Supplier.find({}, '-createdAt -updatedAt', { skip, limit })
	res.json(result)
}
const addSupplier = async (req, res) => {
	const result = await Supplier.create(req.body)
	res.status(201).json(result)
}

const updateSupplierById = async (req, res) => {
	const { id } = req.params
	const result = await Supplier.findByIdAndUpdate(id, req.body)
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
	updateSupplierById: ctrlWrapper(updateSupplierById),
	deleteSupplierById: ctrlWrapper(deleteSupplierById),
}
