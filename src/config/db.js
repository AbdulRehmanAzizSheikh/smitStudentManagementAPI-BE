import mongoose from "mongoose";
let isConnected = false;


const connectDB = async()=>{
    try{
        if (isConnected) {
            return;
        }
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected", connectionInstance.connection.host)
        isConnected = true
    }
    catch(err){
        console.log("Error connecting to MongoDB", err)
        process.exit(1)
    }
}

export default connectDB