import styles from '@/styles/button.module.scss';
import { cn } from '@/utils/classnames';
import React from 'react';

export default function Loading({
  spinnerColor = 'primary',
  size = 24,
  className,
}: {
  spinnerColor?: 'primary' | 'grey';
  size?: number;
  className?: string;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      // className={`${styles.spinner}`}
      className={cn(styles.spinner, className)}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`spinner-${i}`}
          className={`${styles.spinnerDot} ${
            spinnerColor === 'primary'
              ? styles.spinnerPrimary
              : styles.spinnerGrey
          }`}
        />
      ))}
    </div>
  );
}
