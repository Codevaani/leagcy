import ImageKit from 'imagekit';

// Server-side ImageKit instance (only use on server)
let imagekit: ImageKit | null = null;

if (typeof window === 'undefined') {
  // Only initialize on server-side
  imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  });
}

export { imagekit };

// Client-side configuration (safe for browser)
export const imagekitConfig = {
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
};

// Helper function to generate optimized image URLs (client-safe)
export const getOptimizedImageUrl = (
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
  
  if (!transformations) {
    return `${baseUrl}/${imagePath}`;
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
