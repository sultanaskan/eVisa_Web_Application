import mongoose from 'mongoose';
//mongosh "mongodb+srv://cluster0.3hfxo0p.mongodb.net/" --apiVersion 1 --username sultanahmedaskan_db_user --password F1bAxVWk0C2tCyTz
//mongodb+srv://sultanahmedaskan_db_user:F1bAxVWk0C2tCyTz@cluster0.3hfxo0p.mongodb.net/
const mongoDB = async () => {
    await mongoose.connect(process.env.MONGO_URI,);
    console.log('MongoDB connected successfully');
};

export default mongoDB;