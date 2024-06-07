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

	const customerCountAll = await Customer.find({}, '-createdAt -updatedAt', { skip, limit })
	const incomeExpensesResult = await IncomeExpenses.find({}, '-createdAt -updatedAt', { skip, limit: 5 })

	const dashboardData = {
		productCount,
		customerCount,
		supplierCount,
		customerCountAll,
		incomeExpensesResult,
	}

	res.json(dashboardData)
}

export default {
	getDashboardAll: ctrlWrapper(getDashboardAll),
}
