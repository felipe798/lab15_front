'use client';
import { useState, useEffect } from 'react';
import { Medicamento } from '@/types';
import MedicamentoCard from '@/components/MedicamentoCard';
import Link from 'next/link';
import { Plus, Search, Pill, Filter } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');

  useEffect(() => {
    loadMedicamentos();
  }, []);

  const loadMedicamentos = async () => {
    try {
      const response = await api.get('/medicamentos');
      setMedicamentos(response.data);
    } catch (error) {
      toast.error('Error al cargar medicamentos 😭');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/medicamentos/${id}`);
      toast.success('Medicamento eliminado 🗑️');
      loadMedicamentos();
    } catch (error) {
      toast.error('Error al eliminar medicamento 😢');
      console.error('Error:', error);
    }
  };

  // Filtros aplicados
  const filteredMedicamentos = medicamentos.filter(med => {
    const matchesSearch = 
      med.descripcionMed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.Marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.tipoMedicamento?.descripcionTipo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTipo = tipoFilter === '' || 
      med.tipoMedicamento?.descripcionTipo.toLowerCase().includes(tipoFilter.toLowerCase());

    const matchesStock = stockFilter === '' || 
      (stockFilter === 'alto' && med.stock > 20) ||
      (stockFilter === 'medio' && med.stock > 5 && med.stock <= 20) ||
      (stockFilter === 'bajo' && med.stock <= 5);

    return matchesSearch && matchesTipo && matchesStock;
  });

  // Obtener tipos únicos para el filtro
  const tiposUnicos = [...new Set(medicamentos
    .filter(med => med.tipoMedicamento)
    .map(med => med.tipoMedicamento!.descripcionTipo))];

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p style={{ marginTop: '1rem', color: '#666' }}>Cargando medicamentos...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Header */}
      <div className="card-header">
        <div className="card-icon purple-gradient">
          <Pill size={50} color="white" />
        </div>
        <h1 className="page-title">
          Medicamentos 💊
        </h1>
        <p className="subtitle">Gestiona tu inventario de medicina con tipos y categorías</p>
      </div>

      {/* Controles superiores */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {/* Búsqueda */}
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar medicamentos, tipos o marcas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        {/* Filtro por tipo */}
        <div style={{ position: 'relative' }}>
          <Filter size={20} style={{ 
            position: 'absolute', 
            left: '1rem', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: '#999' 
          }} />
          <select
            value={tipoFilter}
            onChange={(e) => setTipoFilter(e.target.value)}
            style={{
              padding: '0.75rem 1rem 0.75rem 3rem',
              border: '2px solid #e1e5e9',
              borderRadius: '10px',
              fontSize: '1rem',
              background: 'white',
              minWidth: '200px'
            }}
          >
            <option value="">Todos los tipos</option>
            {tiposUnicos.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        {/* Filtro por stock */}
        <div style={{ position: 'relative' }}>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '2px solid #e1e5e9',
              borderRadius: '10px',
              fontSize: '1rem',
              background: 'white',
              minWidth: '150px'
            }}
          >
            <option value="">Todo el stock</option>
            <option value="alto">Stock alto (20+)</option>
            <option value="medio">Stock medio (6-20)</option>
            <option value="bajo">Stock bajo (≤5)</option>
          </select>
        </div>
        
        {/* Botón nuevo */}
        <Link href="/medicamentos/nuevo" className="btn btn-primary">
          <Plus size={18} />
          <span>Nuevo Medicamento</span>
        </Link>
      </div>

      {/* Resumen de filtros activos */}
      {(searchTerm || tipoFilter || stockFilter) && (
        <div style={{ 
          background: 'rgba(102, 126, 234, 0.1)', 
          padding: '1rem', 
          borderRadius: '10px', 
          marginBottom: '1.5rem',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 'bold', color: '#667eea' }}>
              Filtros activos:
            </span>
            {searchTerm && (
              <span style={{ 
                background: '#667eea', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '0.85rem' 
              }}>
                🔍 "{searchTerm}"
              </span>
            )}
            {tipoFilter && (
              <span style={{ 
                background: '#4facfe', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '0.85rem' 
              }}>
                📦 {tipoFilter}
              </span>
            )}
            {stockFilter && (
              <span style={{ 
                background: '#43e97b', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '0.85rem' 
              }}>
                📊 Stock {stockFilter}
              </span>
            )}
            <button 
              onClick={() => {
                setSearchTerm('');
                setTipoFilter('');
                setStockFilter('');
              }}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#667eea', 
                textDecoration: 'underline', 
                cursor: 'pointer' 
              }}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      {/* Contador de resultados */}
      <div style={{ 
        marginBottom: '1.5rem', 
        color: '#666', 
        fontSize: '0.95rem' 
      }}>
        {filteredMedicamentos.length === medicamentos.length ? (
          <span>Mostrando todos los {medicamentos.length} medicamentos</span>
        ) : (
          <span>
            Mostrando {filteredMedicamentos.length} de {medicamentos.length} medicamentos
          </span>
        )}
      </div>

      {/* Lista de medicamentos */}
      {filteredMedicamentos.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Pill size={64} color="#ccc" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#666', marginBottom: '1rem' }}>
            {searchTerm || tipoFilter || stockFilter 
              ? 'No se encontraron medicamentos' 
              : 'No hay medicamentos registrados'
            }
          </h3>
          <p style={{ color: '#999', marginBottom: '1.5rem' }}>
            {searchTerm || tipoFilter || stockFilter
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza agregando tu primer medicamento'
            }
          </p>
          {!(searchTerm || tipoFilter || stockFilter) && (
            <Link href="/medicamentos/nuevo" className="btn btn-primary">
              <Plus size={18} />
              <span>Agregar Primer Medicamento</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-3">
          {filteredMedicamentos.map((medicamento) => (
            <MedicamentoCard
              key={medicamento.CodMedicamento}
              medicamento={medicamento}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Estadísticas generales */}
      <div className="card" style={{ marginTop: '3rem' }}>
        <h3 style={{ 
          textAlign: 'center', 
          fontSize: '1.8rem', 
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#333'
        }}>
          📊 Estadísticas del Inventario
        </h3>
        
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#667eea' }}>
              {medicamentos.length}
            </div>
            <div className="stat-label">Total Medicamentos</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#43e97b' }}>
              {medicamentos.filter(m => Number(m.stock) > 20).length}
            </div>
            <div className="stat-label">Stock Alto (20+)</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#ffd700' }}>
              {medicamentos.filter(m => Number(m.stock) > 5 && Number(m.stock) <= 20).length}
            </div>
            <div className="stat-label">Stock Medio (6-20)</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#fa709a' }}>
              {medicamentos.filter(m => Number(m.stock) <= 5).length}
            </div>
            <div className="stat-label">Stock Bajo (≤5)</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#4facfe' }}>
              {tiposUnicos.length}
            </div>
            <div className="stat-label">Tipos Diferentes</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#ff7f50' }}>
              S/ {medicamentos.reduce((sum, m) => {
                const precio = Number(m.precioVentaUni) || 0;
                const stock = Number(m.stock) || 0;
                return sum + (precio * stock);
              }, 0).toFixed(2)}
            </div>
            <div className="stat-label">Valor Total Inventario</div>
          </div>
        </div>

        {/* Resumen por tipos */}
        {tiposUnicos.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ 
              fontSize: '1.3rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textAlign: 'center',
              color: '#333'
            }}>
              📦 Distribución por Tipos
            </h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              {tiposUnicos.map((tipo) => {
                const medicamentosTipo = medicamentos.filter(m => 
                  m.tipoMedicamento?.descripcionTipo === tipo
                );
                return (
                  <div key={tipo} style={{ 
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {medicamentosTipo.length}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                      {tipo}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Alertas de stock bajo */}
      {medicamentos.filter(m => Number(m.stock) <= 5).length > 0 && (
        <div style={{ 
          background: 'linear-gradient(135deg, #fa709a, #fee140)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '15px',
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <h4 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            ⚠️ Alerta de Stock Bajo
          </h4>
          <p style={{ marginBottom: '1rem' }}>
            Tienes {medicamentos.filter(m => Number(m.stock) <= 5).length} medicamentos con stock bajo (≤5 unidades)
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {medicamentos
              .filter(m => Number(m.stock) <= 5)
              .slice(0, 5)
              .map(m => (
                <span key={m.CodMedicamento} style={{ 
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '4px 12px',
                  borderRadius: '15px',
                  fontSize: '0.85rem'
                }}>
                  {m.descripcionMed} ({m.stock})
                </span>
              ))
            }
            {medicamentos.filter(m => Number(m.stock) <= 5).length > 5 && (
              <span style={{ 
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '4px 12px',
                borderRadius: '15px',
                fontSize: '0.85rem'
              }}>
                +{medicamentos.filter(m => Number(m.stock) <= 5).length - 5} más...
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}