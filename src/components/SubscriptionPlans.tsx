'use client'

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Shield, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Essential",
    price: "₹199",
    originalPrice: "₹299",
    period: "/week",
    description: "Perfect for individuals who want quality meals without commitment",
    features: [
      "5 meals per week",
      "Basic tiffin options",
      "Standard delivery",
      "Mobile app access",
      "Email support"
    ],
    icon: Zap,
    color: "text-accent",
    popular: false,
    savings: "33% off"
  },
  {
    name: "Premium",
    price: "₹499",
    originalPrice: "₹699",
    period: "/week",
    description: "Most popular choice for families and food enthusiasts",
    features: [
      "14 meals per week",
      "All tiffin varieties",
      "Priority delivery",
      "Nutrition tracking",
      "24/7 phone support",
      "Custom meal preferences",
      "Weekend specials"
    ],
    icon: Crown,
    color: "text-primary",
    popular: true,
    savings: "29% off"
  },
  {
    name: "Elite",
    price: "₹899",
    originalPrice: "₹1299",
    period: "/week",
    description: "Ultimate dining experience with exclusive benefits",
    features: [
      "21 meals per week",
      "Exclusive chef specials",
      "Express 15-min delivery",
      "Personal nutrition consultant",
      "Dedicated account manager",
      "Custom recipes on request",
      "Premium packaging",
      "Corporate catering discounts"
    ],
    icon: Sparkles,
    color: "text-primary-glow",
    popular: false,
    savings: "31% off"
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

const SubscriptionPlans = () => {
  return (
    <section className="py-24 bg-gradient-surface relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-40 h-40 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Subscription Plans
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-premium bg-clip-text text-transparent">
            Choose Your Perfect Plan
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Flexible subscription options designed to fit your lifestyle and budget. 
            Upgrade, downgrade, or pause anytime.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className={`relative p-8 h-full transition-all duration-500 border-0 group overflow-hidden ${
                plan.popular 
                  ? 'bg-gradient-premium shadow-elevated scale-105 lg:scale-110' 
                  : 'bg-gradient-card shadow-luxury hover:shadow-elevated'
              }`}>
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-accent text-accent-foreground px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Decorative Icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <plan.icon className={`h-16 w-16 ${plan.color}`} />
                </div>

                {/* Plan Header */}
                <div className="mb-8">
                  <div className={`p-4 rounded-2xl ${plan.popular ? 'bg-white/20' : 'bg-primary/10'} inline-block mb-4`}>
                    <plan.icon className={`h-10 w-10 ${plan.popular ? 'text-white' : plan.color}`} />
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : ''}`}>
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-primary'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-xl line-through opacity-60 ${plan.popular ? 'text-white/60' : 'text-muted-foreground'}`}>
                      {plan.originalPrice}
                    </span>
                    <span className={`text-lg ${plan.popular ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {plan.period}
                    </span>
                  </div>
                  
                  <Badge className={`mb-4 ${plan.popular ? 'bg-accent/20 text-white' : 'bg-success/10 text-success'}`}>
                    {plan.savings}
                  </Badge>
                  
                  <p className={`${plan.popular ? 'text-white/80' : 'text-muted-foreground'} leading-relaxed`}>
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 mt-0.5 ${plan.popular ? 'text-white' : 'text-primary'} flex-shrink-0`} />
                      <span className={`${plan.popular ? 'text-white/90' : 'text-muted-foreground'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-white text-primary hover:bg-white/90' 
                      : 'bg-gradient-primary shadow-glow hover:shadow-premium'
                  } transition-all duration-300 text-lg py-6`}
                >
                  {plan.popular ? 'Start Premium Plan' : `Choose ${plan.name}`}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary/5 rounded-3xl p-8 border border-primary/10 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">All Plans Include</h3>
          <div className="grid md:grid-cols-4 gap-6 text-sm">
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <span className="font-semibold">Money-back Guarantee</span>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="h-8 w-8 text-primary mb-2" />
              <span className="font-semibold">Cancel Anytime</span>
            </div>
            <div className="flex flex-col items-center">
              <Crown className="h-8 w-8 text-primary mb-2" />
              <span className="font-semibold">Premium Quality</span>
            </div>
            <div className="flex flex-col items-center">
              <Sparkles className="h-8 w-8 text-primary mb-2" />
              <span className="font-semibold">Free Delivery</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;