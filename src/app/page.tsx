import Link from 'next/link';
import { Pill, UserCheck, FileText, TrendingUp, Heart, Zap, Star, Package } from 'lucide-react';

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
          <span>Sistema de Farmacia Completo</span>
          <Star size={16} />
        </div>
        
        <h1 className="hero-title">
          FarmaCool 💊
        </h1>
        
        <p className="subtitle">
          Gestiona tu farmacia de manera <strong style={{color: '#667eea'}}>súper completa</strong> con médicos y recetas
        </p>
      </div>

      {/* Cards principales */}
      <div className="grid grid-2" style={{ marginBottom: '3rem' }}>
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

        <Link href="/tipo-medicamentos" className="card-clickable">
          <div className="card">
            <div className="card-header">
              <div className="card-icon orange-gradient">
                <Package size={40} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Tipos de Medicamento
              </h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Categorías y clasificaciones
              </p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '5px',
                color: '#ff7f50',
                fontWeight: 'bold'
              }}>
                <span>Gestionar tipos</span>
                <Zap size={16} className="animate-pulse" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/medicos" className="card-clickable">
          <div className="card">
            <div className="card-header">
              <div className="card-icon blue-gradient">
                <UserCheck size={40} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Médicos
              </h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Registro de médicos autorizados
              </p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '5px',
                color: '#4facfe',
                fontWeight: 'bold'
              }}>
                <span>Ver médicos</span>
                <Zap size={16} className="animate-pulse" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/recetas" className="card-clickable">
          <div className="card">
            <div className="card-header">
              <div className="card-icon green-gradient">
                <FileText size={40} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Recetas Médicas
              </h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Gestión de recetas y dispensación
              </p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '5px',
                color: '#43e97b',
                fontWeight: 'bold'
              }}>
                <span>Ver recetas</span>
                <Zap size={16} className="animate-pulse" />
              </div>
            </div>
          </div>
        </Link>
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
              Sistema Completo
            </h3>
            <p style={{ color: '#666' }}>Medicamentos, médicos y recetas</p>
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

      {/* Información rápida */}
      <div className="card" style={{ 
        marginTop: '2rem', 
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white'
      }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          🎯 ¿Qué puedes hacer?
        </h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💊</span>
            <span>Gestionar inventario de medicamentos por tipos</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>👨‍⚕️</span>
            <span>Registrar y administrar médicos autorizados</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📋</span>
            <span>Crear recetas médicas como boletas completas</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📊</span>
            <span>Ver estadísticas y reportes en tiempo real</span>
          </div>
        </div>
      </div>

      {/* Enlaces rápidos */}
      <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>
          🚀 Acciones rápidas
        </h4>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/medicamentos/nuevo" className="btn btn-primary">
            <Pill size={18} />
            <span>Nuevo Medicamento</span>
          </Link>
          <Link href="/medicos/nuevo" className="btn btn-secondary">
            <UserCheck size={18} />
            <span>Nuevo Médico</span>
          </Link>
          <Link href="/recetas/nuevo" className="btn btn-success">
            <FileText size={18} />
            <span>Nueva Receta</span>
          </Link>
          <Link href="/tipo-medicamentos/nuevo" className="btn btn-outline">
            <Package size={18} />
            <span>Nuevo Tipo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}