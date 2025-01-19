import mongoose from 'mongoose';

const password = process.env.PASSWORD;
export const ConnectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://ff3841362:IQDlLQZLBWr0Yclb@authentication-authoriz.lekep.mongodb.net/?retryWrites=true&w=majority&appName=authentication-authorization'
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Couldn't connect to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

