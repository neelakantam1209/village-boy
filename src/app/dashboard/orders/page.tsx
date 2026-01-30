
'use client';

import ImageWithFallback from '@/components/shared/image-with-fallback';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getLocalImageByName } from '@/lib/image-utils';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUser, useFirestore, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, where, doc } from 'firebase/firestore';
import type { Order, Service } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface OrderRowProps {
    order: Order;
}

function OrderRow({ order }: OrderRowProps) {
    const firestore = useFirestore();

    const serviceRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'services', order.serviceId);
    }, [firestore, order.serviceId]);

    const { data: service, isLoading } = useDoc<Service>(serviceRef);

    if (isLoading || !service) {
        return (
            <TableRow>
                <TableCell className="hidden sm:table-cell">
                    <Skeleton className="w-16 h-16 rounded-md" />
                </TableCell>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-9 w-28 ml-auto" /></TableCell>
            </TableRow>
        );
    }
    
    const imageSrc = getLocalImageByName(service.image || service.name);

    return (
        <TableRow key={order.id}>
            <TableCell className="hidden sm:table-cell">
            <div className="relative aspect-square w-16 h-16 rounded-md overflow-hidden">
                <ImageWithFallback
                    alt={service.name}
                    className="object-cover"
                    src={imageSrc}
                    fill
                />
            </div>
            </TableCell>
            <TableCell className="font-medium">{service.name}</TableCell>
            <TableCell>
            <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'} 
                className={cn(order.status === 'Completed' && 'bg-green-600', order.status === 'Cancelled' && 'bg-red-600')}>
                {order.status}
            </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
            <TableCell className="text-right">
                <Button variant="outline" size="sm">
                View Details
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default function OrdersPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const ordersQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return query(collection(firestore, 'orders'), where('userId', '==', user.uid));
    }, [firestore, user]);

    const { data: orders, isLoading: areOrdersLoading } = useCollection<Order>(ordersQuery);
    
    const isLoading = isUserLoading || areOrdersLoading;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
        <CardDescription>A history of all your service bookings with UrbanLink.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                Service
              </TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={6} className="text-center">Loading your bookings...</TableCell></TableRow>}
            {!isLoading && orders && orders.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center">You have no bookings yet.</TableCell></TableRow>
            )}
            {orders && orders.map((order) => (
                <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
