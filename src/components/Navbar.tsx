'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserMenu } from '@/components/UserMenu';
import { Menu, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link 
        href="/menu" 
        className="text-muted-foreground hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Menu
      </Link>
      <Link 
        href="/admin" 
        className="text-muted-foreground hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Admin
      </Link>
    </>
  );

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          TiffinDelight
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/cart" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden lg:inline">Cart</span>
            </Link>
          </Button>
          <ThemeToggle />
          <UserMenu />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-4 w-4" />
            </Link>
          </Button>
          <ThemeToggle />
          <UserMenu />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};
