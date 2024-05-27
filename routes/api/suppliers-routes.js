import express from 'express'
import suppliersController from '../../controllers/suppliers-controller.js'
import { validateBody } from '../../decorators/index.js'
import { authenticate, isValidId } from '../../middlewares/index.js'
import { suppliersAddSchema, suppliersUpdateSchema } from '../../models/Supplier.js'

const suppliersRouter = express.Router()
suppliersRouter.use(authenticate)

suppliersRouter.get('/', suppliersController.getSupplierAll)
suppliersRouter.get('/filtered', suppliersController.getFilteredAndSortedSuppliers)
suppliersRouter.get('/status', suppliersController.getStatusSuppliers)
suppliersRouter.post('/add', validateBody(suppliersAddSchema), suppliersController.addSupplier)
suppliersRouter.put(
	'/update/:id',
	isValidId,
	// validateBody(suppliersUpdateSchema),
	suppliersController.updateSupplierById
)
suppliersRouter.delete('/remove/:id', isValidId, suppliersController.deleteSupplierById)

export default suppliersRouter
