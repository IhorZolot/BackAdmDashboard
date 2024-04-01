import mongoose from 'mongoose'
// import { DB_HOST } from './config.js'
import app from './app.js'

mongoose
	.connect(process.env.DB_HOST)
	.then(() => {
		app.listen(3000, () => {
			console.log('Server running. Use our API on port: 3000')
		})
	})
	.catch(error => {
		console.log(error.message)
		process.exit(1)
	})
