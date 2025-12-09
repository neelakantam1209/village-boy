import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { USER_ORDERS } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function OrdersPage() {
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
            {USER_ORDERS.map((order) => {
                const image = getPlaceholderImage(order.serviceImage);
                return (
                    <TableRow key={order.id}>
                        <TableCell className="hidden sm:table-cell">
                        <Image
                            alt={order.serviceName}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={image.imageUrl}
                            data-ai-hint={image.imageHint}
                            width="64"
                        />
                        </TableCell>
                        <TableCell className="font-medium">{order.serviceName}</TableCell>
                        <TableCell>
                        <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'} 
                            className={cn(order.status === 'Completed' && 'bg-green-600', order.status === 'Cancelled' && 'bg-red-600')}>
                            {order.status}
                        </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                        <TableCell className="text-right">${order.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
