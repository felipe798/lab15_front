
'use client';
import { useState, useEffect } from 'react';
import { Save, X, Pill } from 'lucide-react';
import { Medicamento, TipoMedicamento } from '../types';
import api from '../lib/api';
import toast from 'react-hot-toast';

interface Props {
  medicamento?: Medicamento;
  onSubmit: (data: Medicamento) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function MedicamentoForm({ medicamento, onSubmit, onCancel, isEditing = false }: Props) {
  const [formData, setFormData] = useState<Medicamento>({
    descripcionMed: medicamento?.descripcionMed || '',
    fechaFabricacion: medicamento?.fechaFabricacion || '',
    fechaVencimiento: medicamento?.fechaVencimiento || '',
    Presentacion: medicamento?.Presentacion || '',
    stock: medicamento?.stock || 0,
    precioVentaUni: medicamento?.precioVentaUni || 0,
    precioVentaPres: medicamento?.precioVentaPres || 0,
    CodTipoMed: medicamento?.CodTipoMed || undefined,
    Marca: medicamento?.Marca || '',
  });

  const [tiposMedicamento, setTiposMedicamento] = useState<TipoMedicamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTiposMedicamento();
  }, []);

  const loadTiposMedicamento = async () => {
    try {
      const response = await api.get('/tipo-medicamentos');
      setTiposMedicamento(response.data);
    } catch (error) {
      toast.error('Error al cargar tipos de medicamento');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

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
        {/* Header del formulario */}
        <div className="card-header">
          <div className="card-icon purple-gradient">
            <Pill size={40} color="white" />
          </div>
          <h1 className="page-title">
            {isEditing ? 'Editar Medicamento 📝' : 'Nuevo Medicamento ✨'}
          </h1>
          <p className="subtitle">
            {isEditing ? 'Actualiza la información del medicamento' : 'Agrega un nuevo medicamento'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Nombre del medicamento */}
            <div className="form-group">
              <label className="form-label">
                Nombre del Medicamento *
              </label>
              <input
                type="text"
                name="descripcionMed"
                value={formData.descripcionMed}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Ej: Paracetamol 500mg"
              />
            </div>

            {/* Tipo de medicamento */}
            <div className="form-group">
              <label className="form-label">
                Tipo de Medicamento
              </label>
              <select
                name="CodTipoMed"
                value={formData.CodTipoMed || ''}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Seleccionar tipo...</option>
                {tiposMedicamento.map((tipo) => (
                  <option key={tipo.CodTipoMed} value={tipo.CodTipoMed}>
                    {tipo.descripcionTipo}
                  </option>
                ))}
              </select>
            </div>

            {/* Marca */}
            <div className="form-group">
              <label className="form-label">
                Marca
              </label>
              <input
                type="text"
                name="Marca"
                value={formData.Marca}
                onChange={handleChange}
                className="form-input"
                placeholder="Ej: Laboratorio ABC"
              />
            </div>

            {/* Presentación */}
            <div className="form-group">
              <label className="form-label">
                Presentación
              </label>
              <input
                type="text"
                name="Presentacion"
                value={formData.Presentacion}
                onChange={handleChange}
                className="form-input"
                placeholder="Ej: Tabletas, Cápsulas"
              />
            </div>

            {/* Stock */}
            <div className="form-group">
              <label className="form-label">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="form-input"
                placeholder="100"
              />
            </div>

            {/* Precio unitario */}
            <div className="form-group">
              <label className="form-label">
                Precio Unitario *
              </label>
              <input
                type="number"
                name="precioVentaUni"
                value={formData.precioVentaUni}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="form-input"
                placeholder="5.50"
              />
            </div>

            {/* Precio presentación */}
            <div className="form-group">
              <label className="form-label">
                Precio Presentación
              </label>
              <input
                type="number"
                name="precioVentaPres"
                value={formData.precioVentaPres}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="form-input"
                placeholder="165.00"
              />
            </div>

            {/* Fecha de fabricación */}
            <div className="form-group">
              <label className="form-label">
                Fecha de Fabricación
              </label>
              <input
                type="date"
                name="fechaFabricacion"
                value={formData.fechaFabricacion}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Fecha de vencimiento */}
            <div className="form-group">
              <label className="form-label">
                Fecha de Vencimiento
              </label>
              <input
                type="date"
                name="fechaVencimiento"
                value={formData.fechaVencimiento}
                onChange={handleChange}
                className="form-input"
              />
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