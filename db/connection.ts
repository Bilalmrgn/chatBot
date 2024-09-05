import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//mongodb bağlantısı
export const connectionDatabase = async ()=>{
    try {
        const mongoUrl = process.env.MONGODB_URL|| 'mongodb+srv://bilalmergen:DRxtC0CPtYZftEaQ@chatgpt.fo0us.mongodb.net/?retryWrites=true&w=majority&appName=chatgpt'
        await mongoose.connect(mongoUrl);
    } catch (error) {
        console.log('Database e baglanirken bir hata olustu');
    }
}