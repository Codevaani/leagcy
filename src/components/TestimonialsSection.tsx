'use client'

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    location: "Mumbai",
    rating: 5,
    image: "/api/placeholder/100/100",
    testimonial: "The North Indian Special is absolutely divine! The butter chicken tastes just like my grandmother's recipe. The quality and freshness are consistently outstanding. I've been ordering for 6 months now and it never disappoints.",
    verified: true,
    orderCount: "150+ orders"
  },
  {
    name: "Rajesh Kumar",
    role: "Business Owner",
    location: "Delhi",
    rating: 5,
    image: "/api/placeholder/100/100",
    testimonial: "TiffinDelight has revolutionized my lunch routine. The healthy options help me maintain my fitness goals while satisfying my taste buds. The packaging is eco-friendly too - a company that truly cares!",
    verified: true,
    orderCount: "200+ orders"
  },
  {
    name: "Anita Patel",
    role: "Marketing Manager",
    location: "Bangalore",
    rating: 5,
    image: "/api/placeholder/100/100",
    testimonial: "Being a working mother, TiffinDelight is a lifesaver! The Gujarati Thali reminds me of home-cooked meals. My kids love it too. The delivery is always on time, even during peak hours.",
    verified: true,
    orderCount: "80+ orders"
  },
  {
    name: "Dr. Vikram Singh",
    role: "Physician",
    location: "Pune",
    rating: 5,
    image: "/api/placeholder/100/100",
    testimonial: "As a doctor, I appreciate the nutritional balance in every meal. The ingredient transparency and allergen information help me make informed choices. Exceptional quality and service!",
    verified: true,
    orderCount: "120+ orders"
  },
  {
    name: "Meera Reddy",
    role: "Startup Founder",
    location: "Hyderabad",
    rating: 5,
    image: "/api/placeholder/100/100",
    testimonial: "The South Indian Classic takes me back to my childhood in Chennai. Authentic flavors, perfect spice levels, and the sambar is exactly how my mother makes it. Simply incredible!",
    verified: true,
    orderCount: "90+ orders"
  },
  {
    name: "Arjun Mehta",
    role: "Designer",
    location: "Ahmedabad",
    rating: 5,
    image: "/api/placeholder/100/100",
    testimonial: "The premium packaging and presentation is remarkable. Every meal feels like a special occasion. The app interface is intuitive, and customer service is top-notch. Highly recommended!",
    verified: true,
    orderCount: "60+ orders"
  }
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

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Quote className="h-4 w-4 mr-2" />
            Customer Stories
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-premium bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have made TiffinDelight their daily dining choice
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="p-8 h-full bg-gradient-card shadow-luxury hover:shadow-elevated transition-all duration-500 border-0 group relative overflow-hidden">
                {/* Decorative Quote */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-16 w-16 text-primary" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.testimonial}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <Badge variant="secondary" className="text-xs px-2 py-0">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    <p className="text-xs text-primary font-medium mt-1">{testimonial.orderCount}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-primary/5 rounded-full px-8 py-4 border border-primary/10">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="font-semibold">50,000+ Reviews</div>
            <div className="h-6 w-px bg-border" />
            <div className="font-semibold">99% Satisfied</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;