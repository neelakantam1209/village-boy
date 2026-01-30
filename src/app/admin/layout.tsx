'use client';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function AdminAuthGuard({ children }: { children: ReactNode }) {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const router = useRouter();

    const adminRoleRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'roles_admin', user.uid);
    }, [user, firestore]);

    const { data: adminRole, isLoading: isAdminRoleLoading } = useDoc(adminRoleRef);

    const isLoading = isUserLoading || isAdminRoleLoading;

    useEffect(() => {
        if (!isLoading) {
            if (!user || !adminRole) {
                // If user is not logged in or doesn't have admin role, redirect
                router.replace('/admin/login');
            }
        }
    }, [isLoading, user, adminRole, router]);

    if (isLoading) {
        // Show a loading state while checking for auth and admin role
        return (
            <>
                <Skeleton className="h-10 w-1/3 mb-8" />
                <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </>
        )
    }

    // if user is authenticated and is an admin, render the children
    if (user && adminRole) {
        return <>{children}</>;
    }

    // Fallback, should be handled by useEffect redirect.
    return null;
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // The login page has its own full-page layout and does not need the sidebar or auth guard
  if (pathname === '/admin/login') {
      return (
          <FirebaseClientProvider>
            {children}
          </FirebaseClientProvider>
      )
  }

  return (
    <FirebaseClientProvider>
      <div className='bg-[#F6F5FF]'>
          <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
              <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
                <AdminAuthGuard>
                    {children}
                </AdminAuthGuard>
              </div>
          </SidebarInset>
          </SidebarProvider>
      </div>
    </FirebaseClientProvider>
  );
}
