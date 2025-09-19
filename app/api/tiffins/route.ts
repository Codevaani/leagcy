import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tiffin from '@/models/Tiffin';

export async function GET() {
  try {
    await connectDB();
    // @ts-ignore
    const tiffins = await Tiffin.find({ available: true }).sort({ createdAt: -1 });
    return NextResponse.json(tiffins);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tiffins' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    // @ts-ignore
    const tiffin = await Tiffin.create(body);
    return NextResponse.json(tiffin, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tiffin' }, { status: 500 });
  }
}
