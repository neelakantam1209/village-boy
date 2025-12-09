import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/layout/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-[#F6F5FF]'>
        <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
            <div className="p-4 sm:p-6 lg:p-8 min-h-screen">{children}</div>
        </SidebarInset>
        </SidebarProvider>
    </div>
  );
}
