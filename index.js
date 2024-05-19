import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv  from 'dotenv'
import multer from 'multer'
import postRoutes from './routes/post.js'
import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'

const app = express();
dotenv.config();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true, // Allow credentials (cookies)
}))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../blogify-client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)
  })

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Listening server ${PORT}...`)
})
