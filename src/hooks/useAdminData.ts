import { useQuery } from '@tanstack/react-query';

// Fetch all orders
export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    },
    enabled: typeof window !== 'undefined'
  });
};

// Fetch all tiffins
export const useTiffins = () => {
  return useQuery({
    queryKey: ['tiffins'],
    queryFn: async () => {
      const response = await fetch('/api/tiffins');
      if (!response.ok) throw new Error('Failed to fetch tiffins');
      return response.json();
    },
    enabled: typeof window !== 'undefined'
  });
};

// Fetch all users (admin only)
export const useUsers = () => {
  return useQuery({
    queryKey: ['users', 'admin'],
    queryFn: async () => {
      const response = await fetch('/api/users?admin=true');
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
    enabled: typeof window !== 'undefined'
  });
};

// Calculate admin stats from fetched data
export const useAdminStats = () => {
  const { data: orders } = useOrders();
  const { data: users } = useUsers();
  const { data: tiffins } = useTiffins();

  return useQuery({
    queryKey: ['admin-stats', orders, users, tiffins],
    queryFn: () => {
      const totalOrders = orders?.length || 0;
      const activeUsers = users?.filter((user: any) => user.subscription?.status === 'active').length || 0;
      const totalRevenue = orders?.reduce((sum: number, order: any) => sum + order.totalAmount, 0) || 0;
      const totalUsers = users?.length || 0;
      const totalTiffins = tiffins?.length || 0;

      return {
        totalOrders,
        activeUsers,
        totalRevenue,
        totalUsers,
        totalTiffins
      };
    },
    enabled: !!orders && !!users && !!tiffins && typeof window !== 'undefined'
  });
};
