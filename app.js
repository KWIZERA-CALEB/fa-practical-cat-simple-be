import express from 'express'
import { connectDB } from './config/db.js'
import { config } from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.route.js'
config()


const app = express()

const corsOptions = {
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}


app.use(express.json())
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRoutes)



const dbConnectionString = process.env.NODE_ENV === "production" ? process.env.PROD_CONNECTION_STRING : process.env.DEV_CONNECTION_STRING

app.listen(4000, () => {
    console.log(`App running on port: ${4000}`)
    connectDB(dbConnectionString)
})