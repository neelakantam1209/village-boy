import { Calendar, UserCheck, Smile } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const steps = [
  {
    icon: Calendar,
    title: '1. Book a Service',
    description: 'Select the service you need, choose a convenient time, and book instantly.',
  },
  {
    icon: UserCheck,
    title: '2. Professional Arrives',
    description: 'A verified and skilled professional will arrive at your doorstep on time.',
  },
  {
    icon: Smile,
    title: '3. Relax & Enjoy',
    description: 'Sit back while the job gets done to perfection. Pay online and rate your professional.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-black">How It Works</h2>
        <p className="text-center text-gray-600 mt-2">
          Get any job done in just a few simple steps.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {steps.map((step, index) => (
            <Card key={index} className="text-center bg-transparent border-0 shadow-none">
              <CardHeader>
                <div className="mx-auto bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className='text-xl font-semibold text-black'>{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
