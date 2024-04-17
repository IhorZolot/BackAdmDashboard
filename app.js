import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import 'dotenv/config'

import authRouter from './routes/api/auth-routes.js'
import dashboardRouter from './routes/api/dashboard-routes.js'
import customersRouter from './routes/api/customers-routes.js'
import productsRouter from './routes/api/products-routes.js'
import ordersRouter from './routes/api/orders-routes.js'
import suppliersRouter from './routes/api/suppliers-routes.js'
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/user', authRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/products', productsRouter)
app.use('/api/customers', customersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/suppliers', suppliersRouter)

app.use((req, res) => {
	res.status(404).json({
		message: 'Not found',
	})
})
app.use((err, req, res, next) => {
	const { status = 500, message } = err
	res.status(status).json({
		message,
	})
})

export default app
