import express from 'express'
import customersController from '../../controllers/customers-controller.js'
import { authenticate, isValidId } from '../../middlewares/index.js'

const customersRouter = express.Router()
customersRouter.use(authenticate)

customersRouter.get('/', customersController.getCustomerAll)
customersRouter.get('/filtered', customersController.getFilteredAndSortedCustomers),
	customersRouter.get('/:id', isValidId, customersController.getCustomerById)

export default customersRouter
