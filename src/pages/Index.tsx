'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Shield, Truck, ChefHat, Award, Leaf, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-tiffin.jpg";
import PremiumFeatures from "@/components/PremiumFeatures";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Navbar } from "@/components/Navbar";
import { OptimizedImage } from "@/components/OptimizedImage";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage.src} 
            alt="Delicious tiffin service" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Fresh • Healthy • Delivered Daily
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent"
            >
              Premium Tiffin
              <br />
              Service
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Experience authentic homestyle meals delivered fresh to your doorstep. 
              From traditional Indian thalis to healthy modern options.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="bg-gradient-primary shadow-premium hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
                asChild
              >
                <Link href="/menu">Explore Menu</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/30 hover:bg-primary/5 text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      

      {/* Popular Tiffins Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Popular Tiffins</h2>
            <p className="text-muted-foreground text-lg">
              Discover our most loved meal combinations
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { 
                image: "north-indian-tiffin.jpg", 
                name: "North Indian Royal", 
                price: "₹249", 
                originalPrice: "₹299",
                rating: 4.8,
                orders: "2.5K+ orders",
                description: "Premium butter chicken, handmade naan, basmati rice, dal makhani, mint raita",
                badges: ["Chef's Special", "Most Popular"]
              },
              { 
                image: "south-indian-tiffin.jpg", 
                name: "South Indian Authentic", 
                price: "₹199", 
                originalPrice: "₹249",
                rating: 4.9,
                orders: "3.1K+ orders",
                description: "Traditional sambar, tangy rasam, coconut rice, seasonal vegetables, homemade chutney",
                badges: ["Vegetarian", "Traditional"]
              },
              { 
                image: "healthy-tiffin.jpg", 
                name: "Wellness Pro", 
                price: "₹299", 
                originalPrice: "₹349",
                rating: 4.7,
                orders: "1.8K+ orders",
                description: "Grilled lean protein, quinoa power bowl, superfood salad, detox soup",
                badges: ["High Protein", "Keto Friendly"]
              }
            ].map((tiffin, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 cursor-pointer group">
                  <div className="relative overflow-hidden">
                    <OptimizedImage 
                      src={tiffin.image} 
                      alt={tiffin.name}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-primary-foreground">
                        ⭐ {tiffin.rating}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{tiffin.name}</h3>
                      <span className="text-xl font-bold text-primary">{tiffin.price}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{tiffin.description}</p>
                    <Button className="w-full bg-gradient-primary shadow-glow" asChild>
                      <Link href={`/tiffin/${index + 1}`}>View Details</Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose TiffinDelight?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to delivering the finest quality meals with unmatched convenience
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: ChefHat, title: "Master Chef Curated", desc: "Recipes by award-winning chefs with 20+ years experience" },
              { icon: Award, title: "ISO Certified", desc: "Prepared in internationally certified facilities" },
              { icon: Leaf, title: "Farm Fresh Daily", desc: "Organic ingredients sourced from local farms" },
              { icon: Sparkles, title: "AI Nutrition", desc: "Personalized recommendations based on health goals" }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center shadow-soft hover:shadow-glow transition-all duration-300 bg-gradient-card">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>w

      {/* Premium Features Section */}
      <PremiumFeatures />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      

      {/* Footer */}
      <footer className="bg-gradient-surface border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                TiffinDelight
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                Elevating daily dining with premium quality tiffin services. 
                From farm-fresh ingredients to your doorstep in 30 minutes.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-primary/10 text-primary">ISO Certified</Badge>
                <Badge className="bg-primary/10 text-primary">50K+ Customers</Badge>
                <Badge className="bg-primary/10 text-primary">4.9★ Rating</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/menu" className="hover:text-primary transition-colors">Our Menu</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Subscription Plans</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Track Order</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Refund Policy</Link></li>
                <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Portal</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>© 2024 TiffinDelight. All rights reserved. | Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
