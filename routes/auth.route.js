import express from 'express'
import { registerAdmin, loginAdmin, getCurrentlyLoggedIn } from '../controllers/auth.controller.js'
import { protectAuthMiddleware } from '../middlewares/auth.js'

const router = express.Router()


router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.get('/current', protectAuthMiddleware, getCurrentlyLoggedIn)


export default router