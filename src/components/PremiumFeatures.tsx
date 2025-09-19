'use client'

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Shield, 
  Sparkles, 
  Clock, 
  Leaf, 
  ChefHat,
  Heart,
  Star,
  Zap,
  TrendingUp
} from "lucide-react";

const premiumFeatures = [
  {
    icon: Award,
    title: "ISO Certified Kitchen",
    description: "Food prepared in internationally certified facilities with highest hygiene standards",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee with free replacement policy for unsatisfied orders",
    color: "text-accent"
  },
  {
    icon: Sparkles,
    title: "AI-Powered Nutrition",
    description: "Personalized meal recommendations based on your health goals and dietary preferences",
    color: "text-primary-glow"
  },
  {
    icon: Clock,
    title: "30-Min Delivery",
    description: "Lightning-fast delivery with temperature-controlled vehicles to maintain freshness",
    color: "text-success"
  },
  {
    icon: Leaf,
    title: "Farm-to-Table Fresh",
    description: "Ingredients sourced directly from organic farms within 50km radius daily",
    color: "text-primary"
  },
  {
    icon: ChefHat,
    title: "Master Chef Curated",
    description: "Recipes developed by award-winning chefs with 20+ years of culinary expertise",
    color: "text-accent"
  }
];

const certifications = [
  { name: "ISO 22000", desc: "Food Safety Management" },
  { name: "HACCP", desc: "Hazard Analysis Critical Control" },
  { name: "FSSAI", desc: "Food Safety Standards Authority" },
  { name: "Organic", desc: "Certified Organic Ingredients" }
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const PremiumFeatures = () => {
  return (
    <section className="py-24 bg-gradient-surface relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Premium Experience
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-premium bg-clip-text text-transparent">
            Elevated Dining Standards
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Experience the perfect fusion of traditional flavors and modern culinary science, 
            crafted with precision and delivered with excellence
          </p>
        </motion.div>

        {/* Premium Features Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8 mb-20"
        >
          {premiumFeatures.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="p-8 h-full bg-gradient-card shadow-luxury hover:shadow-elevated transition-all duration-500 border-0 group">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-2xl bg-primary/10 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary/5 rounded-3xl p-8 border border-primary/10"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Trusted & Certified</h3>
            <p className="text-muted-foreground">
              Accredited by leading food safety and quality organizations
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary/10 rounded-2xl p-6 mb-3 group hover:bg-primary/20 transition-all duration-300">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-lg">{cert.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{cert.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-4 gap-8"
        >
          {[
            { icon: Heart, number: "50K+", label: "Happy Customers", color: "text-red-500" },
            { icon: Star, number: "4.9", label: "Average Rating", color: "text-yellow-500" },
            { icon: Zap, number: "98%", label: "On-Time Delivery", color: "text-primary" },
            { icon: TrendingUp, number: "2M+", label: "Meals Delivered", color: "text-accent" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`${stat.color} mb-3`}>
                <stat.icon className="h-10 w-10 mx-auto" />
              </div>
              <div className="text-4xl font-bold mb-1">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumFeatures;