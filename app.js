import express from 'express'
import logger from 'morgan'
import cors from 'cors'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())

app.get('/', (req, res) => {
	res.json([])
	console.log(res)
})

app.use((req, res) => {
	res.status(404).json({
		message: 'Not found',
	})
})

export default app
