// =================================================================================
// 📁 src/components/MedicoCard.tsx - Tarjeta de médico (NUEVO - SIMPLE)
// =================================================================================
'use client';
import { Medico } from '@/types';
import { Trash2, Phone, Mail, User } from 'lucide-react';

interface Props {
  medico: Medico;
  onDelete: (id: number) => void;
}

export default function MedicoCard({ medico, onDelete }: Props) {
  const handleDelete = () => {
    if (window.confirm(`¿Eliminar al Dr. ${medico.nombre} ${medico.apellido}? 🤔`)) {
      onDelete(medico.CodMedico!);
    }
  };

  return (
    <div className="card">
      {/* Header con info principal */}
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
          onClick={handleDelete}
          className="btn btn-danger"
          style={{ padding: '8px 16px' }}
        >
          <Trash2 size={16} />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  );
}