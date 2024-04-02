import express from 'express'
import customersController from '../../controllers/customers-controller.js'

const customersRouter = express.Router()

customersRouter.get('/', customersController.getAll)

export default customersRouter
