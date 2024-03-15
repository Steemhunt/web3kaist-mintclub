import { bebas } from '@/styles/fonts';
import { cn } from '@/utils/classnames';
import React from 'react';

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn('mt-1 text-3xl text-primary', className)}
      style={bebas.style}
    >
      Far<span className="text-white">k</span>aster
    </div>
  );
}
