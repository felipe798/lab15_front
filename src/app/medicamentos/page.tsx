'use client';
import { useState, useEffect } from 'react';
import { Medicamento } from '@/types';
import MedicamentoCard from '@/components/MedicamentoCard';
import Link from 'next/link';
import { Plus, Search, Pill } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMedicamentos();
  }, []);

  const loadMedicamentos = async () => {
    try {
      const response = await api.get('/medicamentos');
      setMedicamentos(response.data);
    } catch (error) {
      toast.error('Error al cargar medicamentos 😭' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/medicamentos/${id}`);
      toast.success('Medicamento eliminado 🗑️');
      loadMedicamentos();
    } catch (error) {
      toast.error('Error al eliminar medicamento 😢' + error);
    }
  };

  const filteredMedicamentos = medicamentos.filter(med =>
    med.descripcionMed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.Marca?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Header */}
      <div className="card-header">
        <div className="card-icon purple-gradient">
          <Pill size={50} color="white" />
        </div>
        <h1 className="page-title">
          Medicamentos 💊
        </h1>
        <p className="subtitle">Gestiona tu inventario de medicina</p>
      </div>

      {/* Barra de búsqueda y botón nuevo */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar medicamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <Link href="/medicamentos/nuevo" className="btn btn-primary">
          <Plus size={18} />
          <span>Nuevo Medicamento</span>
        </Link>
      </div>

      {/* Lista de medicamentos */}
      {filteredMedicamentos.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Pill size={64} color="#ccc" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#666', marginBottom: '1rem' }}>
            {searchTerm ? 'No se encontraron medicamentos' : 'No hay medicamentos'}
          </h3>
          <p style={{ color: '#999' }}>
            {searchTerm ? 'Intenta con otro término de búsqueda' : 'Agrega tu primer medicamento'}
          </p>
        </div>
      ) : (
        <div className="grid grid-3">
          {filteredMedicamentos.map((medicamento) => (
            <MedicamentoCard
              key={medicamento.CodMedicamento}
              medicamento={medicamento}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Estadísticas */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ 
          textAlign: 'center', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          marginBottom: '2rem'
        }}>
          Estadísticas 📊
        </h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#667eea' }}>
              {medicamentos.length}
            </div>
            <div className="stat-label">Total Medicamentos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#43e97b' }}>
              {medicamentos.filter(m => Number(m.stock) > 20).length}
            </div>
            <div className="stat-label">En Stock</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#fa709a' }}>
              {medicamentos.filter(m => Number(m.stock) <= 5).length}
            </div>
            <div className="stat-label">Stock Bajo</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#4facfe' }}>
              S/ {medicamentos.reduce((sum, m) => {
                const precio = Number(m.precioVentaUni) || 0;
                const stock = Number(m.stock) || 0;
                return sum + (precio * stock);
              }, 0).toFixed(2)}
            </div>
            <div className="stat-label">Valor Inventario</div>
          </div>
        </div>
      </div>
    </div>
  );
}