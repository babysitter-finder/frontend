'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/stores';
import { getToken } from '@/lib/utils/storage';

const PUBLIC_PATHS = ['/login', '/register', '/email-send', '/landing'];

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { hydrate, getUserData, user } = useUserStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Hydrate user from localStorage
    hydrate();

    const token = getToken();
    const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path));

    if (!token && !isPublicPath) {
      router.push('/login');
      return;
    }

    if (token && isPublicPath && pathname !== '/landing') {
      router.push('/');
      return;
    }

    if (token) {
      getUserData();
    }

    setIsChecking(false);
  }, [pathname, router, hydrate, getUserData]);

  // Show loading state while checking auth
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-black text-xl font-overlock">Cargando...</div>
      </div>
    );
  }

  return <>{children}</>;
}
