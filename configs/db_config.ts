import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_USER = process.env.MONGO_USER!;
const MONGO_PASS = process.env.MONGO_PASS!;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER!;
const MONGO_DB = process.env.MONGO_DB!;
 
const mongodbConnection = async()=>{
    try{
        await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}/${MONGO_DB}?appName=Cluster0`);
        console.log("Connected to MongoDB");
    }catch(err){
        console.log("Error connecting to MongoDB", err);
    }
}

export { mongodbConnection };