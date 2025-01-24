import dotenv from 'dotenv';
import { generateFakeData } from "./lib/testData/generateFakeData.js";
import readline from 'readline';

// Load environment variables
dotenv.config();

// This function is intended to asynchronously generate fake data and log it to the console when called through 'npm run generate'.
// If an error occurs during the data generation process, it will be caught and logged to the console.

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const run = async () => {
    try {
        // Get command line arguments
        const args = process.argv.slice(2);
        const options = {
            clear: args.includes('--clear'),
            force: args.includes('--force')
        };

        if (!options.force) {
            const answer = await question(
                'This will generate new data. Existing data may be affected. Continue? (y/N) '
            );
            if (answer.toLowerCase() !== 'y') {
                console.log('Operation cancelled');
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
