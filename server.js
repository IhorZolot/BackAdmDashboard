import mongoose from 'mongoose'

import app from './app.js'
//rPhltpjtjvU97VU5
const DB_HOST =
	'mongodb+srv://Ihor:rPhltpjtjvU97VU5@cluster0.mpwnoo8.mongodb.net/admin-pharmacy?retryWrites=true&w=majority&appName=Cluster0'
mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(300, () => {
			console.log('Server running. Use our API on port: 3000')
		})
	})
	.catch(error => {
		console.log(error.message)
		process.exit(1)
	})
