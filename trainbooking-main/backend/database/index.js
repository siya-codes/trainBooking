import 'dotenv/config'
import mongoose from 'mongoose';

export async function Connection() {
    mongoose.set('debug', true);
    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    if (db) {
        console.log("Database connected successfully");
    } else {
        console.log("Database not connected");
    }
}


