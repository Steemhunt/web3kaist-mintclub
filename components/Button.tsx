'use client';

import { cn } from '@/utils/classnames';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-bold',
        props.className,
        props.disabled && 'cursor-not-allowed bg-gray-800',
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
