import express from 'express'
import customersController from '../../controllers/customers-controller.js'
import { authenticate } from '../../middlewares/index.js'

const customersRouter = express.Router()
customersRouter.use(authenticate)

customersRouter.get('/', customersController.getAll)

export default customersRouter
