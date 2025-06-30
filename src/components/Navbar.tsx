'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Pill, ShoppingCart, Sparkles } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link href="/" className="logo">
          <div className="logo-icon">
            <Pill size={24} color="#667eea" />
          </div>
          <div className="logo-text">
            FarmaCool <Sparkles size={16} className="animate-pulse" />
          </div>
        </Link>

        <div className="nav-links">
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
          >
            <Home size={18} />
            <span>Inicio</span>
          </Link>

          <Link
            href="/medicamentos"
            className={`nav-link ${pathname.startsWith('/medicamentos') ? 'active' : ''}`}
          >
            <Pill size={18} />
            <span>Medicamentos</span>
          </Link>

          <Link
            href="/ordenes"
            className={`nav-link ${pathname.startsWith('/ordenes') ? 'active' : ''}`}
          >
            <ShoppingCart size={18} />
            <span>Órdenes</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}