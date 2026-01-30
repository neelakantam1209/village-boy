'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, Package, Users, BarChart } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const generateChartData = () => [
    { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Jul', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Aug', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Sep', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Oct', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Nov', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Dec', total: Math.floor(Math.random() * 5000) + 1000 },
];

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<{name: string, total: number}[] | null>(null);

  useEffect(() => {
    // This runs only on the client, after hydration, to prevent mismatch
    setData(generateChartData());
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">Earnings & Analytics</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-gray-500">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-gray-500">+19% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-gray-500">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart /> Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          {data ? (
            <ResponsiveContainer width="100%" height={350}>
                <RechartsBarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="total" fill="#6F42E5" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
            </ResponsiveContainer>
          ) : (
            <Skeleton className="w-full h-[350px]" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
