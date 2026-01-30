import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Home">
      <Image
        src="/logo/logo.png"
        alt="Local Boy Home Services Logo"
        width={512}
        height={512}
        className="h-12 w-12"
        priority
      />
    </Link>
  );
}
