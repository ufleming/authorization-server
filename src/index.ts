import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { join } from 'path'
import authRouter from './routes/auth'

dotenv.config()

enum Route {
  Root = '/',
  Auth = '/auth',
}

const PORT = process.env.PORT
const corsOptions = { credentials: true, origin: process.env.URL }
const app = express()

app.use(express.static(join(__dirname, '../public')))
app.use(cors(corsOptions))
app.use(json())
app.use(cookieParser())
app.use(Route.Auth, authRouter)

app.get(Route.Root, (req, res) => res.render('index.html'))

app.listen(PORT, () => console.log('Server is listening'))
