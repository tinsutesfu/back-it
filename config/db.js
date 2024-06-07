import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://yetesfayes:backamazon@cluster0.khtwtll.mongodb.net/tinsuMern').then(()=>console.log('db connected'))
}