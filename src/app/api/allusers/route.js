import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import User from '@/models/user';

export async function GET() {
  await connectMongoDB();
  const allusers = await User.find({});
  // console.log(allusers);
  return NextResponse.json(allusers);
}