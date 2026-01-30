
'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCollection, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import type { Order, Service, User } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface AdminOrderRowProps {
    order: Order;
}

function AdminOrderRow({ order }: AdminOrderRowProps) {
    const firestore = useFirestore();

    const serviceRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'services', order.serviceId);
    }, [firestore, order.serviceId]);

    const userRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'users', order.userId);
    }, [firestore, order.userId]);

    const { data: service, isLoading: isServiceLoading } = useDoc<Service>(serviceRef);
    const { data: user, isLoading: isUserLoading } = useDoc<User>(userRef);

    const isLoading = isServiceLoading || isUserLoading;

    if (isLoading) {
        return (
            <TableRow>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-full" /></TableCell>
            </TableRow>
        );
    }
    
    if (!service || !user) {
        // Handle case where service or user is not found, could be a deleted record.
        return (
            <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground text-center">
                    Associated data for this order could not be found.
                </TableCell>
            </TableRow>
        )
    }

    return (
        <TableRow key={order.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{service.name}</TableCell>
            <TableCell>
            <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'} 
                className={cn(order.status === 'Completed' && 'bg-green-600', order.status === 'Cancelled' && 'bg-red-600')}>
                {order.status}
            </Badge>
            </TableCell>
            <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
            <TableCell className="text-right">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Update Status</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

export default function AdminOrdersPage() {
  const firestore = useFirestore();

  const ordersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'orders'), orderBy('orderDate', 'desc'));
  }, [firestore]);

  const { data: orders, isLoading } = useCollection<Order>(ordersQuery);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>A list of all bookings made on UrbanLink.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={6}>Loading orders...</TableCell></TableRow>}
              {orders && orders.map((order) => (
                <AdminOrderRow key={order.id} order={order} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
