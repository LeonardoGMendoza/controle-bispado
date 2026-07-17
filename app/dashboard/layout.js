'use client';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === '/dashboard';

  return (
    <SessionProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {!isHome && (
          <header style={{
            backgroundColor: '#1e40af',
            padding: '12px 20px',
            color: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 50
          }}>
            <Link href="/dashboard" style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'background-color 0.2s'
            }}>
              <span>← Voltar ao Menu</span>
            </Link>
          </header>
        )}
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
