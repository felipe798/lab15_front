'use client';
import { useState, useEffect } from 'react';
import { DetalleOrden } from '@/types';
import Link from 'next/link';
import { Plus, ShoppingCart, Trash2, Package } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function OrdenesPage() {
  const [ordenes, setOrdenes] = useState<DetalleOrden[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrdenes();
  }, []);

  const loadOrdenes = async () => {
    try {
      const response = await api.get('/detalle-orden-compra');
      setOrdenes(response.data);
    } catch (error) {
      toast.error('Error al cargar órdenes 😭' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (codOrdenCompra: number, codMedicamento: number) => {
    if (window.confirm('¿Seguro que quieres eliminar esta orden? 😢')) {
      try {
        await api.delete(`/detalle-orden-compra/${codOrdenCompra}/${codMedicamento}`);
        toast.success('Orden eliminada 🗑️');
        loadOrdenes();
      } catch (error) {
        toast.error('Error al eliminar orden 😢' + error);
      }
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
        <div className="card-icon blue-gradient">
          <ShoppingCart size={50} color="white" />
        </div>
        <h1 className="page-title">
          Órdenes de Compra 🛒
        </h1>
        <p className="subtitle">Gestiona tus órdenes de medicamentos</p>
      </div>

      {/* Botón nuevo */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link href="/ordenes/nuevo" className="btn btn-secondary">
          <Plus size={18} />
          <span>Nueva Orden</span>
        </Link>
      </div>

      {/* Lista de órdenes */}
      {ordenes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <ShoppingCart size={64} color="#ccc" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#666', marginBottom: '1rem' }}>
            No hay órdenes
          </h3>
          <p style={{ color: '#999' }}>Agrega tu primera orden de compra</p>
        </div>
      ) : (
        <div className="grid" style={{ gap: '1.5rem' }}>
          {ordenes.map((orden) => (
            <div
              key={`${orden.CodOrdenCompra}-${orden.CodMedicamento}`}
              className="card"
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start'
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
                      padding: '8px',
                      borderRadius: '10px'
                    }}>
                      <Package size={20} color="white" />
                    </div>
                    <div>
                      <h3 style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        marginBottom: '4px'
                      }}>
                        Orden #{orden.CodOrdenCompra}
                      </h3>
                      <p style={{ color: '#666', fontSize: '0.9rem' }}>
                        Medicamento #{orden.CodMedicamento}
                      </p>
                    </div>
                  </div>

                  {orden.descripcion && (
                    <p style={{ 
                      color: '#555', 
                      marginBottom: '1.5rem',
                      fontSize: '0.95rem'
                    }}>
                      {orden.descripcion}
                    </p>
                  )}

                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-number" style={{ color: '#4facfe' }}>
                        {Number(orden.cantidad) || 0}
                      </div>
                      <div className="stat-label">Cantidad</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number" style={{ color: '#43e97b' }}>
                        S/ {Number(orden.precio) || 0}
                      </div>
                      <div className="stat-label">Precio Unit.</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number" style={{ color: '#667eea' }}>
                        S/ {(Number(orden.montoPres) || (Number(orden.cantidad) * Number(orden.precio))).toFixed(2)}
                      </div>
                      <div className="stat-label">Monto Total</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(orden.CodOrdenCompra, orden.CodMedicamento)}
                  className="btn btn-danger"
                  style={{ padding: '12px' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estadísticas */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ 
          textAlign: 'center', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          marginBottom: '2rem'
        }}>
          Estadísticas de Órdenes 📊
        </h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#4facfe' }}>
              {ordenes.length}
            </div>
            <div className="stat-label">Total Órdenes</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#43e97b' }}>
              {ordenes.reduce((sum, o) => sum + (Number(o.cantidad) || 0), 0)}
            </div>
            <div className="stat-label">Items Totales</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#667eea' }}>
              S/ {ordenes.reduce((sum, o) => {
                const monto = Number(o.montoPres) || (Number(o.cantidad) * Number(o.precio));
                return sum + (monto || 0);
              }, 0).toFixed(2)}
            </div>
            <div className="stat-label">Valor Total</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#fa709a' }}>
              {new Set(ordenes.map(o => o.CodOrdenCompra)).size}
            </div>
            <div className="stat-label">Órdenes Únicas</div>
          </div>
        </div>
      </div>
    </div>
  );
}