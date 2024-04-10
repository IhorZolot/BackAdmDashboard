import express from 'express'
import ordersController from '../../controllers/orders-controller.js'

const ordersRouter = express.Router()

ordersRouter.get('/', ordersController.getOrderAll)
ordersRouter.get('/:id', ordersController.getOrderByFilter)
export default ordersRouter
