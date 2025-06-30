import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://lab15-back.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para logging en desarrollo
if (process.env.NODE_ENV === 'development') {
  api.interceptors.request.use((config) => {
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log('✅ API Response:', response.status, response.config.url);
      return response;
    },
    (error) => {
      console.error('❌ API Error:', error.response?.status, error.config?.url);
      console.error('Error details:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );
}

// Interceptor para manejo de errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores comunes
    if (error.response) {
      // El servidor respondió con un código de error
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || 'Error del servidor';
      
      switch (status) {
        case 400:
          console.error('🔍 Error 400 - Solicitud incorrecta:', message);
          break;
        case 401:
          console.error('🔐 Error 401 - No autorizado:', message);
          break;
        case 404:
          console.error('🔍 Error 404 - No encontrado:', message);
          break;
        case 409:
          console.error('⚠️ Error 409 - Conflicto:', message);
          break;
        case 500:
          console.error('🛠️ Error 500 - Error del servidor:', message);
          break;
        default:
          console.error(`❌ Error ${status}:`, message);
      }
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      console.error('🌐 Error de red - No se pudo conectar al servidor');
    } else {
      // Algo más causó el error
      console.error('⚡ Error inesperado:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;