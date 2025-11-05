import AdminModel from "../models/admin.model.js";
import { generateToken } from "../utils/generate-token.js";
import { hashPassword } from "../utils/hash-password.js";
import bcrypt from "bcryptjs";


export const registerAdmin = async (req, res) => {
    try {
        const { phoneNumber, username, password } = req.body




        if(!phoneNumber || !username || !password) {
            return res.status(401).json({
                message: "Please fill all fields"
            })
        }


        const admin = await AdminModel.findOne({ username })

        if (admin) {
            return res.status(401).json({
                message: "Username used by another admin"
            })
        }

        const hashedPassword = await hashPassword(password)

        const isRegistered = await AdminModel.create({ phoneNumber, username, password: hashedPassword })

        if (isRegistered) {
            return res.status(201).json({
                message: "You are registered"
            })
        }
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}


export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body

        if(!username || !password) {
            return res.status(401).json({
                message: "Please fill all fields"
            })
        }


        const admin = await AdminModel.findOne({ username })

        if (!admin) {
            return res.status(401).json({
                message: "Incorrect credentials"
            })
        }

        const isPasswordMatching = await bcrypt.compare(password, admin.password)

        if (isPasswordMatching) {
            const token = await generateToken({ adminId: admin._id, username: admin.username })

            return res.status(200).json({
                message: "logged in",
                token: token
            })
        } else {
            return res.status(401).json({
                message: "Incorrect credentials"
            })
        }
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}


export const getCurrentlyLoggedIn = async (req, res) => {
    try {
        const user = req.user
        const userLoggedIn = await AdminModel.findById({ _id: user.adminId }).select('-password')

        if (!userLoggedIn) {
            return res.status(404).json({
                message: "No logged in user"
            })
        } else {
            return res.status(200).json({
                user: userLoggedIn
            })
        }

    } catch(error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}
