import express from 'express'
import ordersController from '../../controllers/orders-controller.js'
import { authenticate, isValidId } from '../../middlewares/index.js'

const ordersRouter = express.Router()
ordersRouter.use(authenticate)

ordersRouter.get('/', ordersController.getOrderAll)
ordersRouter.get('/filtered', ordersController.getFilteredAndSortedOrders)
ordersRouter.get('/:id', isValidId, ordersController.getOrderByFilter)
export default ordersRouter
