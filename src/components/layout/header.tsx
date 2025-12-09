'use client';

import Link from 'next/link';
import {
  User,
  ShoppingCart
} from 'lucide-react';

import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { LocationSearch } from '@/components/shared/location-search';
import { ServiceSearch } from '@/components/shared/service-search';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';


export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/professionals', label: 'Professionals' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="mr-6 flex items-center">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={cn(
                    "text-foreground/60 transition-colors hover:text-foreground/80",
                    pathname === link.href && "font-bold text-foreground underline"
                  )}
                >
                    {link.label}
                </Link>
            ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="hidden md:flex items-center gap-2 w-full max-w-md">
                <ServiceSearch />
                <LocationSearch />
            </div>
            <nav className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                            <span className="sr-only">User Profile</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Are you an Admin or a User?</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/admin/login')}>
                            Admin Login
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/signup')}>
                            New User Registration
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" asChild>
                    <Link href="/cart">
                        <ShoppingCart className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                        <span className="sr-only">Cart</span>
                    </Link>
                </Button>
            </nav>
        </div>
      </div>
    </header>
  );
}
