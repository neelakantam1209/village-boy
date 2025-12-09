import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-black">Settings</h1>
        <p className="text-gray-600">Manage your platform settings and preferences.</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Update basic platform information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input id="platform-name" defaultValue="Local Pro" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input id="support-email" type="email" defaultValue="support@localpro.com" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Payment Gateway</CardTitle>
          <CardDescription>Configure payment provider API keys.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="stripe-pk">Stripe Public Key</Label>
            <Input id="stripe-pk" placeholder="pk_test_..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stripe-sk">Stripe Secret Key</Label>
            <Input id="stripe-sk" type="password" placeholder="sk_test_..." />
          </div>
          <Button>Save Keys</Button>
        </CardContent>
      </Card>
    </div>
  );
}
