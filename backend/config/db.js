import mongoose from "mongoose";

export const connectDb=async()=>{
    const connect= await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo db connects and run on: ${connect.connection.host}`);
}