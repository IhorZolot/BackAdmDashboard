import { ctrlWrapper } from '../decorators/index.js'

import Product from '../models/Product.js'
import Customer from '../models/Customer.js'
import Supplier from '../models/Supplier.js'
import IncomeExpenses from '../models/IncomeExpenses.js'

const getDashboardAll = async (req, res) => {
	const { page = 1, limit = 5 } = req.query
	const skip = (page - 1) * limit

	const productCount = await Product.countDocuments()
	const customerCount = await Customer.countDocuments()
	const supplierCount = await Supplier.countDocuments()

	// const customerCountAll = await Customer.find({}, 'name email spent address', { skip, limit })

	const customerCountAll = await Customer.find({}, '-createdAt -updatedAt', { skip, limit })
	const IncomeExpensesResult = await IncomeExpenses.find({}, '-createdAt -updatedAt', { skip, limit: 6 })

	const dashboardData = {
		productCount,
		customerCount,
		supplierCount,
		customerCountAll,
		IncomeExpensesResult,
	}

	res.json(dashboardData)
}

export default {
	getDashboardAll: ctrlWrapper(getDashboardAll),
}
