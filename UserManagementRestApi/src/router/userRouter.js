import express from 'express'
import { addUser, deleteUser, editUser, getUserById, getUserProfile, getUsers, userLogin } from '../Controllers/userController.js'
import { adminVerifyToken } from '../utils/adminVerifyToken.js'
import { userVerifyToken } from '../utils/userVerifyToken.js'
const userRouter = express.Router()


userRouter.post('/adduser', adminVerifyToken, addUser)
userRouter.get('/all', adminVerifyToken, getUsers)
userRouter.get('/:id', adminVerifyToken, getUserById)
userRouter.patch('/:id', adminVerifyToken, editUser)
userRouter.delete('/:id', adminVerifyToken, deleteUser)
userRouter.post('/login', userLogin)
userRouter.get('/profile/:userId', userVerifyToken, getUserProfile)


export default userRouter