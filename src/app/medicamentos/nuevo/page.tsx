'use client';
import { useRouter } from 'next/navigation';
import MedicamentoForm from '@/components/MedicamentoForm';
import { Medicamento } from '@/types';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function NuevoMedicamento() {
  const router = useRouter();

  const handleSubmit = async (data: Medicamento) => {
    try {
      await api.post('/medicamentos', data);
      toast.success('¡Medicamento creado con éxito! 🎉');
      router.push('/medicamentos');
    } catch (error) {
      toast.error('Error al crear medicamento 😢' + error);
    }
  };

  const handleCancel = () => {
    router.push('/medicamentos');
  };

  return (
    <MedicamentoForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}