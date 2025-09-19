'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ShoppingCart } from 'lucide-react'

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/menu" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Menu
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>
        
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some delicious tiffins to get started!</p>
          <Button asChild>
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
