import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import User from '@/models/user';

export async function GET() {
  await connectMongoDB();
  const guests = await User.find({ role: 'guest' });
  // console.log(guests);
  return NextResponse.json(guests);
}

export async function POST(request) {
  await connectMongoDB();
  const data = await request.json();
  const guest = await User.create(data);
  return NextResponse.json(guest);
}
