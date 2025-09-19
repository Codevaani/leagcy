import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tiffin from '@/models/Tiffin';
import { withAdminAuth } from '@/lib/auth';
import { tiffinInputSchema } from '@/lib/validators';
import { ZodError } from 'zod';

// Public route to get all available tiffins
export async function GET() {
  try {
    await connectDB();
    const tiffins = await Tiffin.find({ available: true }).sort({ createdAt: -1 });
    return NextResponse.json(tiffins);
  } catch (error) {
    console.error('Failed to fetch tiffins:', error);
    return NextResponse.json({ error: 'Failed to fetch tiffins' }, { status: 500 });
  }
}

// Protected route for creating a new tiffin (admin only)
export const POST = withAdminAuth(async (request: NextRequest) => {
  try {
    await connectDB();
    const body = await request.json();

    // Validate the request body against the Zod schema
    const validatedData = tiffinInputSchema.parse(body);

    const tiffin = await Tiffin.create(validatedData);
    return NextResponse.json(tiffin, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      // Return a detailed validation error response
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Failed to create tiffin:', error);
    return NextResponse.json({ error: 'Failed to create tiffin' }, { status: 500 });
  }
});
