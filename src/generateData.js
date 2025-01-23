import dotenv from 'dotenv';
import { generateFakeData } from "./lib/testData/generateFakeData.js";

// Load environment variables
dotenv.config();

// This function is intended to asynchronously generate fake data and log it to the console when called through 'npm run generate'.
// If an error occurs during the data generation process, it will be caught and logged to the console.
const run = async () => {
	try {
		const result = await generateFakeData();
		console.log(result);
		process.exit(0);
	} catch (error) {
		console.error("Error generating fake data:", error);
		process.exit(1);
	}
};

run();
