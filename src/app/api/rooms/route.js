import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Room from "@/models/room";
import Booking from "@/models/booking";

/**
 * Handles GET requests to fetch rooms and group them by type.
 * @returns {Promise<NextResponse>} A promise that resolves to the NextResponse object containing grouped rooms.
 */
export async function GET() {
    try {
        await connectMongoDB();
        console.log('Database connected successfully');
        
        // First, register the Booking model implicitly by accessing it
        await Booking.findOne();

        const rooms = await Room.find()
            .populate({
                path: 'activeBooking',
                populate: {
                    path: 'customer',
                    select: 'firstName lastName emailAddress'
                }
            })
            .lean();

        console.log('Rooms fetched:', 
            rooms.find(room => room.activeBooking)
        );

        const groupedRooms = rooms.reduce((acc, room) => {
            const type = acc.find(t => t.name === room.roomType);
            const roomData = {
                id: room._id.toString(), // Convert ObjectId to string
                roomNumber: room.roomNumber,
                number: room.roomNumber, // Add this for compatibility
                floorNumber: room.floorNumber,
                floor: room.floorNumber, // Add this for compatibility
                MaxGuests: room.MaxGuests,
                price: room.price,
                status: room.status,
                type: room.roomType,
                description: room.description,
                amenities: room.amenities || [],
                activeBooking: room.activeBooking ? {
                    id: room.activeBooking._id.toString(),
                    checkIn: room.activeBooking.checkInDate,
                    checkOut: room.activeBooking.checkOutDate
                } : null,
                guest: room.activeBooking && room.activeBooking.customer ? {
                    name: `${room.activeBooking.customer.firstName || ''} ${room.activeBooking.customer.lastName || ''}`.trim(),
                    email: room.activeBooking.customer.emailAddress,
                    checkIn: room.activeBooking.checkInDate,
                    checkOut: room.activeBooking.checkOutDate
                } : null
            };

            // Debug log for rooms with bookings
            if (room.activeBooking) {
                console.log('Room with booking:', {
                    roomNumber: room.roomNumber,
                    bookingId: room.activeBooking._id,
                    customer: room.activeBooking.customer
                });
            }

            if (type) {
                type.rooms.push(roomData);
            } else {
                acc.push({
                    name: room.roomType,
                    rooms: [roomData]
                });
            }
            return acc;
        }, []);

        // Debug log with more details
        console.log('Grouped rooms details:', 
            groupedRooms.map(group => ({
                name: group.name,
                roomCount: group.rooms.length,
                sampleRoom: group.rooms[0]
            }))
        );

        return NextResponse.json(groupedRooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
    }
}  
// export async function GET() {
//     await connectMongoDB();
//     const rooms = await Room.find({}).populate('availability');
//     return NextResponse.json(rooms);
// }

// export async function POST(request) {
//     await connectMongoDB();
//     const data = await request.json();
//     const room = await Room.create(data);
//     return NextResponse.json(room);
// }