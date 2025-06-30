import Link from 'next/link';
import { Pill, ShoppingCart, TrendingUp, Heart, Zap, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="animate-bounce" style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          padding: '8px 20px',
          borderRadius: '25px',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          marginBottom: '2rem'
        }}>
          <Star size={16} />
          <span>Sistema de Farmacia Estudiante</span>
          <Star size={16} />
        </div>
        
        <h1 className="hero-title">
          FarmaCool 💊
        </h1>
        
        <p className="subtitle">
          Gestiona tu farmacia de manera <strong style={{color: '#667eea'}}>súper fácil</strong> y con estilo
        </p>
      </div>

      {/* Cards principales */}
      <div className="grid grid-3" style={{ marginBottom: '3rem' }}>
        <Link href="/medicamentos" className="card-clickable">
          <div className="card">
            <div className="card-header">
              <div className="card-icon purple-gradient">
                <Pill size={40} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Medicamentos
              </h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Administra tu inventario de medicina
              </p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '5px',
                color: '#667eea',
                fontWeight: 'bold'
              }}>
                <span>Ver medicamentos</span>
                <Zap size={16} className="animate-pulse" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/ordenes" className="card-clickable">
          <div className="card">
            <div className="card-header">
              <div className="card-icon blue-gradient">
                <ShoppingCart size={40} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Órdenes de Compra
              </h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Gestiona las órdenes de medicamentos
              </p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '5px',
                color: '#4facfe',
                fontWeight: 'bold'
              }}>
                <span>Ver órdenes</span>
                <Zap size={16} className="animate-pulse" />
              </div>
            </div>
          </div>
        </Link>

        <div className="card">
          <div className="card-header">
            <div className="card-icon green-gradient">
              <TrendingUp size={40} color="white" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Estadísticas
            </h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Reportes y análisis (próximamente...)
            </p>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '5px',
              color: '#43e97b',
              fontWeight: 'bold'
            }}>
              <span>Muy pronto</span>
              <Heart size={16} className="animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Sección características */}
      <div className="card">
        <h2 className="page-title">
          ¿Por qué FarmaCool es genial? 🚀
        </h2>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              width: '60px',
              height: '60px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Zap size={24} color="white" />
            </div>
            <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              Súper Rápido
            </h3>
            <p style={{ color: '#666' }}>Gestiona todo en segundos</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              width: '60px',
              height: '60px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Heart size={24} color="white" />
            </div>
            <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              Fácil de Usar
            </h3>
            <p style={{ color: '#666' }}>Diseñado para estudiantes</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
              width: '60px',
              height: '60px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Star size={24} color="white" />
            </div>
            <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              Diseño Cool
            </h3>
            <p style={{ color: '#666' }}>Interfaz moderna y atractiva</p>
          </div>
        </div>
      </div>
    </div>
  );
}