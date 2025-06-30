'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Pill, UserCheck, FileText, Package, Sparkles } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <Link href="/" className="logo">
          <div className="logo-icon">
            <Pill size={24} color="#667eea" />
          </div>
          <div className="logo-text">
            Farmacia <Sparkles size={16} className="animate-pulse" />
          </div>
        </Link>

        {/* Enlaces de navegación */}
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
            href="/tipo-medicamentos"
            className={`nav-link ${pathname.startsWith('/tipo-medicamentos') ? 'active' : ''}`}
          >
            <Package size={18} />
            <span>Tipos</span>
          </Link>

          <Link
            href="/medicos"
            className={`nav-link ${pathname.startsWith('/medicos') ? 'active' : ''}`}
          >
            <UserCheck size={18} />
            <span>Médicos</span>
          </Link>

          <Link
            href="/recetas"
            className={`nav-link ${pathname.startsWith('/recetas') ? 'active' : ''}`}
          >
            <FileText size={18} />
            <span>Recetas</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}