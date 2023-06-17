import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { join } from 'path'
import usersRouter from './routes/users'

dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()
const corsOptions = { credentials: true, origin: process.env.URL || '*' }

app.use(express.static(join(__dirname, '../public')))
app.use(cors(corsOptions))
app.use(json())
app.use(cookieParser())
app.use('/api/users', usersRouter)

app.get('/', (req, res) => res.render('index.html'))

app.listen(PORT, () => console.log('Server is listening'))
