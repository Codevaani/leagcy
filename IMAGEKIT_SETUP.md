# ImageKit.io Integration Setup Guide

## 🚀 Quick Setup

### 1. Create ImageKit Account
1. Go to [ImageKit.io](https://imagekit.io)
2. Sign up for a free account
3. Complete the onboarding process

### 2. Get Your Credentials
1. Go to your ImageKit Dashboard
2. Navigate to **Developer Options** → **API Keys**
3. Copy the following:
   - **Public Key**
   - **Private Key** 
   - **URL Endpoint** (e.g., `https://ik.imagekit.io/your_imagekit_id`)

### 3. Update Environment Variables
Add these to your `.env.local` file:

```env
# ImageKit Configuration
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_actual_public_key_here
IMAGEKIT_PRIVATE_KEY=your_actual_private_key_here
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

### 4. Test the Integration
1. Start your development server: `npm run dev`
2. Go to `/admin` 
3. Click "Add New Tiffin"
4. Try uploading an image
5. The image should upload to ImageKit and display optimized

## 🎯 Features Integrated

### ✅ Image Upload
- **Component**: `ImageUpload`
- **API Route**: `/api/upload`
- **Features**: Drag & drop, preview, progress indicator

### ✅ Image Optimization
- **Component**: `OptimizedImage`
- **Features**: Auto WebP conversion, responsive sizing, lazy loading
- **Transformations**: Width, height, quality, format, crop modes

### ✅ Admin Integration
- **Location**: Admin Panel → Tiffins Tab
- **Features**: Add new tiffins with image upload
- **Database**: ImageKit metadata stored in MongoDB

## 🔧 Usage Examples

### Basic Image Display
```tsx
import { OptimizedImage } from '@/components/OptimizedImage';

<OptimizedImage
  src="your-image-path"
  alt="Description"
  width={400}
  height={300}
  quality={80}
  format="webp"
/>
```

### Image Upload Form
```tsx
import { ImageUpload } from '@/components/ImageUpload';

<ImageUpload
  onImageUploaded={(data) => {
    console.log('Uploaded:', data);
    // Handle the uploaded image data
  }}
  folder="tiffins"
/>
```

### Manual URL Generation
```tsx
import { getOptimizedImageUrl } from '@/lib/imagekit';

const optimizedUrl = getOptimizedImageUrl('image-path.jpg', {
  width: 300,
  height: 200,
  quality: 90,
  format: 'webp'
});
```

## 📊 Benefits

### Performance
- **50-80% smaller** file sizes with WebP
- **Automatic optimization** based on device
- **Global CDN** delivery
- **Lazy loading** built-in

### Developer Experience
- **Simple API** for uploads
- **Automatic transformations**
- **Real-time optimization**
- **No storage management**

### Cost Effective
- **Free tier**: 20GB storage, 20GB bandwidth
- **Pay as you scale**
- **No infrastructure costs**

## 🛠️ Troubleshooting

### Upload Issues
1. Check environment variables are set correctly
2. Verify ImageKit credentials in dashboard
3. Check browser console for errors
4. Ensure file size is under limits

### Display Issues
1. Verify image URLs are accessible
2. Check network tab for failed requests
3. Ensure proper fallback images are set

### Performance Issues
1. Use appropriate image dimensions
2. Set quality between 70-90
3. Use WebP format when possible
4. Enable lazy loading

## 🔐 Security Notes

- **Private Key**: Never expose in client-side code
- **Public Key**: Safe to use in frontend
- **URL Endpoint**: Public, used for image delivery
- **Folder Structure**: Organize by feature (tiffins, users, etc.)

## 📈 Next Steps

1. **Set up your ImageKit account**
2. **Add your credentials to `.env.local`**
3. **Test image upload in admin panel**
4. **Optimize existing images**
5. **Monitor usage in ImageKit dashboard**

---

**Need Help?** Check the [ImageKit Documentation](https://docs.imagekit.io/) or contact support.
