'use client';
import dynamic from 'next/dynamic';

const Toaster = dynamic(
  () => import('react-hot-toast').then((c) => c.Toaster),
  {
    ssr: false,
  },
);

export default function ClientToaster() {
  return (
    <Toaster
      containerStyle={{
        zIndex: 9999999999999,
      }}
      toastOptions={{
        style: {
          background: '#000',
          color: '#fff',
          border: `1px solid gray`,
          borderRadius: 0,
          fontSize: 14,
        },
      }}
    />
  );
}
