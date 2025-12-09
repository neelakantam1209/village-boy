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
  SidebarGroup,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/shared/logo';
import {
  LayoutDashboard,
  Package,
  Shapes,
  ShoppingCart,
  Users,
  LogOut,
  Settings,
  BarChart,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Bookings', icon: ShoppingCart },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/workers', label: 'Workers', icon: Users },
    { href: '/admin/services', label: 'Services', icon: Package },
    { href: '/admin/categories', label: 'Categories', icon: Shapes },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Logo />
          <SidebarTrigger className="hidden md:flex" />
        </SidebarHeader>
        <SidebarMenu>
          {menuItems.map((item) => (
             <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}><item.icon /><span>{item.label}</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href="/admin/settings"><Settings /><span>Settings</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
               <SidebarMenuButton tooltip="Logout">
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <div className='flex items-center gap-2 p-2'>
            <Avatar className='h-8 w-8'>
                <AvatarImage src='https://i.pravatar.cc/150?u=admin' />
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className='flex flex-col text-sm group-data-[collapsible=icon]:hidden'>
                <span className='font-semibold text-black'>Admin User</span>
                <span className='text-gray-600'>admin@localpro.com</span>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
