import express from 'express'
import suppliersController from '../../controllers/suppliers-controller.js'
import { validateBody } from '../../decorators/index.js'
import { authenticate, isValidId } from '../../middlewares/index.js'
import { suppliersAddSchema, suppliersUpdateSchema } from '../../models/Supplier.js'

const suppliersRouter = express.Router()
suppliersRouter.use(authenticate)

suppliersRouter.get('/', suppliersController.getSupplierAll)
suppliersRouter.post('/', validateBody(suppliersAddSchema), suppliersController.addSupplier)
suppliersRouter.put('/:id', isValidId, validateBody(suppliersUpdateSchema), suppliersController.updateSupplierById)
suppliersRouter.delete('/:id', isValidId, suppliersController.deleteSupplierById)

export default suppliersRouter
