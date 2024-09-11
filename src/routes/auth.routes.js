import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import { validateToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/login', AuthController.login)
router.get('/me', validateToken, AuthController.me)

export default router
