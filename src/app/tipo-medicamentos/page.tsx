'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Package, Trash2, Edit, Eye, Tag } from 'lucide-react';
import { TipoMedicamento } from '../../types';
import api from '../../lib/api';
import toast from 'react-hot-toast';

export default function TipoMedicamentosPage() {
  const [tipos, setTipos] = useState<TipoMedicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    loadTipos();
  }, []);

  const loadTipos = async () => {
    try {
      const response = await api.get('/tipo-medicamentos');
      setTipos(response.data);
    } catch (error) {
      toast.error('Error al cargar tipos de medicamento 😭');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, descripcion: string) => {
    const confirmMessage = `¿Estás seguro de eliminar "${descripcion}"?\n\n⚠️ ATENCIÓN: Esto podría afectar a los medicamentos relacionados.`;
    
    if (window.confirm(confirmMessage)) {
      setDeleting(id);
      try {
        await api.delete(`/tipo-medicamentos/${id}`);
        toast.success('Tipo de medicamento eliminado 🗑️');
        loadTipos();
      } catch (error: any) {
        if (error.response?.status === 409) {
          toast.error('No se puede eliminar: hay medicamentos usando este tipo 🚫');
        } else if (error.response?.status === 404) {
          toast.error('Tipo no encontrado 🔍');
        } else {
          toast.error('Error al eliminar tipo 😢');
        }
        console.error('Error:', error);
      } finally {
        setDeleting(null);
      }
    }
  };

  const filteredTipos = tipos.filter(tipo =>
    tipo.descripcionTipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tipo.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p style={{ marginTop: '1rem', color: '#666' }}>Cargando tipos de medicamento...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Header */}
      <div className="card-header">
        <div className="card-icon orange-gradient">
          <Package size={50} color="white" />
        </div>
        <h1 className="page-title">
          Tipos de Medicamento 📦
        </h1>
        <p className="subtitle">Gestiona las categorías y clasificaciones de medicamentos</p>
      </div>

      {/* Controles superiores */}
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
            placeholder="Buscar tipos o categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <Link href="/tipo-medicamentos/nuevo" className="btn btn-primary">
          <Plus size={18} />
          <span>Nuevo Tipo</span>
        </Link>

        <Link href="/medicamentos" className="btn btn-outline">
          <Eye size={18} />
          <span>Ver Medicamentos</span>
        </Link>
      </div>

      {/* Contador de resultados */}
      <div style={{ 
        marginBottom: '1.5rem', 
        color: '#666', 
        fontSize: '0.95rem' 
      }}>
        {filteredTipos.length === tipos.length ? (
          <span>📋 Mostrando todos los {tipos.length} tipos de medicamento</span>
        ) : (
          <span>
            📋 Mostrando {filteredTipos.length} de {tipos.length} tipos
          </span>
        )}
      </div>

      {/* Lista de tipos */}
      {filteredTipos.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Package size={64} color="#ccc" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#666', marginBottom: '1rem' }}>
            {searchTerm ? 'No se encontraron tipos' : 'No hay tipos de medicamento'}
          </h3>
          <p style={{ color: '#999', marginBottom: '1.5rem' }}>
            {searchTerm 
              ? 'Intenta con otro término de búsqueda' 
              : 'Los tipos te ayudan a organizar y categorizar tus medicamentos'
            }
          </p>
          {!searchTerm && (
            <Link href="/tipo-medicamentos/nuevo" className="btn btn-primary">
              <Plus size={18} />
              <span>Crear Primer Tipo</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-3">
          {filteredTipos.map((tipo) => (
            <div key={tipo.CodTipoMed} className="card">
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
                    gap: '8px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #ff7f50, #ff6347)',
                      padding: '8px',
                      borderRadius: '10px'
                    }}>
                      <Tag size={20} color="white" />
                    </div>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: 'bold', 
                      color: '#333',
                      margin: 0
                    }}>
                      {tipo.descripcionTipo}
                    </h3>
                  </div>
                  
                  {tipo.categoria && (
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                      }}>
                        📂 {tipo.categoria}
                      </span>
                    </div>
                  )}

                  {/* Información adicional si existe */}
                  <div style={{ 
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      color: '#666',
                      fontSize: '0.9rem'
                    }}>
                      <Package size={16} />
                      <span>
                        ID: #{tipo.CodTipoMed}
                      </span>
                    </div>
                    {tipo.medicamentos && tipo.medicamentos.length > 0 && (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        color: '#666',
                        fontSize: '0.9rem',
                        marginTop: '0.5rem'
                      }}>
                        <span>💊</span>
                        <span>
                          {tipo.medicamentos.length} medicamentos vinculados
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleDelete(tipo.CodTipoMed!, tipo.descripcionTipo)}
                  disabled={deleting === tipo.CodTipoMed}
                  className="btn btn-danger"
                  style={{ 
                    padding: '8px 12px',
                    opacity: deleting === tipo.CodTipoMed ? 0.6 : 1
                  }}
                >
                  {deleting === tipo.CodTipoMed ? (
                    <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estadísticas y información */}
      <div className="card" style={{ marginTop: '3rem' }}>
        <h3 style={{ 
          textAlign: 'center', 
          fontSize: '1.8rem', 
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#333'
        }}>
          📊 Estadísticas de Tipos
        </h3>
        
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#ff7f50' }}>
              {tipos.length}
            </div>
            <div className="stat-label">Total de Tipos</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#667eea' }}>
              {tipos.filter(t => t.categoria && t.categoria.trim()).length}
            </div>
            <div className="stat-label">Con Categoría</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#43e97b' }}>
              {[...new Set(tipos.filter(t => t.categoria).map(t => t.categoria))].length}
            </div>
            <div className="stat-label">Categorías Únicas</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#4facfe' }}>
              {tipos.reduce((sum, t) => sum + (t.medicamentos?.length || 0), 0)}
            </div>
            <div className="stat-label">Medicamentos Vinculados</div>
          </div>
        </div>

        {/* Distribución por categorías */}
        {tipos.filter(t => t.categoria).length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ 
              fontSize: '1.3rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textAlign: 'center',
              color: '#333'
            }}>
              📂 Distribución por Categorías
            </h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              {[...new Set(tipos.filter(t => t.categoria).map(t => t.categoria))].map((categoria) => {
                const tiposCategoria = tipos.filter(t => t.categoria === categoria);
                return (
                  <div key={categoria} style={{ 
                    background: 'linear-gradient(135deg, #ff7f50, #ff6347)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {tiposCategoria.length}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                      {categoria}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Información útil */}
      <div className="card" style={{ 
        marginTop: '2rem', 
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white'
      }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          💡 ¿Para qué sirven los tipos de medicamento?
        </h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🔍</span>
            <span>Organizar y clasificar tu inventario de medicamentos</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🎯</span>
            <span>Facilitar la búsqueda y filtrado de productos</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📊</span>
            <span>Generar reportes y estadísticas por categorías</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚡</span>
            <span>Agilizar el proceso de registro de nuevos medicamentos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
