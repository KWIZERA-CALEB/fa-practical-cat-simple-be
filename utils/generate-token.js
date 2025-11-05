import jwt from 'jsonwebtoken'
import { config } from 'dotenv'


config()

const secretKey = process.env.JWT_SECRET

export const generateToken = async (payload) => {
    try {
        const token = await jwt.sign(payload, secretKey, { expiresIn: '7d' })
        return token
    } catch(error) {
        console.log(error)
    }
}