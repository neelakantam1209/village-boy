import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, Package, Users, Clock } from 'lucide-react';

const stats = [
    { title: "Total Revenue", value: "$45,231.89", change: "+20.1% from last month", icon: DollarSign },
    { title: "Bookings", value: "+2350", change: "+180.1% from last month", icon: Package },
    { title: "New Users", value: "+120", change: "+19% from last month", icon: Users },
    { title: "Pending Orders", value: "32", change: "+2 since last hour", icon: Clock },
]

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
      <p className="text-gray-600">Overview of your Local Boy platform.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {stats.map(stat => (
             <Card key={stat.title} className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-black">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-black">{stat.value}</div>
                    <p className="text-xs text-gray-600">{stat.change}</p>
                </CardContent>
             </Card>
        ))}
      </div>
      
       <div className="mt-8">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-black">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Placeholder for recent bookings and user sign-ups feed.</p>
            </CardContent>
          </Card>
       </div>
    </div>
  );
}
