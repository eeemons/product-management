'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = pathname !== '/login';

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </>
  );
}
