import express from 'express'
import ordersController from '../../controllers/orders-controller.js'

const ordersRouter = express.Router()

ordersRouter.get('/', ordersController.getOrderAll)
ordersRouter.get('/:id', ordersController.getOrderByFilter)
ordersRouter.get('/', ordersController.getFilteredAndSortedOrders)
export default ordersRouter
