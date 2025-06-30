'use client';
import { useRouter } from 'next/navigation';
// Cambiar:
// import MedicamentoForm from '@/components/MedicamentoForm';
// import { Medicamento } from '@/types';
// import api from '@/lib/api';

// Por:
import MedicamentoForm from '../../../components/MedicamentoForm';
import { Medicamento } from '../../../types';
import api from '../../../lib/api';
import toast from 'react-hot-toast';

export default function NuevoMedicamento() {
  const router = useRouter();

  const handleSubmit = async (data: Medicamento) => {
    try {
      // Validación básica
      if (!data.descripcionMed.trim()) {
        toast.error('El nombre del medicamento es requerido 📝');
        return;
      }

      if (data.stock < 0) {
        toast.error('El stock no puede ser negativo 📦');
        return;
      }

      if (data.precioVentaUni <= 0) {
        toast.error('El precio debe ser mayor a 0 💰');
        return;
      }

      // Preparar datos para envío
      const medicamentoData = {
        ...data,
        // Convertir strings vacíos a null para campos opcionales
        CodTipoMed: data.CodTipoMed || null,
        Marca: data.Marca?.trim() || null,
        Presentacion: data.Presentacion?.trim() || null,
        fechaFabricacion: data.fechaFabricacion || null,
        fechaVencimiento: data.fechaVencimiento || null,
        precioVentaPres: data.precioVentaPres || null,
      };

      console.log('Enviando datos:', medicamentoData);

      const response = await api.post('/medicamentos', medicamentoData);
      
      console.log('Respuesta del servidor:', response.data);

      toast.success('¡Medicamento creado con éxito! 🎉', {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
          color: 'white',
        },
      });

      // Redirigir a la lista
      router.push('/medicamentos');
      
    } catch (error: any) {
      console.error('Error al crear medicamento:', error);
      
      // Manejo de errores específicos
      if (error.response?.status === 400) {
        toast.error('Datos inválidos. Revisa los campos 🔍');
      } else if (error.response?.status === 500) {
        toast.error('Error del servidor. Intenta más tarde 🛠️');
      } else if (error.request) {
        toast.error('No se pudo conectar al servidor 🌐');
      } else {
        toast.error('Error inesperado. Intenta nuevamente 😢');
      }
    }
  };

  const handleCancel = () => {
    // Confirmar si hay cambios sin guardar
    const confirmLeave = window.confirm(
      '¿Estás seguro de cancelar? Se perderán los cambios no guardados. 🤔'
    );
    
    if (confirmLeave) {
      router.push('/medicamentos');
    }
  };

  return (
    <div>
      <MedicamentoForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={false}
      />
      
      {/* Información adicional */}
      <div className="card" style={{ 
        marginTop: '2rem', 
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white'
      }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          💡 Consejos para agregar medicamentos
        </h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>✅</span>
            <span>Asegúrate de seleccionar el tipo de medicamento correcto</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>✅</span>
            <span>Verifica las fechas de fabricación y vencimiento</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>✅</span>
            <span>El stock inicial debe reflejar la cantidad real disponible</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>✅</span>
            <span>Los precios deben incluir todos los costos</span>
          </div>
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
            📦 Ver Tipos de Medicamento
          </button>
          <button 
            onClick={() => router.push('/medicamentos')}
            className="btn btn-outline"
          >
            📋 Ver Lista de Medicamentos
          </button>
        </div>
      </div>
    </div>
  );
}