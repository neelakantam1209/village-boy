'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle, Plus, ShoppingCart } from 'lucide-react';
import { SERVICES } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RatingStars } from '@/components/shared/rating-stars';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { useCart } from '@/hooks/use-cart';

export default function ServiceDetailPage({ params }: { params: { serviceId: string } }) {
  const service = SERVICES.find(s => s.slug === params.serviceId);
  const { addToCart } = useCart();

  if (!service) {
    notFound();
  }

  const image = getPlaceholderImage(service.image);

  return (
    <div className="container py-8 md:py-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
          <div className="mb-6">
            <p className="text-sm text-primary font-semibold uppercase tracking-wider">{service.category}</p>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-1">{service.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <RatingStars rating={service.rating} />
              <span className="text-muted-foreground text-sm">{service.rating} ({service.reviewsCount} reviews)</span>
            </div>
          </div>

          <Card className="overflow-hidden mb-8">
            <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src={image.imageUrl}
                  alt={service.name}
                  data-ai-hint={image.imageHint}
                  fill
                  className="w-full h-full object-cover"
                />
            </div>
          </Card>
          
          <div className="prose max-w-none">
            <h2 className="font-bold text-2xl">About this service</h2>
            <p>{service.description}</p>
            <p className="text-muted-foreground">Location: {service.location}</p>
            <h3 className="font-bold text-xl mt-6">What's included</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mt-4">
              {service.included.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

           <div className="mt-8">
            <h3 className="font-bold text-xl">About the Professional</h3>
            <Card className="mt-4">
              <CardContent className="p-6">
                 <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026703e" alt="Worker" />
                      <AvatarFallback>LP</AvatarFallback>
                    </Avatar>
                    <div>
                        <p><strong>Experience:</strong> 5 years</p>
                        <p><strong>Jobs Completed:</strong> 150+</p>
                        <p><strong>Bio:</strong> A highly skilled and reliable professional dedicated to quality service.</p>
                    </div>
                 </div>
                 <div className="mt-4 flex gap-2">
                    <div className="bg-secondary text-secondary-foreground px-3 py-1 text-xs rounded-full">Verified</div>
                    <div className="bg-secondary text-secondary-foreground px-3 py-1 text-xs rounded-full">Top Rated</div>
                 </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />
          
          <div>
            <h2 className="font-bold text-2xl mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="font-bold text-2xl mb-4">Customer Reviews</h2>
            <div className="space-y-6">
              {service.reviews.map(review => (
                <div key={review.id} className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{review.author}</p>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <RatingStars rating={review.rating} className="mt-1" />
                    <p className="text-sm text-foreground mt-2">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Select a Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {service.pricingTiers.map((tier, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{tier.name}</h4>
                      <p className="text-sm text-muted-foreground">${tier.price}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => addToCart(service)}>
                        <Plus className="w-4 h-4 mr-2" /> Add
                    </Button>
                  </div>
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      {tier.features.map(feat => <li key={feat}>{feat}</li>)}
                  </ul>
                </Card>
              ))}
              <Separator />
              <Button size="lg" className="w-full" onClick={() => addToCart(service)}>
                <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
