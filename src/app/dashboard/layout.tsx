import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
