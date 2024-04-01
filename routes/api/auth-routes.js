import express from 'express'
import authController from '../../controllers/auth-controller.js'
import { validateBody } from '../../decorators/index.js'
import { userSingupSchema, userSinginSchema } from '../../models/User.js'

const authRouter = express.Router()

authRouter.post('/singup', validateBody(userSingupSchema), authController.singup)

export default authRouter
