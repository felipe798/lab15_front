'use client';
import { useRouter } from 'next/navigation';
import OrdenForm from '@/components/OrdenForm';
import { DetalleOrden } from '@/types';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function NuevaOrden() {
  const router = useRouter();

  const handleSubmit = async (data: DetalleOrden) => {
    try {
      await api.post('/detalle-orden-compra', data);
      toast.success('¡Orden creada con éxito! 🎉');
      router.push('/ordenes');
    } catch (error) {
      toast.error('Error al crear orden 😢' + error);
    }
  };

  const handleCancel = () => {
    router.push('/ordenes');
  };

  return (
    <OrdenForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}