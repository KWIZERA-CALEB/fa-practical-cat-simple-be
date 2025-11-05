import express from 'express'
import { connectDB } from './config/db.js'
import { config } from 'dotenv'


config()


const app = express()


const dbConnectionString = process.env.NODE_ENV === "production" ? process.env.PROD_CONNECTION_STRING : process.env.DEV_CONNECTION_STRING


app.listen(4000, () => {
    console.log(`App running on port: ${4000}`)
    connectDB(dbConnectionString)
})