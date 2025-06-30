'use client';
import { useState } from 'react';
import { DetalleOrden } from '@/types';
import { Save, X, ShoppingCart } from 'lucide-react';

interface Props {
  onSubmit: (data: DetalleOrden) => void;
  onCancel: () => void;
}

export default function OrdenForm({ onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<DetalleOrden>({
    CodOrdenCompra: 0,
    CodMedicamento: 0,
    descripcion: '',
    cantidad: 0,
    precio: 0,
    montoPres: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="form-container">
      <div className="card">
        <div className="card-header">
          <div className="card-icon blue-gradient">
            <ShoppingCart size={40} color="white" />
          </div>
          <h1 className="page-title">
            Nueva Orden de Compra 🛒
          </h1>
          <p className="subtitle">Agrega un nuevo detalle de orden</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Código Orden Compra *
              </label>
              <input
                type="number"
                name="CodOrdenCompra"
                value={formData.CodOrdenCompra}
                onChange={handleChange}
                required
                min="1"
                className="form-input"
                placeholder="1001"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Código Medicamento *
              </label>
              <input
                type="number"
                name="CodMedicamento"
                value={formData.CodMedicamento}
                onChange={handleChange}
                required
                min="1"
                className="form-input"
                placeholder="1"
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
                className="form-input"
                placeholder="Descripción del medicamento..."
                style={{ resize: 'none', minHeight: '80px' }}
              />
            </div>

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
                placeholder="50"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Precio Unitario *
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="form-input"
                placeholder="5.50"
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">
                Monto Presentación
              </label>
              <input
                type="number"
                name="montoPres"
                value={formData.montoPres}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="form-input"
                placeholder="275.00"
              />
            </div>
          </div>

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
              className="btn btn-secondary"
            >
              <Save size={18} />
              <span>Guardar Orden</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}