'use client';
import { Medicamento } from '@/types';
import {Trash2, Calendar, Package, DollarSign } from 'lucide-react';

interface Props {
  medicamento: Medicamento;
  onDelete: (id: number) => void;
}

export default function MedicamentoCard({ medicamento, onDelete }: Props) {
  const handleDelete = () => {
    if (window.confirm('¿Seguro que quieres eliminar este medicamento? 😢')) {
      onDelete(medicamento.CodMedicamento!);
    }
  };

  const getStockBadge = () => {
    if (medicamento.stock > 20) {
      return { text: '✅ En stock', class: 'badge-success' };
    } else if (medicamento.stock > 5) {
      return { text: '⚠️ Poco stock', class: 'badge-warning' };
    } else {
      return { text: '❌ Sin stock', class: 'badge-danger' };
    }
  };

  const stockBadge = getStockBadge();

  return (
    <div className="card" style={{ position: 'relative' }}>
      {/* Header con badge de stock */}
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
            {medicamento.descripcionMed}
          </h3>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            <Package size={16} />
            <span>Stock: {medicamento.stock}</span>
          </div>
        </div>
        
        <span className={`badge ${stockBadge.class}`}>
          {stockBadge.text}
        </span>
      </div>

      {/* Información del medicamento */}
      <div style={{ marginBottom: '2rem' }}>
        {medicamento.Marca && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            marginBottom: '1rem'
          }}>
            <span style={{ fontWeight: '600', color: '#333' }}>Marca:</span>
            <span style={{
              background: '#f8f9fa',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              color: '#666'
            }}>
              {medicamento.Marca}
            </span>
          </div>
        )}
        
        {medicamento.Presentacion && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            marginBottom: '1rem'
          }}>
            <span style={{ fontWeight: '600', color: '#333' }}>Presentación:</span>
            <span style={{
              background: '#f8f9fa',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              color: '#666'
            }}>
              {medicamento.Presentacion}
            </span>
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          marginBottom: '1rem'
        }}>
          <DollarSign size={16} color="#43e97b" />
          <span style={{ 
            fontWeight: 'bold', 
            fontSize: '1.2rem',
            color: '#43e97b'
          }}>
            S/ {medicamento.precioVentaUni}
          </span>
        </div>

        {medicamento.fechaVencimiento && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            <Calendar size={16} />
            <span>
              Vence: {new Date(medicamento.fechaVencimiento).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleDelete}
          className="btn btn-danger"
        >
          <Trash2 size={16} />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  );
}