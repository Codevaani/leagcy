'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Database } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const SeedDataButton = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const queryClient = useQueryClient();

  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
      });
      
      if (response.ok) {
        alert('Database seeded successfully!');
        queryClient.invalidateQueries();
      } else {
        throw new Error('Failed to seed database');
      }
    } catch (error) {
      alert('Failed to seed database');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button 
      onClick={handleSeedData} 
      disabled={isSeeding}
      variant="outline"
      className="gap-2"
    >
      {isSeeding ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Database className="h-4 w-4" />
      )}
      {isSeeding ? 'Seeding...' : 'Seed Sample Data'}
    </Button>
  );
};
