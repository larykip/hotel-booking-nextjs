import mongoose from "mongoose";

/**
 * Connects to the MongoDB database.
 * @returns {Promise<mongoose.Connection>} A promise that resolves to the mongoose connection.
 */
const connectMongoDB = async () => {
	const uri = process.env.MONGODB_URI;

	// Debug log to ensure URI is loaded
	// console.log('MongoDB URI:', uri);

	if (!uri) {
		throw new Error("MongoDB URI is not defined");
	}

	let cached = global.mongoose;

	if (!cached) {
		cached = global.mongoose = { conn: null, promise: null };
	}

	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};

		cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
			console.log("MongoDB successfully connected");
			return mongoose;
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (error) {
		cached.promise = null;
		throw error;
	}

	return cached.conn;
};

export default connectMongoDB;
