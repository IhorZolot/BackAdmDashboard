import express from 'express'
import productsController from '../../controllers/products-controller.js'
import { validateBody } from '../../decorators/index.js'
import { productAddSchema, productUpdateSchema } from '../../models/Product.js'
import { authenticate, isValidId } from '../../middlewares/index.js'

const productsRouter = express.Router()
productsRouter.use(authenticate)

productsRouter.get('/', productsController.getProductAll)
productsRouter.get('/categories', productsController.getCategoryAll)
productsRouter.get('/:id', isValidId, productsController.getProductById)
productsRouter.post('/', validateBody(productAddSchema), productsController.addProduct)
productsRouter.put('/:id', isValidId, validateBody(productUpdateSchema), productsController.updateProductById)
productsRouter.delete('/:id', isValidId, productsController.deleteProductById)

export default productsRouter
