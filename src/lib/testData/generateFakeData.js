import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import connectMongoDB from "../mongodb.js";
import { clearCollection, getCollectionStats, validateDatabase } from "../dbUtils.js";
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
export async function generateFakeData(options = { clear: false, force: false }) {
	try {
		await connectMongoDB();

		// Get current stats
		const currentStats = await getCollectionStats();
		const hasExistingData = Object.values(currentStats).some(count => count > 0);

		if (hasExistingData && !options.force) {
			console.log("Database already contains data:");
			console.table(currentStats);
			console.log("Use --force to override existing data");
			return { success: false, message: "Database already contains data" };
		}

		// Clear existing data if specified
		if (options.clear || options.force) {
			console.log("Clearing existing data...");
			await clearCollection('users');
			await clearCollection('rooms');
			await clearCollection('bookings');
			await clearCollection('payments');
		}

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
		let roomNumberCounter = 1;

		// Calculate target counts based on NUM_ROOMS
		const distribution = {
			AVAILABLE: Math.floor(NUM_ROOMS * 0.4),  // 40%
			OCCUPIED: Math.floor(NUM_ROOMS * 0.2),   // 20%
			MAINTENANCE: Math.floor(NUM_ROOMS * 0.2), // 20%
			BOOKED: Math.floor(NUM_ROOMS * 0.2)      // 20%
		};

		// Create status array based on distribution
		let statuses = [
			...Array(distribution.AVAILABLE).fill('AVAILABLE'),
			...Array(distribution.OCCUPIED).fill('OCCUPIED'),
			...Array(distribution.MAINTENANCE).fill('MAINTENANCE'),
			...Array(distribution.BOOKED).fill('BOOKED')
		];

		// Shuffle statuses array
		statuses = faker.helpers.shuffle(statuses);

		for (let i = 0; i < NUM_ROOMS; i++) {
			// Get status from shuffled array
			const primaryStatus = statuses[i] || 'AVAILABLE';
			// Add cleaning status randomly (20% chance) if not in maintenance
			const secondaryStatus = primaryStatus !== 'MAINTENANCE' && Math.random() < 0.2 ? 'CLEANING' : 'NONE';

			const room = new Room({
				roomNumber: roomNumberCounter,
				floorNumber: parseInt(String(roomNumberCounter)[0], 10),
				roomType: faker.helpers.arrayElement(["Standard Rooms", "Junior Suites", "Deluxe", "Executive Suites", "Presidential Suites"]),
				price: faker.number.int({ min: 1000, max: 5000 }),
				amenities: faker.helpers.arrayElements(["WiFi", "TV", "Mini-bar", "Balcony", "Ocean View"], { min: 1, max: 5 }),
				images: [faker.image.url(), faker.image.url()],
				description: faker.lorem.paragraph(),
				MaxGuests: faker.number.int({ min: 2, max: 4 }),
				status: primaryStatus,
				secondaryStatus: secondaryStatus,
				activeBooking: null  // Initialize with no booking
			});

			try {
				await room.save();
				rooms.push(room);
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
		console.log('Room status distribution:', 
			rooms.reduce((acc, room) => {
				acc[room.status] = (acc[room.status] || 0) + 1;
				return acc;
			}, {})
		);

		// Only generate bookings for rooms that are BOOKED or OCCUPIED
		const bookedOrOccupiedRooms = rooms.filter(room => 
			room.status === 'BOOKED' || room.status === 'OCCUPIED'
		);

		// Generate bookings for these rooms
		for (const room of bookedOrOccupiedRooms) {
			const user = faker.helpers.arrayElement(users);
			const checkInDate = faker.date.future();
			const checkOutDate = faker.date.future({ refDate: checkInDate });
			const totalCost = room.price * Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

			const booking = new Booking({
				customer: user._id,
				room: room._id,
				checkInDate,
				checkOutDate,
				totalCost,
				paymentStatus: faker.helpers.arrayElement(["pending", "completed", "failed"]),
				status: room.status === 'OCCUPIED' ? 'CHECKED_IN' : 'CONFIRMED',
				actualCheckIn: room.status === 'OCCUPIED' ? checkInDate : null
			});
			await booking.save();

			// Update room's activeBooking reference
			await Room.findByIdAndUpdate(room._id, {
				activeBooking: booking._id
			});

			// Create payment
			const payment = new Payment({
				booking: booking._id,
				amount: totalCost,
				paymentMethod: faker.helpers.arrayElement(["credit_card", "paypal", "stripe"]),
				paymentDate: faker.date.between({ from: booking.createdAt, to: checkInDate }),
				paymentStatus: booking.paymentStatus,
			});
			await payment.save();
		}

		 // Add some rooms to maintenance/cleaning after bookings
		 const occupiedRooms = rooms.filter(room => room.status === "OCCUPIED");
		 const maintenanceCount = Math.floor(occupiedRooms.length * 0.2); // 20% of occupied rooms
 
		 for (let i = 0; i < maintenanceCount; i++) {
			 const room = occupiedRooms[i];
			 if (room) {
				 await Room.findByIdAndUpdate(room._id, {
					 status: faker.helpers.arrayElement(['CLEANING', 'MAINTENANCE']),
					 activeBooking: null
				 });
				 console.log(`Room ${room.roomNumber} set to maintenance/cleaning`);
			 }
		 }

		// Validate the data links
		const bookingsWithRefs = await Booking.find()
			.populate('customer')
			.populate('room');
		
		console.log('\nValidating Bookings:');
		bookingsWithRefs.forEach(booking => {
			console.log(`Booking ID: ${booking._id}`);
			console.log(`- Room: ${booking.room?.roomNumber}`);
			console.log(`- Customer: ${booking.customer?.firstName} ${booking.customer?.lastName}`);
			console.log(`- Status: ${booking.status}`);
		});

		const roomsWithBookings = await Room.find({ activeBooking: { $ne: null } })
			.populate({
				path: 'activeBooking',
				populate: {
					path: 'customer',
					select: 'firstName lastName emailAddress'
				}
			});

		console.log('\nValidating Rooms with Bookings:');
		roomsWithBookings.forEach(room => {
			console.log(`Room ${room.roomNumber}:`);
			console.log(`- Status: ${room.status}`);
			console.log(`- Booking: ${room.activeBooking?._id}`);
			console.log(`- Guest: ${room.activeBooking?.customer?.firstName} ${room.activeBooking?.customer?.lastName}`);
		});

		// Validate generated data
		const validationErrors = await validateDatabase();
		if (validationErrors.length > 0) {
			console.error("Validation errors found:", validationErrors);
			if (!options.force) {
				return { 
					success: false, 
					message: "Validation errors found", 
					errors: validationErrors 
				};
			}
		}

		// Get final stats
		const finalStats = await getCollectionStats();
		
		return { 
			success: true, 
			message: "Fake data generated and saved to MongoDB successfully",
			stats: {
				before: currentStats,
				after: finalStats
			}
		};
	} catch (error) {
		console.error("Error generating fake data:", error);
		return { 
			success: false, 
			message: "Error generating fake data", 
			error: error.message 
		};
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
