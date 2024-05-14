import mongoose from "mongoose";

export const ConnectDB = async()=>{
    try {
        let db = await mongoose.connect(process.env.MONGO_URI)
        console.log(`connected database on port ${db.connection.port} and host ${db.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}