import { NextRequest, NextResponse } from 'next/server';
import { imagekit } from '@/lib/imagekit';

export async function POST(request: NextRequest) {
  try {
    if (!imagekit) {
      return NextResponse.json({ error: 'ImageKit not configured' }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'tiffins';
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: folder,
      useUniqueFileName: true,
    });

    return NextResponse.json({
      success: true,
      data: {
        fileId: result.fileId,
        name: result.name,
        url: result.url,
        thumbnailUrl: result.thumbnailUrl,
        filePath: result.filePath,
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' }, 
      { status: 500 }
    );
  }
}

// Get authentication parameters for client-side uploads
export async function GET() {
  try {
    if (!imagekit) {
      return NextResponse.json({ error: 'ImageKit not configured' }, { status: 500 });
    }

    const authenticationParameters = imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get auth parameters' }, 
      { status: 500 }
    );
  }
}
