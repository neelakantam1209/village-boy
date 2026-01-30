
'use client';

import ImageWithFallback from '@/components/shared/image-with-fallback';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getLocalImageByName } from '@/lib/image-utils';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
      {cartCount === 0 ? (
        <Card className="text-center py-20">
          <CardContent>
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mt-4">Your cart is empty</h2>
            <p className="text-muted-foreground mt-2">Looks like you haven't added any services yet.</p>
            <Button asChild className="mt-6">
              <Link href="/">Explore Services</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map(item => {
              const imageSrc = getLocalImageByName(item.image || item.name);
              return (
                <Card key={item.id} className="flex items-center p-4">
                  <div className="relative w-[120px] h-[90px] rounded-md overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={imageSrc}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-muted-foreground">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 h-8 text-center mx-2"
                        readOnly
                      />
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive mt-2" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
