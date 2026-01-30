
'use client';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RatingStars } from '@/components/shared/rating-stars';
import { Check, Star, Clock, ShieldCheck, MessageCircle } from 'lucide-react';
import { getLocalImageByName } from '@/lib/image-utils';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Professional } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfessionalDetailPage({ params }: { params: { professionalId: string } }) {
  const firestore = useFirestore();
  const workerRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'workers', params.professionalId);
  }, [firestore, params.professionalId]);
  
  const { data: worker, isLoading } = useDoc<Professional>(workerRef);

  if (!isLoading && !worker) {
    notFound();
  }

  if (isLoading || !worker) {
      return (
         <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto py-12 md:py-16">
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    <div className="md:col-span-2 space-y-8">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                    <div className="md:col-span-1">
                        <Skeleton className="h-48 w-full sticky top-24" />
                    </div>
                </div>
            </div>
         </div>
      )
  }

  const workerImageSrc = getLocalImageByName(worker.image || worker.specialization || worker.name);

  // Static sample data for the detail page
  const reviews = [
    { id: 1, author: 'Aarav S.', comment: 'Very punctual and professional. Did a great job with the wiring.', rating: 5 },
    { id: 2, author: 'Priya K.', comment: 'Fixed the issue quickly. Would definitely call again.', rating: 4 },
    { id: 3, author: 'Rohan M.', comment: 'Good work, but was a bit late. Overall satisfied.', rating: 4 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Professional Header */}
            <Card className="bg-white">
              <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-primary">
                  <AvatarImage src={workerImageSrc} alt={worker.name} />
                  <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-black">{worker.name}</h1>
                  <p className="text-primary font-semibold text-lg">{worker.specialization}</p>
                  <div className="flex items-center gap-4 mt-2 justify-center sm:justify-start">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="font-bold">{worker.rating}</span>
                      <span className="text-gray-600">({reviews.length} reviews)</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <span>{worker.experience} years experience</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge variant="secondary">Verified</Badge>
                    <Badge variant="secondary">{worker.location}</Badge>
                    <Badge variant="secondary">{`$${worker.price}/hr`}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>About the Professional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {/* Static Bio */}
                  A highly skilled and reliable professional with over {worker.experience} years of experience in the field. I am dedicated to providing top-quality service and ensuring customer satisfaction on every job. My expertise covers a wide range of tasks within {worker.specialization}, from minor repairs to major installations. I pride myself on being punctual, tidy, and transparent with my pricing.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Background Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>150+ Jobs Completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-black">{review.author}</p>
                      </div>
                      <RatingStars rating={review.rating} className="mt-1" />
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="bg-white sticky top-24">
              <CardHeader>
                <CardTitle className="text-center">Book This Professional</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-black">${worker.price}<span className="text-lg font-normal text-gray-600">/hr</span></p>
                <p className="text-sm text-gray-500 mt-1">(Price may vary based on task complexity)</p>
                <Button size="lg" className="w-full mt-6">
                  Book Now
                </Button>
                <Button variant="outline" size="lg" className="w-full mt-2">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
