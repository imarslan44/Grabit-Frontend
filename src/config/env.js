const RAW_BACKEND = import.meta.env.VITE_BACKEND_URL;
export const SHIPPING_FEE = import.meta.env.VITE_SHIPPING_FEE;

export const BACKEND_URL = RAW_BACKEND 
  ? RAW_BACKEND.replace(/\/$/, '') 
  : 'http://localhost:5000';




