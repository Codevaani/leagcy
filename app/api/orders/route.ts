import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    // @ts-ignore
    const order = await Order.create(body);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const query = userId ? { userId } : {};
    // @ts-ignore
    const orders = await Order.find(query)
      .populate('items.tiffinId')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
