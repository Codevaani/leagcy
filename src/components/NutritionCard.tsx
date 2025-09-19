'use client'

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Zap, Heart, Shield } from "lucide-react";

interface NutritionCardProps {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  isVeg: boolean;
  allergens: string[];
}

const NutritionCard = ({ calories, protein, carbs, fat, fiber, isVeg, allergens }: NutritionCardProps) => {
  const nutritionData = [
    { label: "Protein", value: protein, color: "bg-primary", percentage: 85 },
    { label: "Carbs", value: carbs, color: "bg-accent", percentage: 65 },
    { label: "Fat", value: fat, color: "bg-warning", percentage: 45 },
    { label: "Fiber", value: fiber, color: "bg-success", percentage: 55 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 bg-gradient-card shadow-luxury border-0">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">Nutrition Facts</h3>
          <div className="flex items-center gap-2">
            <Badge variant={isVeg ? "secondary" : "destructive"} className="text-xs">
              {isVeg ? (
                <>
                  <Leaf className="h-3 w-3 mr-1" />
                  VEG
                </>
              ) : (
                "NON-VEG"
              )}
            </Badge>
            <Badge className="bg-primary/10 text-primary text-xs">
              <Zap className="h-3 w-3 mr-1" />
              {calories} cal
            </Badge>
          </div>
        </div>

        {/* Macronutrients */}
        <div className="space-y-4 mb-6">
          {nutritionData.map((nutrient, index) => (
            <div key={nutrient.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{nutrient.label}</span>
                <span className="text-muted-foreground">{nutrient.value}</span>
              </div>
              <Progress 
                value={nutrient.percentage} 
                className="h-2"
              />
            </div>
          ))}
        </div>

        {/* Health Indicators */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <Heart className="h-5 w-5 text-red-500 mx-auto mb-1" />
            <div className="text-xs font-medium">Heart</div>
            <div className="text-xs text-muted-foreground">Healthy</div>
          </div>
          <div className="text-center p-3 bg-success/5 rounded-lg">
            <Leaf className="h-5 w-5 text-success mx-auto mb-1" />
            <div className="text-xs font-medium">Natural</div>
            <div className="text-xs text-muted-foreground">Organic</div>
          </div>
          <div className="text-center p-3 bg-accent/5 rounded-lg">
            <Shield className="h-5 w-5 text-accent mx-auto mb-1" />
            <div className="text-xs font-medium">Safe</div>
            <div className="text-xs text-muted-foreground">Tested</div>
          </div>
        </div>

        {/* Allergens */}
        <div>
          <div className="text-sm font-medium mb-2">Allergen Information:</div>
          <div className="flex flex-wrap gap-1">
            {allergens.length > 0 ? (
              allergens.map((allergen, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {allergen}
                </Badge>
              ))
            ) : (
              <Badge variant="secondary" className="text-xs text-success">
                <Leaf className="h-3 w-3 mr-1" />
                Allergen Free
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default NutritionCard;