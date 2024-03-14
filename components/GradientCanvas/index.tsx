'use client';

import Canvas from '@/components/GradientCanvas/Canvas';
import { isThreeJsSupported } from '@/components/GradientCanvas/three';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

export default function MemoizedBG() {
  return useMemo(() => {
    return <GradientBG />;
  }, []);
}

export function GradientBG() {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    async function checkPerformance() {
      const { supported, framerate } = await isThreeJsSupported();
      console.log('ThreeJS supported:', supported, 'framerate:', framerate);
      setSupported(supported);
    }

    // check after 100ms of mount
    const timeout = setTimeout(() => {
      checkPerformance();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!supported)
    return (
      <div className="bg-bg pointer-events-none fixed bottom-0 left-0 z-[2] h-[100lvh] w-screen" />
    );

  return (
    <>
      <motion.div
        className="z-1 pointer-events-none fixed bottom-0 left-0 h-[100lvh] w-screen opacity-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <Canvas />
      </motion.div>
      <div className="pointer-events-none fixed bottom-0 left-0 z-[2] h-[100lvh] w-screen bg-black bg-opacity-80" />
    </>
  );
}
