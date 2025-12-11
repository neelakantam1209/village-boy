import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ChartLoader from './ChartLoader.tsx'; // <--- Explicit .tsx import

export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">Earnings & Analytics</h1>
      
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-gray-500">+180.1% from last month</p>
            </CardContent>
        </Card>

        <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-gray-500">+19% from last month</p>
            </CardContent>
        </Card>

        <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-gray-500">+201 since last hour</p>
            </CardContent>
        </Card>
      </div>

      {/* Chart Container */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartLoader /> 
        </CardContent>
      </Card>
    </div>
  );
}