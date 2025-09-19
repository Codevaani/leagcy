import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tiffin from '@/models/Tiffin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    
    const tiffin = await Tiffin.findById(id);
    
    if (!tiffin) {
      return NextResponse.json(
        { error: 'Tiffin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tiffin);

  } catch (error) {
    console.error('Get tiffin error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tiffin' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    
    const deletedTiffin = await Tiffin.findByIdAndDelete(id);
    
    if (!deletedTiffin) {
      return NextResponse.json(
        { error: 'Tiffin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Tiffin deleted successfully',
      deletedTiffin 
    });

  } catch (error) {
    console.error('Delete tiffin error:', error);
    return NextResponse.json(
      { error: 'Failed to delete tiffin' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();
    
    const updatedTiffin = await Tiffin.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedTiffin) {
      return NextResponse.json(
        { error: 'Tiffin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTiffin);

  } catch (error) {
    console.error('Update tiffin error:', error);
    return NextResponse.json(
      { error: 'Failed to update tiffin' },
      { status: 500 }
    );
  }
}
