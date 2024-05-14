import express from 'express'
import dashboardController from '../../controllers/dashboard-controller.js'
import authenticate from '../../middlewares/authenticate.js'

const dashboardRouter = express.Router()
dashboardRouter.use(authenticate)

dashboardRouter.get('/', dashboardController.getDashboardAll)

export default dashboardRouter
