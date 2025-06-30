import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://lab15-xl5y.onrender.com/api',
});

export default api;