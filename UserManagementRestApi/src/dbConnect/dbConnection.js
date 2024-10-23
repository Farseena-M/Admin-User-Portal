import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
import path from 'path';


const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({ path: path.join(__dirname, '.env') });


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONN_STR, { dbName: 'usermanagement' });
        console.log(`DB connected`);
    } catch (error) {
        console.log(error);
    }
};
