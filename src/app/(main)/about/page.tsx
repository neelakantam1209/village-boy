
'use client';

import ImageWithFallback from '@/components/shared/image-with-fallback';
import { Target, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getLocalImageByName } from '@/lib/image-utils';

const teamMembers = [
  {
    name: 'Jayaprasad Jayadevan',
    role: '',
    avatarId: 'about-jayaprasad',
  },
  {
    name: 'Dasari Harinder',
    role: '',
    avatarId: 'about-harinder',
  },
  {
    name: 'Buridi Neelakantam',
    role: '',
    avatarId: 'about-neelakantam',
  },
];

export default function AboutUsPage() {
  const teamImageSrc = getLocalImageByName('about-us-team');

  return (
    <div className="bg-background text-gray-900">
      <div className="container py-12 md:py-20">
        {/* Header Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black">
            About Local Boy
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Your trusted partner for professional home and personal services, committed to quality, reliability, and convenience.
          </p>
        </section>

        {/* Mission & Vision Section */}
        <section className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-black">Our Mission</h2>
              </div>
              <p className="mt-2 text-gray-600">
                To empower millions of professionals worldwide to deliver services at home like never seen before. We aim to make hiring a local professional as easy and seamless as shopping online, built on a foundation of trust and quality.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-black">Our Vision</h2>
              </div>
              <p className="mt-2 text-gray-600">
                To be the go-to platform for every household, providing a comprehensive range of high-quality services that improve everyday life, all while upholding the highest standards of trust, cleanliness, and safety.
              </p>
            </div>
          </div>
          <div className="relative h-80 w-full rounded-lg overflow-hidden">
            <ImageWithFallback
              src={teamImageSrc}
              alt="Our Team"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mt-20">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black">Why Choose Local Boy?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                    We are dedicated to providing an experience that prioritizes your peace of mind.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-2 border-transparent hover:border-primary transition-all">
                    <CardHeader><CardTitle className="text-black">Verified Professionals</CardTitle></CardHeader>
                    <CardContent className="text-gray-600">We conduct thorough background checks and skill verifications to ensure every professional on our platform is trustworthy and qualified.</CardContent>
                </Card>
                 <Card className="border-2 border-transparent hover:border-primary transition-all">
                    <CardHeader><CardTitle className="text-black">Uncompromising Quality</CardTitle></CardHeader>
                    <CardContent className="text-gray-600">Our standardized processes and commitment to using high-quality materials mean you get the best service, every time.</CardContent>
                </Card>
                 <Card className="border-2 border-transparent hover:border-primary transition-all">
                    <CardHeader><CardTitle className="text-black">Transparent Pricing</CardTitle></CardHeader>
                    <CardContent className="text-gray-600">No hidden fees. You see the price upfront and pay securely through the platform after the service is completed to your satisfaction.</CardContent>
                </Card>
            </div>
        </section>

        {/* Team Section */}
        <section className="mt-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black">Meet Our Leadership</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => {
              const imageSrc = getLocalImageByName(member.avatarId || member.name);
              return (
              <Card key={member.name} className="pt-6">
                <CardContent className="flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={imageSrc} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-black">{member.name}</h3>
                </CardContent>
              </Card>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
