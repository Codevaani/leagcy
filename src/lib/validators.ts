import { z } from 'zod';

/**
 * Schema for validating the input when creating a new tiffin.
 * It ensures that all required fields are present and have the correct format.
 */
export const tiffinInputSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  price: z.number().positive({ message: "Price must be a positive number." }),
  category: z.string().min(1, { message: "Category is required." }),
  image: z.string().url({ message: "A valid image URL is required." }),

  // Optional fields that can be provided during creation
  originalPrice: z.number().positive({ message: "Original price must be a positive number." }).optional(),
  imageKit: z.object({
    fileId: z.string(),
    filePath: z.string(),
    url: z.string().url(),
  }).optional(),
  badges: z.array(z.string()).optional(),
  nutrition: z.object({
    calories: z.number().min(0),
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0)
  }).optional(),
  available: z.boolean().optional(),
});

/**
 * Schema for validating the input when updating an existing tiffin.
 * It uses the same rules as the creation schema, but makes all fields optional
 * to allow for partial updates.
 */
export const updateTiffinSchema = tiffinInputSchema.partial();
