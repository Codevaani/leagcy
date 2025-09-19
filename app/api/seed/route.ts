import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tiffin from '@/models/Tiffin';

const sampleTiffins = [
  {
    name: "North Indian Royal",
    description: "Premium butter chicken, handmade naan, basmati rice, dal makhani, mint raita",
    price: 249,
    originalPrice: 299,
    image: "/assets/north-indian-tiffin.jpg",
    category: "North Indian",
    rating: 4.8,
    orders: 2500,
    badges: ["Chef's Special", "Most Popular"],
    nutrition: { calories: 650, protein: 35, carbs: 45, fat: 25 }
  },
  {
    name: "South Indian Authentic",
    description: "Traditional sambar, tangy rasam, coconut rice, seasonal vegetables, homemade chutney",
    price: 199,
    originalPrice: 249,
    image: "/assets/south-indian-tiffin.jpg",
    category: "South Indian",
    rating: 4.9,
    orders: 3100,
    badges: ["Vegetarian", "Traditional"],
    nutrition: { calories: 520, protein: 18, carbs: 65, fat: 15 }
  },
  {
    name: "Wellness Pro",
    description: "Grilled lean protein, quinoa power bowl, superfood salad, detox soup",
    price: 299,
    originalPrice: 349,
    image: "/assets/healthy-tiffin.jpg",
    category: "Healthy",
    rating: 4.7,
    orders: 1800,
    badges: ["High Protein", "Keto Friendly"],
    nutrition: { calories: 450, protein: 40, carbs: 25, fat: 20 }
  }
];

export async function POST() {
  try {
    await connectDB();
    // @ts-ignore
    await Tiffin.deleteMany({});
    // @ts-ignore
    const tiffins = await Tiffin.insertMany(sampleTiffins);
    return NextResponse.json({ message: 'Database seeded successfully', tiffins });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
