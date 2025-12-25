'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/ui';

interface SelectionCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

function SelectionCard({ icon, title, description, href }: SelectionCardProps) {
  return (
    <Link
      href={href}
      className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-8 w-[220px] flex flex-col items-center text-center cursor-pointer border-2 border-transparent hover:border-illustration-primary hover:scale-105 transition-all duration-200"
    >
      <span className="text-5xl mb-4">{icon}</span>
      <h2 className="text-xl font-bold font-overlock text-black mb-2">{title}</h2>
      <p className="text-sm text-gray-600 font-roboto">{description}</p>
    </Link>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Selection */}
      <div className="flex-1 flex flex-col justify-center items-center px-[var(--spacing-large)] bg-section">
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <Logo size="large" />
          </div>

          <h1 className="text-3xl font-overlock text-black mb-10">
            ¿Cómo quieres unirte?
          </h1>

          <div className="flex gap-6 mb-10">
            <SelectionCard
              icon="👶"
              title="Soy Niñera"
              description="Quiero ofrecer mis servicios de cuidado"
              href="/register"
            />
            <SelectionCard
              icon="👨‍👩‍👧"
              title="Soy Cliente"
              description="Busco una niñera para mi familia"
              href="/register-client"
            />
          </div>

          <p className="text-gray-600 font-roboto">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-illustration-primary font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-1 bg-illustration-primary relative">
        <Image
          src="/assets/background.jpg"
          alt="Hi Sitter"
          fill
          className="object-cover opacity-80"
        />
      </div>
    </div>
  );
}
