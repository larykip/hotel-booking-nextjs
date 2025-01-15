import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Room from '@/models/room';

export async function GET() {
    await connectMongoDB();
    const rooms = await Room.find({}).populate('availability');
    return NextResponse.json(rooms);
}

export async function POST(request) {
    await connectMongoDB();
    const data = await request.json();
    const room = await Room.create(data);
    return NextResponse.json(room);
}