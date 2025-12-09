'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CalendarIcon, Clock, CreditCard, MapPin } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

const checkoutSchema = z.object({
  // Schedule
  date: z.date({ required_error: 'A date is required.' }),
  time: z.string().min(1, 'A time slot is required.'),
  // Address
  address: z.string().min(1, 'Address is required.'),
  city: z.string().min(1, 'City is required.'),
  zip: z.string().min(5, 'A valid ZIP code is required.'),
  // Payment
  cardName: z.string().min(1, 'Name on card is required.'),
  cardNumber: z.string().length(16, 'Card number must be 16 digits.'),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be MM/YY.'),
  cardCVC: z.string().length(3, 'CVC must be 3 digits.'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cartTotal } = useCart();
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      time: '09:00 AM',
      city: 'New York',
    }
  });

  function onSubmit(data: CheckoutFormValues) {
    console.log(data);
    router.push('/confirmation');
  }

  return (
    <div className="container py-8 md:py-12">
       <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
       <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
        <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="schedule">
                <CalendarIcon className="mr-2 h-4 w-4" /> Schedule
              </TabsTrigger>
              <TabsTrigger value="address">
                <MapPin className="mr-2 h-4 w-4" /> Address
              </TabsTrigger>
              <TabsTrigger value="payment">
                <CreditCard className="mr-2 h-4 w-4" /> Payment
              </TabsTrigger>
            </TabsList>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <TabsContent value="schedule" className="mt-6">
                  <Card>
                    <CardHeader><CardTitle>Select Date & Time</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      'w-full pl-3 text-left font-normal',
                                      !field.value && 'text-muted-foreground'
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, 'PPP')
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* In a real app, this would be dynamic based on availability */}
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Slot</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="address" className="mt-6">
                    <Card>
                        <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <FormField name="address" render={({field}) => <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField name="city" render={({field}) => <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                                <FormField name="zip" render={({field}) => <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="payment" className="mt-6">
                    <Card>
                        <CardHeader><CardTitle>Payment Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <FormField name="cardName" render={({field}) => <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                            <FormField name="cardNumber" render={({field}) => <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                             <div className="grid md:grid-cols-2 gap-4">
                                <FormField name="cardExpiry" render={({field}) => <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                                <FormField name="cardCVC" render={({field}) => <FormItem><FormLabel>CVC</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <div className="mt-8 flex justify-end">
                    <Button type="submit" size="lg">Place Order</Button>
                </div>
              </form>
            </Form>
          </Tabs>
        </div>
        <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Includes all taxes and fees</p>
                <div className="mt-4 text-sm">
                    <h4 className="font-semibold mb-2">Items in cart:</h4>
                    {/* In a real app this would be populated from cart context */}
                    <p className="text-muted-foreground">Home Cleaning, AC Repair...</p>
                </div>
              </CardContent>
            </Card>
          </div>
       </div>
    </div>
  );
}
