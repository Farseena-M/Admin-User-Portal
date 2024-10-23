import express from 'express'
import cors from 'cors'
import authRouter from './src/router/authRouter.js'
import userRouter from './src/router/userRouter.js'
const app = express()
app.use(express.json())
app.use(cors())



app.use('/api/admin',authRouter)
app.use('/api/user',userRouter)


export default app;