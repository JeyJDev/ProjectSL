import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import teamRoutes from './routes/team.routes.js';
import solicitudesRoutes from './routes/solicitudes.routes.js'

import { FRONTEND_URL } from './config.js'


const app = express()

app.use(cors({
    origin: "https://ligasupremacia.netlify.app",
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', teamRoutes)
app.use('/api', solicitudesRoutes)

export default app
