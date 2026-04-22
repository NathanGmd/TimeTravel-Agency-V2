import { useContext } from 'react';
import { ToastContext } from '../../hooks/useToast.js';
import styles from './Toast.module.css';

export default function Toast() {
  const { toast } = useContext(ToastContext);
  return (
    <div className={`${styles.toast} ${toast.visible ? styles.visible : ''} ${styles[toast.type]}`}>
      {toast.message}
    </div>
  );
}
