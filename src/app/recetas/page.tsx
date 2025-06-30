'use client';
import { useState, useEffect } from 'react';

import Link from 'next/link';
import { Plus, Search, FileText, Trash2, Calendar, User, Pill, DollarSign } from 'lucide-react';
// CAMBIAR:

// POR:
import { Receta } from '../../types';
import api from '../../lib/api';
import toast from 'react-hot-toast';

export default function RecetasPage() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadRecetas();
  }, []);

  const loadRecetas = async () => {
    try {
      const response = await api.get('/recetas');
      setRecetas(response.data);
    } catch (error) {
      toast.error('Error al cargar recetas 😭');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar esta receta? 🤔')) {
      try {
        await api.delete(`/recetas/${id}`);
        toast.success('Receta eliminada 🗑️');
        loadRecetas();
      } catch (error) {
        toast.error('Error al eliminar receta 😢');
      }
    }
  };

  const handleChangeEstado = async (id: number, nuevoEstado: string) => {
    try {
      await api.put(`/recetas/${id}/estado`, { estado: nuevoEstado });
      toast.success('Estado actualizado 🎉');
      loadRecetas();
    } catch (error) {
      toast.error('Error al actualizar estado 😢');
    }
  };

  const filteredRecetas = recetas.filter(receta =>
    receta.nombrePaciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receta.apellidoPaciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receta.medico?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receta.medicamento?.descripcionMed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return { text: '⏳ Pendiente', class: 'badge-warning' };
      case 'entregado':
        return { text: '✅ Entregado', class: 'badge-success' };
      case 'cancelado':
        return { text: '❌ Cancelado', class: 'badge-danger' };
      default:
        return { text: '❓ Desconocido', class: 'badge-secondary' };
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Header */}
      <div className="card-header">
        <div className="card-icon green-gradient">
          <FileText size={50} color="white" />
        </div>
        <h1 className="page-title">
          Recetas Médicas 📋
        </h1>
        <p className="subtitle">Gestiona las recetas y dispensación</p>
      </div>

      {/* Búsqueda y botón nuevo */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar por paciente, médico o medicamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <Link href="/recetas/nuevo" className="btn btn-primary">
          <Plus size={18} />
          <span>Nueva Receta</span>
        </Link>
      </div>

      {/* Lista de recetas */}
      {filteredRecetas.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <FileText size={64} color="#ccc" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#666', marginBottom: '1rem' }}>
            {searchTerm ? 'No se encontraron recetas' : 'No hay recetas registradas'}
          </h3>
          <p style={{ color: '#999' }}>
            {searchTerm ? 'Intenta con otro término' : 'Agrega tu primera receta'}
          </p>
        </div>
      ) : (
        <div className="grid">
          {filteredRecetas.map((receta) => {
            const estadoBadge = getEstadoBadge(receta.estado!);
            return (
              <div key={receta.CodReceta} className="card">
                {/* Header de la receta */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: 'bold', 
                      color: '#333',
                      marginBottom: '0.5rem'
                    }}>
                      Receta #{receta.CodReceta}
                    </h3>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      marginBottom: '0.5rem'
                    }}>
                      <User size={16} color="#666" />
                      <span style={{ color: '#666' }}>
                        {receta.nombrePaciente} {receta.apellidoPaciente}
                      </span>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px'
                    }}>
                      <Calendar size={16} color="#666" />
                      <span style={{ color: '#666' }}>
                        {new Date(receta.fechaEmision!).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className={`badge ${estadoBadge.class}`}>
                      {estadoBadge.text}
                    </span>
                    <button
                      onClick={() => handleDelete(receta.CodReceta!)}
                      className="btn btn-danger"
                      style={{ padding: '6px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Información del médico */}
                {receta.medico && (
                  <div style={{ 
                    background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '10px',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1rem' }}>
                      👨‍⚕️ Dr. {receta.medico.nombre} {receta.medico.apellido}
                    </h4>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: 0 }}>
                      {receta.medico.especialidad} • CMP: {receta.medico.numeroColegioMedico}
                    </p>
                  </div>
                )}

                {/* Información del medicamento */}
                {receta.medicamento && (
                  <div style={{ 
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '10px',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1rem' }}>
                      💊 {receta.medicamento.descripcionMed}
                    </h4>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }}>
                      <span>Cantidad: {receta.cantidad}</span>
                      <span>Precio: S/ {receta.precioUnitario}</span>
                    </div>
                  </div>
                )}

                {/* Instrucciones si existen */}
                {receta.instrucciones && (
                  <div style={{ 
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}>
                    <h5 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#333', fontSize: '0.95rem' }}>
                      📝 Instrucciones:
                    </h5>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                      {receta.instrucciones}
                    </p>
                  </div>
                )}

                {/* Total y acciones */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px'
                  }}>
                    <DollarSign size={20} color="#43e97b" />
                    <span style={{ 
                      fontWeight: 'bold', 
                      fontSize: '1.2rem',
                      color: '#43e97b'
                    }}>
                      S/ {Number(receta.subtotal || 0).toFixed(2)}
                    </span>
                  </div>

                  {/* Botones de estado solo si está pendiente */}
                  {receta.estado === 'pendiente' && (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => handleChangeEstado(receta.CodReceta!, 'entregado')}
                        className="btn btn-success"
                        style={{ fontSize: '0.8rem', padding: '4px 8px' }}
                      >
                        ✅ Entregar
                      </button>
                      <button
                        onClick={() => handleChangeEstado(receta.CodReceta!, 'cancelado')}
                        className="btn btn-danger"
                        style={{ fontSize: '0.8rem', padding: '4px 8px' }}
                      >
                        ❌ Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Estadísticas simples */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ 
          textAlign: 'center', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          marginBottom: '2rem'
        }}>
          📊 Estadísticas de Recetas
        </h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#43e97b' }}>
              {recetas.length}
            </div>
            <div className="stat-label">Total Recetas</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#ffd700' }}>
              {recetas.filter(r => r.estado === 'pendiente').length}
            </div>
            <div className="stat-label">Pendientes</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#4facfe' }}>
              {recetas.filter(r => r.estado === 'entregado').length}
            </div>
            <div className="stat-label">Entregadas</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#667eea' }}>
              S/ {recetas.reduce((sum, r) => sum + (r.subtotal || 0), 0).toFixed(2)}
            </div>
            <div className="stat-label">Valor Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}
