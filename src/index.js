import express from 'express'
import morgan from 'morgan'
import { PORT } from './config/config.js'
import userRoutes from './routes/user.routes.js'
import incidentRoutes from './routes/incident.routes.js'
import { validateCORS } from './middlewares/middleware.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use(validateCORS)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/incidents', incidentRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
