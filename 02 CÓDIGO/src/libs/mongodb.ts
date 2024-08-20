import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://MiguelG:Tec10000@dev.glin6fy.mongodb.net/?retryWrites=true&w=majority&appName=Dev";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};
