'use client';
import { useState } from 'react';
import { TipoMedicamento } from '@/types';
import { Save, X, Package } from 'lucide-react';

interface Props {
  tipoMedicamento?: TipoMedicamento;
  onSubmit: (data: TipoMedicamento) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

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
  'Otros'
];

export default function TipoMedicamentoForm({ tipoMedicamento, onSubmit, onCancel, isEditing = false }: Props) {
  const [formData, setFormData] = useState<TipoMedicamento>({
    descripcionTipo: tipoMedicamento?.descripcionTipo || '',
    categoria: tipoMedicamento?.categoria || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-container">
      <div className="card">
        {/* Header */}
        <div className="card-header">
          <div className="card-icon orange-gradient">
            <Package size={40} color="white" />
          </div>
          <h1 className="page-title">
            {isEditing ? 'Editar Tipo de Medicamento 📝' : 'Nuevo Tipo de Medicamento ✨'}
          </h1>
          <p className="subtitle">
            {isEditing ? 'Actualiza el tipo de medicamento' : 'Crea una nueva categoría'}
          </p>
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
            </div>

            {/* Categoría */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">
                Categoría (Opcional)
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Seleccionar categoría...</option>
                {CATEGORIAS_COMUNES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-outline"
            >
              <X size={18} />
              <span>Cancelar</span>
            </button>
            
            <button
              type="submit"
              disabled={!formData.descripcionTipo.trim()}
              className="btn btn-primary"
              style={{ 
                opacity: !formData.descripcionTipo.trim() ? 0.6 : 1 
              }}
            >
              <Save size={18} />
              <span>{isEditing ? 'Actualizar' : 'Guardar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}