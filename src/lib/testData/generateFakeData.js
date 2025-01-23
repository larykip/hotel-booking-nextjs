import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import connectMongoDB from "../mongodb.js";
import User from "../../models/user.js";
import Room from "../../models/room.js";
import Booking from "../../models/booking.js";
import Payment from "../../models/payment.js";

const NUM_USERS = 20;
const NUM_ROOMS = 20;
const NUM_BOOKINGS = 50;

/**
 * Function to generate fake data for users, rooms, bookings and payments
 * @returns {Promise} A promise that resolves with a success message or rejects with an error message
 */
export async function generateFakeData() {
	try {
		await connectMongoDB();

		// Generate Users
		const users = [];
		for (let i = 0; i < NUM_USERS; i++) {
			const user = new User({
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				gender: faker.person.sex(),
				emailAddress: faker.internet.email(),
				avatar: faker.image.avatar(),
				password: await bcrypt.hash("password123", 10),
				role: faker.helpers.arrayElement(["guest"]),
			});
			await user.save();
			users.push(user);
		}
		console.log(`${NUM_USERS} users generated`);

		// Generate Rooms
		const rooms = [];
		const existingRoomNumbers = new Set((await Room.find({}, "roomNumber")).map((room) => room.roomNumber));
		let roomNumberCounter = 1;

		for (let i = 1; i < NUM_ROOMS; i++) {
			// Find the next available room number
			while (existingRoomNumbers.has(roomNumberCounter)) {
				roomNumberCounter++;
			}

			const room = new Room({
				roomNumber: roomNumberCounter,
				floorNumber: parseInt(String(roomNumberCounter)[0], 10),
				roomType: faker.helpers.arrayElement(["Standard Rooms", "Junior Suites", "Deluxe", "Executive Suites", "Presidential Suites"]),
				price: faker.number.int({ min: 1000, max: 5000 }),
				amenities: faker.helpers.arrayElements(["WiFi", "TV", "Mini-bar", "Balcony", "Ocean View"], { min: 1, max: 5 }),
				images: [faker.image.url(), faker.image.url()],
				description: faker.lorem.paragraph(),
				MaxGuests: faker.number.int({ min: 2, max: 4 }),
				status: faker.helpers.arrayElement(["AVAILABLE", "OCCUPIED", "BOOKED", "CLEANING", "MAINTENANCE"]),
			});

			try {
				await room.save();
				rooms.push(room);
				existingRoomNumbers.add(roomNumberCounter);
				roomNumberCounter++;
			} catch (error) {
				if (error.code === 11000) {
					console.log(`Room number ${roomNumberCounter} already exists. Skipping...`);
					i--; // Retry with the next room number
				} else {
					throw error;
				}
			}
		}
		console.log(`${rooms.length} rooms generated`);

		// Generate Bookings and Payments
		for (let i = 0; i < NUM_BOOKINGS; i++) {
			const user = faker.helpers.arrayElement(users);
			const room = faker.helpers.arrayElement(rooms);
			const checkInDate = faker.date.future();
			const checkOutDate = faker.date.future({ refDate: checkInDate });
			const totalCost = faker.number.int({ min: 100, max: 1000 });

			const booking = new Booking({
				customer: user._id,
				room: room._id,
				checkInDate,
				checkOutDate,
				totalCost,
				paymentStatus: faker.helpers.arrayElement(["pending", "completed", "failed"]),
			});
			await booking.save();

			const payment = new Payment({
				booking: booking._id,
				amount: totalCost,
				paymentMethod: faker.helpers.arrayElement(["credit_card", "paypal", "stripe"]),
				paymentDate: faker.date.between({ from: booking.createdAt, to: checkInDate }),
				paymentStatus: booking.paymentStatus,
			});
			await payment.save();
		}
		console.log(`${NUM_BOOKINGS} bookings and payments generated`);

		console.log("Fake data generated and saved to MongoDB");
		return { success: true, message: "Fake data generated successfully" };
	} catch (error) {
		console.error("Error generating fake data:", error);
		return { success: false, message: "Error generating fake data", error: error.message };
	}
}

/**
 * Function to generate fake activities
 * @param {number} count - The number of activities to generate
 * @returns {Array} An array of fake activities
 */
export const generateFakeActivities = (count) => {
	return Array.from({ length: count }).map(() => ({
		user: faker.person.fullName(),
		room: `Room #${faker.number.int({ min: 1000, max: 1500 })}`,
		date: `${faker.date.past().toLocaleDateString()} - ${faker.date.future().toLocaleDateString()}`,
		time: `${faker.number.int({ min: 1, max: 60 })} min`,
		avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${Math.random().toString(36).substring(7)}`,
		type: faker.helpers.arrayElement(["request", "cleaning", "review"]),
		message: faker.lorem.sentence(),
	}));
};
