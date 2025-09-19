'use client'

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search } from "lucide-react";
import { useState } from "react";
import { useTiffins } from "@/hooks/useTiffins";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const TiffinCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { data: tiffins = [], isLoading, error } = useTiffins();

  const filteredTiffins = tiffins.filter((tiffin: any) => {
    const matchesSearch = tiffin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tiffin.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || tiffin.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8">Error loading tiffins</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Tiffin Menu</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Discover authentic flavors crafted with love and tradition
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tiffins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="North Indian">North Indian</SelectItem>
                <SelectItem value="South Indian">South Indian</SelectItem>
                <SelectItem value="Healthy">Healthy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTiffins.map((tiffin: any) => (
            <Card key={tiffin._id} className="overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300">
              <div className="relative">
                <img 
                  src={tiffin.image} 
                  alt={tiffin.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    {tiffin.rating}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{tiffin.name}</h3>
                  <div className="text-right">
                    <span className="text-xl font-bold text-primary">₹{tiffin.price}</span>
                    {tiffin.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        ₹{tiffin.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{tiffin.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {tiffin.badges?.map((badge: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{tiffin.orders}+ orders</span>
                  <Button size="sm" asChild>
                    <Link href={`/tiffin/${tiffin._id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default TiffinCatalog;
