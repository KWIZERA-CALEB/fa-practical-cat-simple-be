import { config } from "dotenv"
import jwt from 'jsonwebtoken'

config()

const secretKey = process.env.JWT_SECRET

export const protectAuthMiddleware = async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if(!token) {
        return res.status(401).json({
            message: "Access denied login please"
        })
    }


    try {
        const decoded = jwt.verify(token, secretKey)

        req.user = decoded
        next()
    } catch(error) {
        console.log(error)
        return res.status(403).json({
            message: "Invalid token"
        })
    }
}