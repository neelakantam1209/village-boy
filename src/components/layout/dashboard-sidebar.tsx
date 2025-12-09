'use client';

import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/shared/logo';
import {
  LayoutDashboard,
  Package,
  LogOut,
  User,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Logo />
          <SidebarTrigger className="hidden md:flex" />
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard'}
              tooltip="Dashboard"
            >
              <Link href="/dashboard"><LayoutDashboard /><span>Dashboard</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard/orders'}
              tooltip="My Bookings"
            >
              <Link href="/dashboard/orders"><Package /><span>My Bookings</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard/profile'}
              tooltip="Profile"
            >
              <Link href="/dashboard/profile"><User /><span>Profile</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton tooltip="Logout">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className='flex items-center gap-2 p-2'>
            <Avatar className='h-8 w-8'>
                <AvatarImage src='https://i.pravatar.cc/150?u=a042581f4e29026703d' />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className='flex flex-col text-sm group-data-[collapsible=icon]:hidden'>
                <span className='font-semibold'>John Doe</span>
                <span className='text-muted-foreground'>user@email.com</span>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
