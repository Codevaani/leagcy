'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign,
  Eye,
  Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { useOrders, useTiffins, useUsers, useAdminStats } from "@/hooks/useAdminData";
import { formatDistanceToNow } from "date-fns";
import { TiffinForm } from "@/components/TiffinForm";
import { OptimizedImage } from "@/components/OptimizedImage";

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [editingTiffin, setEditingTiffin] = useState<any>(null);
  const [viewingTiffin, setViewingTiffin] = useState<any>(null);
  const [addingTiffin, setAddingTiffin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: tiffins, isLoading: tiffinsLoading } = useTiffins();
  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: stats, isLoading: statsLoading } = useAdminStats();

  const handleAddTiffin = async (tiffinData: any) => {
    setAddingTiffin(true);
    try {
      const response = await fetch('/api/tiffins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tiffinData),
      });

      if (response.ok) {
        alert('Tiffin added successfully!');
        setShowAddForm(false);
        window.location.reload();
      } else {
        throw new Error('Failed to add tiffin');
      }
    } catch (error) {
      alert('Failed to add tiffin');
    } finally {
      setAddingTiffin(false);
    }
  };

  const handleDeleteTiffin = async (tiffinId: string) => {
    if (!confirm('Are you sure you want to delete this tiffin?')) return;
    
    try {
      const response = await fetch(`/api/tiffins/${tiffinId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Tiffin deleted successfully!');
        window.location.reload();
      } else {
        throw new Error('Failed to delete tiffin');
      }
    } catch (error) {
      alert('Failed to delete tiffin');
    }
  };

  const handleEditTiffin = (tiffin: any) => {
    setEditingTiffin(tiffin);
    setShowEditForm(true);
  };

  const handleViewTiffin = (tiffin: any) => {
    setViewingTiffin(tiffin);
    setShowViewDialog(true);
  };

  const handleUpdateTiffin = async (tiffinData: any) => {
    setAddingTiffin(true);
    try {
      const response = await fetch(`/api/tiffins/${editingTiffin._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tiffinData),
      });

      if (response.ok) {
        alert('Tiffin updated successfully!');
        setShowEditForm(false);
        setEditingTiffin(null);
        window.location.reload();
      } else {
        throw new Error('Failed to update tiffin');
      }
    } catch (error) {
      alert('Failed to update tiffin');
    } finally {
      setAddingTiffin(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "out-for-delivery":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const filteredOrders = orders?.filter((order: any) => 
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some((item: any) => 
      item.tiffinId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  const statsData = [
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      change: "+12%",
      icon: Package,
      color: "text-primary"
    },
    {
      title: "Active Users",
      value: stats?.activeUsers || 0,
      change: "+8%",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Revenue",
      value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`,
      change: "+15%",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      change: "+3%",
      icon: TrendingUp,
      color: "text-purple-500"
    }
  ];

  if (statsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-surface border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your tiffin service operations</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-primary/10 text-primary">
                Admin Access
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 shadow-soft hover:shadow-glow transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="tiffins">Tiffins</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recent Orders</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Search orders..." 
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Order
                  </Button>
                </div>
              </div>

              {ordersLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No orders found. Seed some sample data to get started.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order: any) => (
                      <TableRow key={order._id}>
                        <TableCell className="font-medium">
                          {order._id.slice(-8).toUpperCase()}
                        </TableCell>
                        <TableCell>
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="text-sm">
                              {item.tiffinId?.name || 'Unknown'} x{item.quantity}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>₹{order.totalAmount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {formatStatus(order.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Card>
          </TabsContent>

          {/* Tiffins Tab */}
          <TabsContent value="tiffins">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Manage Tiffins</h3>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Tiffin
                </Button>
              </div>

              <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
                <DialogContent className="max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Tiffin</DialogTitle>
                  </DialogHeader>
                  <TiffinForm
                    onSubmit={handleAddTiffin}
                    isLoading={addingTiffin}
                  />
                </DialogContent>
              </Dialog>

              <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
                <DialogContent className="max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Tiffin</DialogTitle>
                  </DialogHeader>
                  <TiffinForm
                    onSubmit={handleUpdateTiffin}
                    isLoading={addingTiffin}
                    initialData={editingTiffin}
                  />
                </DialogContent>
              </Dialog>

              <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
                <DialogContent className="max-w-[95vw] md:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>View Tiffin Details</DialogTitle>
                  </DialogHeader>
                  {viewingTiffin && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <OptimizedImage
                          src={viewingTiffin.image}
                          alt={viewingTiffin.name}
                          width={120}
                          height={120}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-xl font-bold">{viewingTiffin.name}</h3>
                          <p className="text-muted-foreground">{viewingTiffin.category}</p>
                          <p className="text-2xl font-bold text-primary">₹{viewingTiffin.price}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-muted-foreground">{viewingTiffin.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold">Rating</h4>
                          <p>⭐ {viewingTiffin.rating || 0}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Orders</h4>
                          <p>{viewingTiffin.orders || 0}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Status</h4>
                          <Badge className={viewingTiffin.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {viewingTiffin.available ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold">Created</h4>
                          <p>{new Date(viewingTiffin.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {tiffinsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : !tiffins || tiffins.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No tiffins found. Seed some sample data to get started.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tiffins?.map((tiffin: any) => (
                      <TableRow key={tiffin._id}>
                        <TableCell>
                          <OptimizedImage
                            src={tiffin.image}
                            alt={tiffin.name}
                            width={60}
                            height={60}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{tiffin.name}</TableCell>
                        <TableCell>{tiffin.category}</TableCell>
                        <TableCell>₹{tiffin.price}</TableCell>
                        <TableCell>{tiffin.orders || 0}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>⭐</span>
                            <span>{tiffin.rating || 0}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={tiffin.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {tiffin.available ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewTiffin(tiffin)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditTiffin(tiffin)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteTiffin(tiffin._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Customer Management</h3>
              </div>

              {usersLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : !users || users.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No customers found. Users will appear here when they register.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map((user: any) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge className={user.subscription?.status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                            {user.subscription?.status || 'None'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Analytics & Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Total Tiffins</h4>
                  <p className="text-2xl font-bold">{stats?.totalTiffins || 0}</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Average Order Value</h4>
                  <p className="text-2xl font-bold">
                    ₹{stats?.totalOrders ? Math.round(stats.totalRevenue / stats.totalOrders) : 0}
                  </p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Active Subscriptions</h4>
                  <p className="text-2xl font-bold">{stats?.activeUsers || 0}</p>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
