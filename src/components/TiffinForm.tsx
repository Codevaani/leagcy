'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ImageUpload } from './ImageUpload';
import { Loader2 } from 'lucide-react';

interface TiffinFormData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  imageKit?: {
    fileId: string;
    filePath: string;
    url: string;
  };
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface TiffinFormProps {
  onSubmit: (data: TiffinFormData) => Promise<void>;
  initialData?: Partial<TiffinFormData>;
  isLoading?: boolean;
}

export const TiffinForm = ({ onSubmit, initialData, isLoading }: TiffinFormProps) => {
  const [formData, setFormData] = useState<TiffinFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    originalPrice: initialData?.originalPrice || 0,
    category: initialData?.category || '',
    image: initialData?.image || '',
    imageKit: initialData?.imageKit,
    nutrition: {
      calories: initialData?.nutrition?.calories || 0,
      protein: initialData?.nutrition?.protein || 0,
      carbs: initialData?.nutrition?.carbs || 0,
      fat: initialData?.nutrition?.fat || 0,
    }
  });

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof TiffinFormData],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleImageUploaded = (imageData: { url: string; filePath: string; fileId: string }) => {
    setFormData(prev => ({
      ...prev,
      image: imageData.url,
      imageKit: {
        fileId: imageData.fileId,
        filePath: imageData.filePath,
        url: imageData.url
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Tiffin Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="North Indian">North Indian</SelectItem>
                  <SelectItem value="South Indian">South Indian</SelectItem>
                  <SelectItem value="Gujarati">Gujarati</SelectItem>
                  <SelectItem value="Bengali">Bengali</SelectItem>
                  <SelectItem value="Healthy">Healthy</SelectItem>
                  <SelectItem value="Continental">Continental</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="originalPrice">Original Price (₹)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              folder="tiffins"
              currentImage={formData.image}
            />

            <div>
              <Label>Nutrition Information</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={formData.nutrition.calories}
                    onChange={(e) => handleInputChange('nutrition.calories', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    value={formData.nutrition.protein}
                    onChange={(e) => handleInputChange('nutrition.protein', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    value={formData.nutrition.carbs}
                    onChange={(e) => handleInputChange('nutrition.carbs', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    type="number"
                    value={formData.nutrition.fat}
                    onChange={(e) => handleInputChange('nutrition.fat', Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Tiffin'
          )}
        </Button>
      </form>
    </Card>
  );
};
