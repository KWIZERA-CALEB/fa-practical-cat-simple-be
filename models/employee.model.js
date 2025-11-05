import mongoose from "mongoose";


const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    hiredDate: {
        type: Date,
        default: Date.now
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: false
    }
}, { timestamps: true })


const EmployeeModel = mongoose.model('Employee', EmployeeSchema)

export default EmployeeModel