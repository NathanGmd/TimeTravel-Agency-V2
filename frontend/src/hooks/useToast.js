import { createContext, useContext, useState, useCallback } from 'react';

export const ToastContext = createContext(null);

export function useToast() {
  const [toast, setToast] = useState({ message: '', visible: false, type: 'info' });

  const show = useCallback((message, type = 'info') => {
    setToast({ message, visible: true, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3500);
  }, []);

  return { toast, show };
}

export function useToastContext() {
  return useContext(ToastContext);
}
