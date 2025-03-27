import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async() => {
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Your database has been connected sucessfully")
    }).catch((error)=>{
        console.error("Database connection error" ,error)
    })
}

export default dbConnection();
