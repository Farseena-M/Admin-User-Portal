import express from 'express'
import { adminLogin } from '../Controllers/authController.js'
const authRouter = express.Router()


authRouter.post('/login', adminLogin)


export default authRouter