'use client';
import { TipoMedicamento } from '@/types';
import { Trash2, Tag, Package } from 'lucide-react';

interface Props {
  tipoMedicamento: TipoMedicamento;
  onDelete: (id: number) => void;
}

export default function TipoMedicamentoCard({ tipoMedicamento, onDelete }: Props) {
  const handleDelete = () => {
    if (window.confirm(`¿Eliminar "${tipoMedicamento.descripcionTipo}"? 🤔`)) {
      onDelete(tipoMedicamento.CodTipoMed!);
    }
  };

  return (
    <div className="card">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start'
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
              {tipoMedicamento.descripcionTipo}
            </h3>
          </div>
          
          {/* Categoría si existe */}
          {tipoMedicamento.categoria && (
            <div style={{ marginBottom: '1rem' }}>
              <span style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}>
                📂 {tipoMedicamento.categoria}
              </span>
            </div>
          )}

          {/* Información adicional */}
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
              <span>ID: #{tipoMedicamento.CodTipoMed}</span>
            </div>
            
            {/* Medicamentos vinculados si existe la información */}
            {tipoMedicamento.medicamentos && tipoMedicamento.medicamentos.length > 0 && (
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
                  {tipoMedicamento.medicamentos.length} medicamentos vinculados
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Botón eliminar */}
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          style={{ padding: '8px 12px' }}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}