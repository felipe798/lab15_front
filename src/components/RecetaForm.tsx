'use client';
import { useState, useEffect } from 'react';
import { Receta, Medico, Medicamento } from '@/types';
import { Save, X, FileText } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Props {
  receta?: Receta;
  onSubmit: (data: Receta) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function RecetaForm({ receta, onSubmit, onCancel, isEditing = false }: Props) {
  const [formData, setFormData] = useState<Receta>({
    CodMedico: receta?.CodMedico || 0,
    CodMedicamento: receta?.CodMedicamento || 0,
    nombrePaciente: receta?.nombrePaciente || '',
    apellidoPaciente: receta?.apellidoPaciente || '',
    cantidad: receta?.cantidad || 1,
    dosificacion: receta?.dosificacion || '',
    instrucciones: receta?.instrucciones || '',
    precioUnitario: receta?.precioUnitario || 0,
    estado: receta?.estado || 'pendiente',
  });

  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [medicosRes, medicamentosRes] = await Promise.all([
        api.get('/medicos'),
        api.get('/medicamentos')
      ]);
      setMedicos(medicosRes.data);
      setMedicamentos(medicamentosRes.data);
    } catch (error) {
      toast.error('Error al cargar datos 😭');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  // Actualizar precio cuando se selecciona medicamento
  useEffect(() => {
    if (formData.CodMedicamento > 0) {
      const medicamento = medicamentos.find(m => m.CodMedicamento === formData.CodMedicamento);
      if (medicamento) {
        setFormData(prev => ({
          ...prev,
          precioUnitario: medicamento.precioVentaUni
        }));
      }
    }
  }, [formData.CodMedicamento, medicamentos]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="card">
        {/* Header */}
        <div className="card-header">
          <div className="card-icon green-gradient">
            <FileText size={40} color="white" />
          </div>
          <h1 className="page-title">
            {isEditing ? 'Editar Receta 📝' : 'Nueva Receta Médica ✨'}
          </h1>
          <p className="subtitle">
            {isEditing ? 'Actualiza la información de la receta' : 'Registra una nueva receta'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Médico */}
            <div className="form-group">
              <label className="form-label">
                Médico *
              </label>
              <select
                name="CodMedico"
                value={formData.CodMedico}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">Seleccionar médico...</option>
                {medicos.map((medico) => (
                  <option key={medico.CodMedico} value={medico.CodMedico}>
                    Dr. {medico.nombre} {medico.apellido} - {medico.especialidad}
                  </option>
                ))}
              </select>
            </div>

            {/* Medicamento */}
            <div className="form-group">
              <label className="form-label">
                Medicamento *
              </label>
              <select
                name="CodMedicamento"
                value={formData.CodMedicamento}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">Seleccionar medicamento...</option>
                {medicamentos.map((medicamento) => (
                  <option key={medicamento.CodMedicamento} value={medicamento.CodMedicamento}>
                    {medicamento.descripcionMed} - S/ {medicamento.precioVentaUni}
                  </option>
                ))}
              </select>
            </div>

            {/* Nombre paciente */}
            <div className="form-group">
              <label className="form-label">
                Nombre del Paciente *
              </label>
              <input
                type="text"
                name="nombrePaciente"
                value={formData.nombrePaciente}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Juan"
              />
            </div>

            {/* Apellido paciente */}
            <div className="form-group">
              <label className="form-label">
                Apellido del Paciente *
              </label>
              <input
                type="text"
                name="apellidoPaciente"
                value={formData.apellidoPaciente}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Pérez"
              />
            </div>

            {/* Cantidad */}
            <div className="form-group">
              <label className="form-label">
                Cantidad *
              </label>
              <input
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                required
                min="1"
                className="form-input"
                placeholder="1"
              />
            </div>

            {/* Precio */}
            <div className="form-group">
              <label className="form-label">
                Precio Unitario *
              </label>
              <input
                type="number"
                name="precioUnitario"
                value={formData.precioUnitario}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="form-input"
                placeholder="5.50"
              />
            </div>

            {/* Dosificación */}
            <div className="form-group">
              <label className="form-label">
                Dosificación
              </label>
              <input
                type="text"
                name="dosificacion"
                value={formData.dosificacion}
                onChange={handleChange}
                className="form-input"
                placeholder="1 tableta cada 8 horas"
              />
            </div>

            {/* Estado */}
            <div className="form-group">
              <label className="form-label">
                Estado
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="form-input"
              >
                <option value="pendiente">Pendiente</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            {/* Instrucciones */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">
                Instrucciones
              </label>
              <textarea
                name="instrucciones"
                value={formData.instrucciones}
                onChange={handleChange}
                rows={3}
                className="form-input"
                placeholder="Tomar con alimentos, evitar alcohol..."
                style={{ resize: 'none', minHeight: '80px' }}
              />
            </div>

            {/* Mostrar total */}
            {formData.cantidad > 0 && formData.precioUnitario > 0 && (
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ margin: 0, fontSize: '1.3rem' }}>
                    💰 Total: S/ {(formData.cantidad * formData.precioUnitario).toFixed(2)}
                  </h3>
                </div>
              </div>
            )}
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