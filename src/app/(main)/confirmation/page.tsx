import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConfirmationPage() {
  return (
    <div className="container flex items-center justify-center py-20 md:py-32">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <CardTitle className="text-3xl font-bold mt-6">Booking Confirmed!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Thank you for choosing UrbanLink.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your booking details and confirmation have been sent to your email address. You can also view your booking details on your dashboard.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard/orders">View Bookings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
