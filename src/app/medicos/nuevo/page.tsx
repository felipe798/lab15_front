'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, UserCheck } from 'lucide-react';
import { Medico } from '../../../types';
import api from '../../../lib/api';
import toast from 'react-hot-toast';

export default function NuevoMedico() {
  const router = useRouter();
  const [formData, setFormData] = useState<Medico>({
    nombre: '',
    apellido: '',
    especialidad: '',
    numeroColegioMedico: '',
    telefono: '',
    email: '',
    estado: 'activo',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones simples
    if (!formData.nombre.trim() || !formData.apellido.trim()) {
      toast.error('Nombre y apellido son requeridos 📝');
      return;
    }

    if (!formData.numeroColegioMedico.trim()) {
      toast.error('El número CMP es requerido 🆔');
      return;
    }

    try {
      await api.post('/medicos', formData);
      toast.success('¡Médico registrado con éxito! 🎉');
      router.push('/medicos');
    } catch (error) {
      toast.error('Error al registrar médico 😢');
    }
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
            Nuevo Médico ✨
          </h1>
          <p className="subtitle">Registra un nuevo médico autorizado</p>
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
              onClick={() => router.push('/medicos')}
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
              <span>Guardar Médico</span>
            </button>
          </div>
        </form>
      </div>

      {/* Información adicional simple */}
      <div className="card" style={{ 
        marginTop: '2rem', 
        background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        color: 'white'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          💡 Información importante
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>✅ El número CMP debe ser único</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ La especialidad es opcional pero recomendada</li>
          <li style={{ marginBottom: '0.5rem' }}>✅ Puedes activar/desactivar médicos después</li>
          <li>✅ Los datos de contacto son opcionales</li>
        </ul>
      </div>
    </div>
  );
}