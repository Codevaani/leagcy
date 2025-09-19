import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { firebaseUid, email, name } = await request.json();
    
    // @ts-ignore
    const existingUser = await User.findOne({ firebaseUid });
    if (existingUser) {
      return NextResponse.json(existingUser);
    }
    
    // @ts-ignore
    const user = await User.create({ firebaseUid, email, name });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get('firebaseUid');
    const admin = searchParams.get('admin');
    
    // If admin flag is set, return all users
    if (admin === 'true') {
      // @ts-ignore
      const users = await User.find({}).sort({ createdAt: -1 });
      return NextResponse.json(users);
    }
    
    // Otherwise, return specific user
    if (!firebaseUid) {
      return NextResponse.json({ error: 'Firebase UID required' }, { status: 400 });
    }
    
    // @ts-ignore
    const user = await User.findOne({ firebaseUid });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}
