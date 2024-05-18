import express from 'express'
import cookieParser from 'cookie-parser'
import postRoutes from './routes/post.js'
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true, // Allow credentials (cookies)
}))
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

const PORT = 8000
app.listen(PORT, ()=>{
    console.log(`Listening server ${PORT}...`)
})