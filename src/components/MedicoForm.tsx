'use client';
import { useState } from 'react';
import { Medico } from '@/types';
import { Save, X, UserCheck } from 'lucide-react';

interface Props {
  medico?: Medico;
  onSubmit: (data: Medico) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function MedicoForm({ medico, onSubmit, onCancel, isEditing = false }: Props) {
  const [formData, setFormData] = useState<Medico>({
    nombre: medico?.nombre || '',
    apellido: medico?.apellido || '',
    especialidad: medico?.especialidad || '',
    numeroColegioMedico: medico?.numeroColegioMedico || '',
    telefono: medico?.telefono || '',
    email: medico?.email || '',
    estado: medico?.estado || 'activo',
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
          <div className="card-icon blue-gradient">
            <UserCheck size={40} color="white" />
          </div>
          <h1 className="page-title">
            {isEditing ? 'Editar Médico 📝' : 'Nuevo Médico ✨'}
          </h1>
          <p className="subtitle">
            {isEditing ? 'Actualiza la información del médico' : 'Registra un nuevo médico autorizado'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Nombre */}
            <div className="form-group">
              <label className="form-label">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Juan"
              />
            </div>

            {/* Apellido */}
            <div className="form-group">
              <label className="form-label">
                Apellido *
              </label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Pérez"
              />
            </div>

            {/* Especialidad */}
            <div className="form-group">
              <label className="form-label">
                Especialidad
              </label>
              <input
                type="text"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
                className="form-input"
                placeholder="Medicina General"
              />
            </div>

            {/* Número CMP */}
            <div className="form-group">
              <label className="form-label">
                Número CMP *
              </label>
              <input
                type="text"
                name="numeroColegioMedico"
                value={formData.numeroColegioMedico}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="12345"
              />
            </div>

            {/* Teléfono */}
            <div className="form-group">
              <label className="form-label">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="form-input"
                placeholder="999-888-777"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="doctor@email.com"
              />
            </div>

            {/* Estado */}
            <div className="form-group">
              <label className="form-label">
                Estado *
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="form-input"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          {/* Botones */}
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
              className="btn btn-primary"
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