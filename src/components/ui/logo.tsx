import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const sizes = {
  small: 40,
  medium: 60,
  large: 80,
};

export function Logo({ size = 'medium' }: LogoProps) {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/assets/logo.png"
        alt="Hi Sitter Logo"
        width={sizes[size]}
        height={sizes[size]}
        priority
      />
    </Link>
  );
}
