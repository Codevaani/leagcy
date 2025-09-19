import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tiffin from '@/models/Tiffin';
import { withAdminAuth } from '@/lib/auth';
import { updateTiffinSchema } from '@/lib/validators';
import { ZodError } from 'zod';

// Public route to get a single tiffin by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    
    const tiffin = await Tiffin.findById(id);
    if (!tiffin) {
      return NextResponse.json({ error: 'Tiffin not found' }, { status: 404 });
    }

    return NextResponse.json(tiffin);
  } catch (error) {
    console.error('Get tiffin error:', error);
    return NextResponse.json({ error: 'Failed to fetch tiffin' }, { status: 500 });
  }
}

// Protected route to delete a tiffin (admin only)
export const DELETE = withAdminAuth(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const { id } = params;
    
    const deletedTiffin = await Tiffin.findByIdAndDelete(id);
    if (!deletedTiffin) {
      return NextResponse.json({ error: 'Tiffin not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Tiffin deleted successfully',
      deletedTiffin 
    });
  } catch (error) {
    console.error('Delete tiffin error:', error);
    return NextResponse.json({ error: 'Failed to delete tiffin' }, { status: 500 });
  }
});

// Protected route to update a tiffin (admin only)
export const PUT = withAdminAuth(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();

    // Validate the request body against the partial schema for updates
    const validatedData = updateTiffinSchema.parse(body);

    const updatedTiffin = await Tiffin.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true }
    );
    
    if (!updatedTiffin) {
      return NextResponse.json({ error: 'Tiffin not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTiffin);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Update tiffin error:', error);
    return NextResponse.json({ error: 'Failed to update tiffin' }, { status: 500 });
  }
});
