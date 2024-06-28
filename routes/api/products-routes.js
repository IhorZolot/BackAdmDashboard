import express from 'express'
import productsController from '../../controllers/products-controller.js'
import { validateBody } from '../../decorators/index.js'
import { productAddSchema, productUpdateSchema } from '../../models/Product.js'
import { authenticate, isValidId } from '../../middlewares/index.js'

const productsRouter = express.Router()
productsRouter.use(authenticate)

productsRouter.get('/', productsController.getProductAll)
productsRouter.get('/filtered', productsController.getFilteredAndSortedProducts)
productsRouter.get('/categories', productsController.getCategoryAll)
productsRouter.get('/:id', isValidId, productsController.getProductById)
productsRouter.post('/add', validateBody(productAddSchema), productsController.addProduct)
productsRouter.put('/update/:id', isValidId, validateBody(productUpdateSchema),productsController.updateProductById)
productsRouter.delete('/remove/:id', isValidId, productsController.deleteProductById)

export default productsRouter


