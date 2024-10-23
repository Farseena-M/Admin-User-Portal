import express from 'express'
import { addUser, deleteUser, editUser, getUserById, getUserProfile, getUsers } from '../Controllers/userController.js'
import { restrict, verifyToken } from '../utils/verifyToken.js'
import { userLogin } from '../Controllers/authController.js'
const userRouter = express.Router()


userRouter.post('/adduser', verifyToken, restrict(['admin']), addUser)
userRouter.get('/all', verifyToken, restrict(['admin']), getUsers)
userRouter.get('/:id', verifyToken, restrict(['admin']), getUserById)
userRouter.patch('/:id', verifyToken, restrict(['admin']), editUser)
userRouter.delete('/:id', verifyToken, restrict(['admin']), deleteUser)
userRouter.get('/profile/:userId', verifyToken, restrict(['user']), getUserProfile)
userRouter.post('/login', userLogin)


export default userRouter