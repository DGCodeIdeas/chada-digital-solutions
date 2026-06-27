import { Toaster as Sonner } from 'sonner';

export default function Toaster() {
  return (
    <Sonner
      position="top-center"
      toastOptions={{
        style: {
          background: '#10241c',
          color: '#bbf7d0',
          border: '1px solid #14532d',
          borderRadius: '0.75rem',
          fontSize: '0.85rem',
          fontWeight: '500',
        },
        className: 'sonner-toast',
      }}
      theme="dark"
    />
  );
}
