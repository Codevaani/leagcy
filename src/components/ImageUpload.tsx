'use client'

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (imageData: { url: string; filePath: string; fileId: string }) => void;
  folder?: string;
  currentImage?: string;
  className?: string;
}

export const ImageUpload = ({ 
  onImageUploaded, 
  folder = 'tiffins', 
  currentImage,
  className = '' 
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Check if ImageKit is configured
    if (!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
      alert('ImageKit is not configured. Please add your ImageKit credentials to .env.local');
      return;
    }

    // Upload file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onImageUploaded({
          url: result.data.url,
          filePath: result.data.filePath,
          fileId: result.data.fileId,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please check your ImageKit configuration.');
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label>Image</Label>
      
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">Click to upload an image</p>
          {!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT && (
            <p className="mt-1 text-xs text-red-500">ImageKit not configured</p>
          )}
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading || !process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        className="cursor-pointer"
      />

      {uploading && (
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-gray-600">Uploading...</span>
        </div>
      )}
    </div>
  );
};
