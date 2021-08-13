import { toast, ToastOptions } from 'react-toastify';

interface ToastProps {
  message: string;
  options?: ToastOptions;
}

export const successToast = ({ message, options }: ToastProps) =>
  toast.success(message, {
    ...options,
    style: {
      background: '#3FB023',
    },
  });

export const warnToast = ({ message, options }: ToastProps) =>
  toast.warn(message, {
    ...options,
    style: {
      background: '#f5ad11',
    },
  });

export const errorToast = ({ message, options }: ToastProps) =>
  toast.error(message, {
    ...options,
    style: {
      background: '#FF4343',
    },
  });
