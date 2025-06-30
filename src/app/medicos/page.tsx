'use client';
import { useState, useEffect } from 'react';
import { Medico } from '@/types';
import Link from 'next/link';
import { Plus, Search, UserCheck, Trash2, Phone, Mail, User } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function MedicosPage() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMedicos();
  }, []);

  const loadMedicos = async () => {
    try {
      const response = await api.get('/medicos');
      setMedicos(response.data);
    } catch (error) {
      toast.error('Error al cargar médicos 😭');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, nombre: string) => {
    if (window.confirm(`¿Eliminar al Dr. ${nombre}? 🤔`)) {
      try {
        await api.delete(`/medicos/${id}`);
        toast.success('Médico eliminado 🗑️');
        loadMedicos();
      } catch (error) {
        toast.error('Error al eliminar médico 😢');
      }
    }
  };

  const filteredMedicos = medicos.filter(medico =>
    medico.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medico.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medico.especialidad?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="card-icon blue-gradient">
          <UserCheck size={50} color="white" />
        </div>
        <h1 className="page-title">
          Médicos 👨‍⚕️
        </h1>
        <p className="subtitle">Gestiona los médicos autorizados</p>
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
            placeholder="Buscar médicos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <Link href="/medicos/nuevo" className="btn btn-primary">
          <Plus size={18} />
          <span>Nuevo Médico</span>
        </Link>
      </div>

      {/* Lista de médicos */}
      {filteredMedicos.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <UserCheck size={64} color="#ccc" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#666', marginBottom: '1rem' }}>
            {searchTerm ? 'No se encontraron médicos' : 'No hay médicos registrados'}
          </h3>
          <p style={{ color: '#999' }}>
            {searchTerm ? 'Intenta con otro término' : 'Agrega tu primer médico'}
          </p>
        </div>
      ) : (
        <div className="grid grid-2">
          {filteredMedicos.map((medico) => (
            <div key={medico.CodMedico} className="card">
              {/* Header de la card */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '1.5rem'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                      padding: '10px',
                      borderRadius: '12px'
                    }}>
                      <User size={24} color="white" />
                    </div>
                    <div>
                      <h3 style={{ 
                        fontSize: '1.3rem', 
                        fontWeight: 'bold', 
                        color: '#333',
                        margin: 0
                      }}>
                        Dr. {medico.nombre} {medico.apellido}
                      </h3>
                      {medico.especialidad && (
                        <span style={{
                          background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          marginTop: '0.5rem',
                          display: 'inline-block'
                        }}>
                          {medico.especialidad}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Estado */}
                <span className={`badge ${medico.estado === 'activo' ? 'badge-success' : 'badge-danger'}`}>
                  {medico.estado === 'activo' ? '✅ Activo' : '❌ Inactivo'}
                </span>
              </div>

              {/* Información del médico */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  marginBottom: '0.8rem',
                  padding: '0.5rem',
                  background: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontWeight: '600', color: '#333', minWidth: '40px' }}>CMP:</span>
                  <span style={{ color: '#666' }}>{medico.numeroColegioMedico}</span>
                </div>

                {medico.telefono && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    marginBottom: '0.8rem'
                  }}>
                    <Phone size={16} color="#4facfe" />
                    <span style={{ color: '#666' }}>{medico.telefono}</span>
                  </div>
                )}

                {medico.email && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px'
                  }}>
                    <Mail size={16} color="#4facfe" />
                    <span style={{ color: '#666' }}>{medico.email}</span>
                  </div>
                )}
              </div>

              {/* Botón eliminar */}
              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={() => handleDelete(medico.CodMedico!, `${medico.nombre} ${medico.apellido}`)}
                  className="btn btn-danger"
                  style={{ padding: '8px 16px' }}
                >
                  <Trash2 size={16} />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          ))}
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
          📊 Estadísticas
        </h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#4facfe' }}>
              {medicos.length}
            </div>
            <div className="stat-label">Total Médicos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#43e97b' }}>
              {medicos.filter(m => m.estado === 'activo').length}
            </div>
            <div className="stat-label">Activos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#fa709a' }}>
              {medicos.filter(m => m.estado === 'inactivo').length}
            </div>
            <div className="stat-label">Inactivos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#667eea' }}>
              {[...new Set(medicos.filter(m => m.especialidad).map(m => m.especialidad))].length}
            </div>
            <div className="stat-label">Especialidades</div>
          </div>
        </div>
      </div>
    </div>
  );
}