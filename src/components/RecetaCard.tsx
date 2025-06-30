'use client';
import { Receta } from '@/types';
import { Trash2, Calendar, User, Pill, DollarSign } from 'lucide-react';

interface Props {
  receta: Receta;
  onDelete: (id: number) => void;
  onChangeEstado?: (id: number, estado: string) => void;
}

export default function RecetaCard({ receta, onDelete, onChangeEstado }: Props) {
  const handleDelete = () => {
    if (window.confirm('¿Eliminar esta receta? 🤔')) {
      onDelete(receta.CodReceta!);
    }
  };

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

  const estadoBadge = getEstadoBadge(receta.estado!);

  return (
    <div className="card">
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
            onClick={handleDelete}
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
            S/ {receta.subtotal?.toFixed(2)}
          </span>
        </div>

        {/* Botones de estado solo si está pendiente y hay función */}
        {receta.estado === 'pendiente' && onChangeEstado && (
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => onChangeEstado(receta.CodReceta!, 'entregado')}
              className="btn btn-success"
              style={{ fontSize: '0.8rem', padding: '4px 8px' }}
            >
              ✅ Entregar
            </button>
            <button
              onClick={() => onChangeEstado(receta.CodReceta!, 'cancelado')}
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
}