import mongoose from 'mongoose'


export const connectDB = async (connectionString) => {
    try {
        const isConnected = await mongoose.connect(connectionString)

        if (isConnected) {
            console.log('App DB connected successfully')
        } else {
            console.log('Failed to connect to DB')
        }
    } catch(error) {
        console.log(`Error ${error}`)
    }
}