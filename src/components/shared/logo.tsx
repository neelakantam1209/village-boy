import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="text-xl font-extrabold tracking-tight text-primary">
        Local Pro
      </span>
    </Link>
  );
}
