import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongoDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MongoDB URI is not defined');
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB successfully connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectMongoDB;



// dbConnect.js
// import mongoose from 'mongoose';

// const connectMongoDB = async () => {
//     const uri = process.env.MONGODB_URI;

//     // Debug log to ensure URI is loaded
//     // console.log('MongoDB URI:', uri);

//     if (!uri) {
//         throw new Error('MongoDB URI is not defined');
//     }

//     let cached = global.mongoose;

//     if (!cached) {
//         cached = global.mongoose = { conn: null, promise: null };
//     }

//     if (cached.conn) {
//         return cached.conn;
//     }

//     if (!cached.promise) {
//         const opts = {
//           bufferCommands: false,
//         };
    
//         cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
//           console.log('MongoDB successfully connected');
//           return mongoose;
//         });
//     }

//     try {
//         cached.conn = await cached.promise;
//     } catch (error) {
//         cached.promise = null;
//         throw 0;
//     }

//     return cached.conn;
// }

// export default connectMongoDB;
