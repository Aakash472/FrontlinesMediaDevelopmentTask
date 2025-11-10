import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log("Connection Failed", err))

const companiesDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    employees: {
        type: Number,
        required: true
    },
    website: {
        type: String,
        required: true
    }
})

export const data = mongoose.model('companiesdata',companiesDataSchema)