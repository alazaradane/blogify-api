import express from 'express'
import postRoutes from './routes/post.js'
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

const PORT = 8000
app.listen(PORT, ()=>{
    console.log(`Listening server ${PORT}...`)
})