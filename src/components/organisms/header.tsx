'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui';
import { useUserStore } from '@/stores';

interface HeaderProps {
  variant?: 'default' | 'pink';
}

export function Header({ variant = 'default' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUserStore();

  return (
    <header
      className={cn(
        'flex justify-between items-center px-[var(--spacing-medium)] py-[var(--spacing-micro)]',
        'shadow-[var(--shadow-default)]',
        variant === 'pink' ? 'bg-illustration-primary' : 'bg-section'
      )}
    >
      <Logo size="medium" />

      {user && (
        <div className="flex items-center gap-6">
          {/* Client Navigation - always show for now to test */}
          <Link
            href="/"
            className="text-black font-roboto hover:text-illustration-primary no-underline"
          >
            Encontrar niñera
          </Link>
          <Link
            href="/schedule"
            className="bg-[#1a365d] text-white px-4 py-2 rounded-full font-roboto no-underline hover:opacity-90 transition-opacity"
          >
            Agenda
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
          >
            <span className="font-roboto text-black">{user.first_name}</span>
            <div className="w-10 h-10 rounded-full border border-black overflow-hidden">
              <Image
                src={user.picture || '/assets/girl.jpeg'}
                alt="Profile"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 bg-section rounded-[var(--radius-card)] shadow-[var(--shadow-default)] min-w-[200px] z-50">
              <div className="flex justify-end px-2 pt-2">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1 hover:bg-container rounded-full bg-transparent border-none cursor-pointer"
                  aria-label="Cerrar menu"
                >
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="pb-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-black font-roboto hover:bg-container no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Mi Perfil
                </Link>
                <Link
                  href="/schedule"
                  className="block px-4 py-2 text-black font-roboto hover:bg-container no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Mis Citas
                </Link>
                <hr className="my-2 border-black/20" />
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2 text-negative font-roboto hover:bg-container bg-transparent border-none cursor-pointer"
                >
                  Cerrar Sesion
                </button>
              </nav>
            </div>
          )}
          </div>
        </div>
      )}
    </header>
  );
}
