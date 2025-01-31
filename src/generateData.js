import dotenv from "dotenv";
import { generateFakeData } from "./lib/testData/generateFakeData.js";
import readline from "readline";

// Load environment variables
dotenv.config();

// This function is intended to asynchronously generate fake data and log it to the console when called through 'npm run generate'.
// If an error occurs during the data generation process, it will be caught and logged to the console.

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const run = async () => {
	try {
		// Get command line arguments
		const args = process.argv.slice(2);

		// Update the options object to include validate flag
		const options = {
			clear: args.includes("--clear"),
			force: args.includes("--force"),
			validate: args.includes("--validate"),
		};

		// Add this block after the clear database section in the run function
		if (options.validate) {
			console.log("Validating database...");
			const isValid = await validateDatabase();
			console.log(`Database validation ${isValid ? "passed" : "failed"}`);
			if (!options.force && !isValid) {
				const answer = await question("Database validation failed. Continue anyway? (y/N) ");
				if (answer.toLowerCase() !== "y") {
					console.log("Operation cancelled");
					process.exit(0);
				}
			}
		}

		// Handle clear flag
		if (options.clear) {
			if (!options.force) {
				const answer = await question("Warning: --clear flag will delete ALL existing data. Continue? (y/N) ");
				if (answer.toLowerCase() !== "y") {
					console.log("Operation cancelled");
					process.exit(0);
				}
			}
			await clearDatabase(); // You'll need to implement this function
		}

		if (!options.force) {
			const answer = await question("This will generate new data. Existing data may be affected. Continue? (y/N) ");
			if (answer.toLowerCase() !== "y") {
				console.log("Operation cancelled");
				process.exit(0);
			}
		}

		const result = await generateFakeData(options);
		console.log(result);

		if (result.stats) {
			console.log("\nDatabase Statistics:");
			console.log("Before:");
			console.table(result.stats.before);
			console.log("After:");
			console.table(result.stats.after);
		}

		process.exit(result.success ? 0 : 1);
	} catch (error) {
		console.error("Error generating fake data:", error);
		process.exit(1);
	} finally {
		rl.close();
	}
};

run();

async function clearDatabase() {
	try {
		const mongoose = await import("mongoose");
		await mongoose.connect(process.env.MONGODB_URI);

		const collections = await mongoose.connection.db.collections();

		for (const collection of collections) {
			await collection.deleteMany({});
		}

		console.log("All collections cleared successfully");
		await mongoose.disconnect();
	} catch (error) {
		console.error("Error clearing database:", error);
		throw error;
	}
}
async function validateDatabase() {
	try {
		await connectMongoDB();
		const collections = await mongoose.connection.db.collections();
		const validationResults = {};
		let isValid = true;

		for (const collection of collections) {
			const count = await collection.countDocuments();
			const sampleDocs = await collection.find({}).limit(5).toArray();

			validationResults[collection.collectionName] = {
				count,
				hasDocuments: count > 0,
				sampleDocsValid: sampleDocs.every((doc) => doc._id && Object.keys(doc).length > 1),
			};

			if (count === 0 || !validationResults[collection.collectionName].sampleDocsValid) {
				isValid = false;
			}
		}

		console.log("\nDatabase Validation Results:");
		console.table(validationResults);

		return isValid;
	} catch (error) {
		console.error("Error validating database:", error);
		throw error;
	}
}
