import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const footerLinks = {
  'Company': [
    { title: 'About Us', href: '/about' },
    { title: 'Careers', href: '#' },
    { title: 'Press', href: '#' },
    { title: 'Contact', href: '#' },
    { title: 'Help', href: '#' },
  ],
  'For Customers': [
    { title: 'Services', href: '/services' },
    { title: 'Professionals', href: '/professionals' },
    { title: 'How it works', href: '#' },
  ],
  'Legal': [
    { title: 'Privacy Policy', href: '#' },
    { title: 'Terms of Service', href: '#' },
    { title: 'Cookie Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: FaFacebook, href: '#', 'aria-label': 'Facebook', color: '#1877F2' },
  { icon: FaTwitter, href: '#', 'aria-label': 'Twitter', color: '#FFFFFF' },
  { icon: FaInstagram, href: '#', 'aria-label': 'Instagram', color: '#E4405F' },
  { icon: FaLinkedin, href: '#', 'aria-label': 'LinkedIn', color: '#0A66C2' },
  { icon: FaYoutube, href: '#', 'aria-label': 'YouTube', color: '#FF0000' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white">{title}</h3>
              <ul className="mt-4 space-y-2">
                {links.map(link => (
                  <li key={link.title}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-semibold text-white">Get the app</h3>
            <div className="mt-4 space-y-2">
                <Button variant="outline" className="w-full bg-transparent border-gray-600 hover:bg-gray-800 text-white">App Store</Button>
                <Button variant="outline" className="w-full bg-transparent border-gray-600 hover:bg-gray-800 text-white">Google Play</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col items-center justify-center">
            <div className="flex space-x-6">
                {socialLinks.map(link => (
                  <Link key={link['aria-label']} href={link.href} aria-label={link['aria-label']} className="text-gray-400 hover:text-white transition-colors">
                      <link.icon className="h-6 w-6" style={ link['aria-label'] !== 'Instagram' ? {color: link.color} : {}} />
                  </Link>
                ))}
            </div>
            <p className="text-sm text-gray-400 mt-8">
                © {new Date().getFullYear()} Local Boy. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
