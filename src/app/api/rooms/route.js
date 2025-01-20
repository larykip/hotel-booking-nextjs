import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Room from '@/models/room';

export async function GET() {
    try {
      await connectMongoDB();
      // Remove populate since we don't need it yet
      const rooms = await Room.find({}).lean();
      
      // Group rooms by type
      const roomTypes = rooms.reduce((acc, room) => {
        if (!acc[room.roomType]) {
          acc[room.roomType] = [];
        }
        
        acc[room.roomType].push({
          ...room,
          id: room._id.toString(),
          _id: room._id.toString(),
          roomNumber: room.roomNumber,
          type: room.roomType,
          floor: room.floorNumber,
          // Ensure status is properly set
          status: room.status || 'AVAILABLE'
        });
        return acc;
      }, {});
  
      // Convert to array of room types
      const roomTypesArray = Object.entries(roomTypes).map(([name, rooms]) => ({
        name,
        rooms
      }));
  
      return NextResponse.json(roomTypesArray);
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