import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const connectionDB = async()=>{
     try {
        console.log(process.env.MONGO_URI);
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log("Jai Shree Ram Data Base is Connected..");
     } catch (error) {
        console.log("Got an error in connections..");
     }
}
