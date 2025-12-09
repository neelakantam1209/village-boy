import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome back, John!</h1>
      <p className="text-muted-foreground">Here's a quick overview of your account.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              AC Repair & Wall Painting
            </p>
            <Button variant="link" asChild className="p-0 h-auto mt-4">
              <Link href="/dashboard/orders">View all bookings <ArrowRight className="h-4 w-4 ml-1"/></Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">
              +200 from last month
            </p>
             <Button variant="link" asChild className="p-0 h-auto mt-4">
              <Link href="#">View rewards <ArrowRight className="h-4 w-4 ml-1"/></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

       <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Need something else?</CardTitle>
              <CardDescription>Explore our top categories and find the service you need.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4">
                    <Button asChild><Link href="/services/cleaning">Home Cleaning</Link></Button>
                    <Button asChild variant="secondary"><Link href="/services/repairs">Repairs</Link></Button>
                    <Button asChild variant="secondary"><Link href="/services/beauty-wellness">Beauty</Link></Button>
                </div>
            </CardContent>
          </Card>
       </div>

    </div>
  );
}
