'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Star, Clock, Users, Heart, Minus, Plus, ShoppingCart, Award, Zap, Leaf, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import NutritionCard from "@/components/NutritionCard";
import { OptimizedImage } from "@/components/OptimizedImage";

const TiffinDetail = () => {
  const params = useParams();
  const id = params?.id as string;
  const [tiffin, setTiffin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    // Simple alert for now - can be replaced with actual cart logic
    alert(`Added ${quantity} x ${tiffin.name} to cart!`);
  };

  useEffect(() => {
    if (id) {
      fetchTiffin();
    }
  }, [id]);

  const fetchTiffin = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tiffins/${id}`);
      if (!response.ok) {
        throw new Error('Tiffin not found');
      }
      const data = await response.json();
      setTiffin(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tiffin');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !tiffin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tiffin Not Found</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button asChild>
            <Link href="/menu">Back to Menu</Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalPrice = tiffin.price * quantity;
  const savings = tiffin.originalPrice ? (tiffin.originalPrice - tiffin.price) * quantity : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/menu" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Menu
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                {tiffin.imageKit?.url ? (
                  <OptimizedImage
                    src={tiffin.imageKit.url}
                    alt={tiffin.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={tiffin.image}
                    alt={tiffin.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  {tiffin.badges?.map((badge: string, index: number) => (
                    <Badge key={index} className="bg-primary text-primary-foreground">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{tiffin.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{tiffin.rating || 4.5}</span>
                  <span className="text-muted-foreground">({tiffin.orders || 0}+ orders)</span>
                </div>
                <Badge variant="outline">{tiffin.category}</Badge>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">₹{tiffin.price}</span>
              {tiffin.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{tiffin.originalPrice}
                </span>
              )}
              {savings > 0 && (
                <Badge className="bg-green-100 text-green-800">
                  Save ₹{tiffin.originalPrice - tiffin.price}
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {tiffin.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
                  <span>₹{totalPrice}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You save</span>
                    <span>₹{savings}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart - ₹{totalPrice}
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Order Now
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Nutrition Information */}
        {tiffin.nutrition && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <NutritionCard 
              calories={tiffin.nutrition.calories || 0}
              protein={`${tiffin.nutrition.protein || 0}g`}
              carbs={`${tiffin.nutrition.carbs || 0}g`}
              fat={`${tiffin.nutrition.fat || 0}g`}
              fiber="8g"
              isVeg={true}
              allergens={[]}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TiffinDetail;
