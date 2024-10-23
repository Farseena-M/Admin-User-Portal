import express from 'express'
import { addUser, deleteUser, editUser, getUserProfile, userLogin } from '../Controllers/userController.js'
import { adminVerifyToken } from '../utils/adminVerifyToken.js'
import { userVerifyToken } from '../utils/userVerifyToken.js'
const userRouter = express.Router()


userRouter.post('/adduser', adminVerifyToken, addUser)
userRouter.patch('/:id', adminVerifyToken, editUser)
userRouter.delete('/:id', adminVerifyToken, deleteUser)
userRouter.post('/login', userLogin)
userRouter.get('/profile/:userId', userVerifyToken, getUserProfile)


export default userRouter