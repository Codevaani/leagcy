import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useTiffins = () => {
  return useQuery({
    queryKey: ['tiffins'],
    queryFn: async () => {
      const response = await fetch('/api/tiffins');
      if (!response.ok) throw new Error('Failed to fetch tiffins');
      return response.json();
    }
  });
};

export const useCreateTiffin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (tiffin: any) => {
      const response = await fetch('/api/tiffins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tiffin)
      });
      if (!response.ok) throw new Error('Failed to create tiffin');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tiffins'] });
    }
  });
};
