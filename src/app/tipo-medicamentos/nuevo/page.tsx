'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TipoMedicamento } from '@/types';
import { Save, X, Package, Lightbulb } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

// Categorías predefinidas comunes
const CATEGORIAS_COMUNES = [
  'Analgésicos y Antipiréticos',
  'Antibióticos',
  'Antiinflamatorios',
  'Antihistamínicos',
  'Medicamentos Cardiovasculares',
  'Medicamentos del Sistema Nervioso',
  'Medicamentos Respiratorios',
  'Medicamentos Gastrointestinales',
  'Vitaminas y Suplementos',
  'Medicamentos Dermatológicos',
  'Medicamentos Endocrinos',
  'Medicamentos Oftálmicos',
  'Otros'
];

export default function NuevoTipoMedicamento() {
  const router = useRouter();
  const [formData, setFormData] = useState<TipoMedicamento>({
    descripcionTipo: '',
    categoria: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useCustomCategory, setUseCustomCategory] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.descripcionTipo.trim()) {
      toast.error('La descripción del tipo es requerida 📝');
      return;
    }

    if (formData.descripcionTipo.length < 3) {
      toast.error('La descripción debe tener al menos 3 caracteres 📏');
      return;
    }

    if (formData.descripcionTipo.length > 255) {
      toast.error('La descripción no puede exceder 255 caracteres 📏');
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar datos
      const tipoData = {
        descripcionTipo: formData.descripcionTipo.trim(),
        categoria: formData.categoria?.trim() || null,
      };

      console.log('Enviando datos:', tipoData);

      const response = await api.post('/tipo-medicamentos', tipoData);
      
      console.log('Respuesta del servidor:', response.data);

      toast.success('¡Tipo de medicamento creado con éxito! 🎉', {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #ff7f50, #ff6347)',
          color: 'white',
        },
      });

      // Redirigir a la lista
      router.push('/tipo-medicamentos');
      
    } catch (error: any) {
      console.error('Error al crear tipo:', error);
      
      if (error.response?.status === 400) {
        toast.error('Datos inválidos. Revisa los campos 🔍');
      } else if (error.response?.status === 409) {
        toast.error('Ya existe un tipo con esa descripción 🔄');
      } else if (error.response?.status === 500) {
        toast.error('Error del servidor. Intenta más tarde 🛠️');
      } else if (error.request) {
        toast.error('No se pudo conectar al servidor 🌐');
      } else {
        toast.error('Error inesperado. Intenta nuevamente 😢');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    const hasChanges = formData.descripcionTipo.trim() || formData.categoria?.trim();
    
    if (hasChanges) {
      const confirmLeave = window.confirm(
        '¿Estás seguro de cancelar? Se perderán los cambios no guardados. 🤔'
      );
      if (!confirmLeave) return;
    }
    
    router.push('/tipo-medicamentos');
  };

  const selectPredefinedCategory = (categoria: string) => {
    setFormData(prev => ({ ...prev, categoria }));
    setUseCustomCategory(false);
  };

  return (
    <div>
      <div className="form-container">
        <div className="card">
          {/* Header */}
          <div className="card-header">
            <div className="card-icon orange-gradient">
              <Package size={40} color="white" />
            </div>
            <h1 className="page-title">
              Nuevo Tipo de Medicamento ✨
            </h1>
            <p className="subtitle">Crea una nueva categoría para organizar tus medicamentos</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Descripción del tipo */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">
                  Descripción del Tipo *
                </label>
                <input
                  type="text"
                  name="descripcionTipo"
                  value={formData.descripcionTipo}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className="form-input"
                  placeholder="Ej: Analgésicos, Antibióticos, Vitaminas..."
                  style={{ fontSize: '1.1rem' }}
                />
                <div style={{ 
                  fontSize: '0.85rem', 
                  color: '#666', 
                  marginTop: '0.5rem',
                  textAlign: 'right'
                }}>
                  {formData.descripcionTipo.length}/255 caracteres
                </div>
              </div>

              {/* Categoría */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">
                  Categoría (Opcional)
                </label>
                
                {!useCustomCategory ? (
                  <div>
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Seleccionar categoría predefinida...</option>
                      {CATEGORIAS_COMUNES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setUseCustomCategory(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#667eea',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        marginTop: '0.5rem'
                      }}
                    >
                      💡 Escribir categoría personalizada
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Escribe una categoría personalizada..."
                      maxLength={100}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setUseCustomCategory(false);
                        setFormData(prev => ({ ...prev, categoria: '' }));
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#667eea',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        marginTop: '0.5rem'
                      }}
                    >
                      🔙 Volver a categorías predefinidas
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="btn btn-outline"
              >
                <X size={18} />
                <span>Cancelar</span>
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting || !formData.descripcionTipo.trim()}
                className="btn btn-primary"
                style={{ 
                  opacity: isSubmitting || !formData.descripcionTipo.trim() ? 0.6 : 1 
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner" style={{ width: '18px', height: '18px' }}></div>
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Guardar Tipo</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sugerencias rápidas */}
      <div className="card" style={{ 
        marginTop: '2rem', 
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white'
      }}>
        <h3 style={{ 
          fontSize: '1.3rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Lightbulb size={24} />
          Sugerencias Rápidas
        </h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
            Haz clic en cualquiera de estas sugerencias para usarla:
          </p>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem'
          }}>
            {[
              'Analgésicos',
              'Antibióticos', 
              'Antiinflamatorios',
              'Vitaminas',
              'Jarabe para la Tos',
              'Medicamentos Cardiovasculares',
              'Suplementos Nutricionales'
            ].map((sugerencia) => (
              <button
                key={sugerencia}
                type="button"
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  descripcionTipo: sugerencia 
                }))}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                {sugerencia}
              </button>
            ))}
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.2)', 
          paddingTop: '1rem' 
        }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            💡 Consejos para crear tipos:
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem', opacity: 0.9 }}>
              ✅ Usa nombres descriptivos y específicos
            </li>
            <li style={{ marginBottom: '0.5rem', opacity: 0.9 }}>
              ✅ Evita duplicar tipos similares
            </li>
            <li style={{ marginBottom: '0.5rem', opacity: 0.9 }}>
              ✅ Las categorías ayudan a organizar mejor
            </li>
            <li style={{ opacity: 0.9 }}>
              ✅ Piensa en cómo buscarás los medicamentos
            </li>
          </ul>
        </div>
      </div>

      {/* Links útiles */}
      <div className="card" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>
          🔗 Enlaces útiles
        </h4>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => router.push('/tipo-medicamentos')}
            className="btn btn-outline"
          >
            📋 Ver Todos los Tipos
          </button>
          <button 
            onClick={() => router.push('/medicamentos')}
            className="btn btn-outline"
          >
            💊 Ver Medicamentos
          </button>
        </div>
      </div>
    </div>
  );
}