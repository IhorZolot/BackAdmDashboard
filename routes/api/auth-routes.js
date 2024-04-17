import express from 'express'
import authController from '../../controllers/auth-controller.js'
import { validateBody } from '../../decorators/index.js'
import { userSignupSchema, userSigninSchema } from '../../models/User.js'
import { authenticate } from '../../middlewares/index.js'

const authRouter = express.Router()

authRouter.post('/signup', validateBody(userSignupSchema), authController.signup)
authRouter.post('/login', validateBody(userSigninSchema), authController.signin)
authRouter.get('/user-info', authenticate, authController.getUserInfo)
authRouter.post('/logout', authenticate, authController.signout)

export default authRouter
