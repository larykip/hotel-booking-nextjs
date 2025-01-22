import { generateFakeData } from "./lib/testData/generateFakeData";

// This function is intended to asynchronously generate fake data and log it to the console when called through 'npm run generate'.
// If an error occurs during the data generation process, it will be caught and logged to the console.
const run = async () => {
	try {
		const result = await generateFakeData();
		console.log(result);
	} catch (error) {
		console.error("Error generating fake data:", error);
	}
};

run();
