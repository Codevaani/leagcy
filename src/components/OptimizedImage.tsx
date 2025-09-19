'use client'

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
  crop?: 'maintain_ratio' | 'force' | 'at_least' | 'at_max';
  className?: string;
  fallback?: string;
}

// Client-safe URL generation
const getOptimizedImageUrl = (
  imagePath: string,
  transformations?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
    crop?: 'maintain_ratio' | 'force' | 'at_least' | 'at_max';
  }
) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  
  if (!baseUrl || !transformations) {
    return imagePath;
  }

  const params = [];
  
  if (transformations.width) params.push(`w-${transformations.width}`);
  if (transformations.height) params.push(`h-${transformations.height}`);
  if (transformations.quality) params.push(`q-${transformations.quality}`);
  if (transformations.format) params.push(`f-${transformations.format}`);
  if (transformations.crop) params.push(`c-${transformations.crop}`);

  const transformString = params.length > 0 ? `tr:${params.join(',')}` : '';
  
  return `${baseUrl}/${transformString}/${imagePath}`;
};

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  quality = 80,
  format = 'webp',
  crop = 'maintain_ratio',
  className = '',
  fallback = '/placeholder.svg'
}: OptimizedImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Check if it's already an ImageKit URL or a local asset
  const isImageKitUrl = src.includes('imagekit.io');
  const isLocalAsset = src.startsWith('/') || src.startsWith('./');
  
  let optimizedSrc = src;
  
  if (isImageKitUrl && !isLocalAsset) {
    // Extract the file path from ImageKit URL
    const filePath = src.split('/').pop() || '';
    optimizedSrc = getOptimizedImageUrl(filePath, {
      width,
      height,
      quality,
      format,
      crop
    });
  }

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  if (error) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={className}
        onLoad={handleLoad}
      />
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
};
