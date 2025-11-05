import bcrypt from "bcryptjs";


const salts = 10

export const hashPassword = async (password) => {
    try {
        const isHashed = await bcrypt.hash(password, salts)
        return isHashed
    } catch(error) {
        console.log(error)
    }
}
