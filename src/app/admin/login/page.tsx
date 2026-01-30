'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(1, 'Password is required.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@localboy.com'
    }
  });

  function onSubmit(data: LoginFormValues) {
    console.log(data);
    // In a real app, you'd verify credentials
    router.push('/admin');
  }

  return (
    <div className="container flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-black">Admin Login</CardTitle>
          <CardDescription>Access the Local Boy Dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-md">
                Sign In
              </Button>
            </form>
          </Form>
           <p className="mt-6 text-center text-sm text-gray-600">
            Not an admin?{' '}
            <Link href="/" className="text-primary hover:underline font-medium">
              Back to site
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
