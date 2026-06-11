'use client';

import React, { memo, useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export type GlobeMarker = {
  id: string;
  label: string;
  location: [number, number];
  size?: number;
};

type GlobeProps = {
  className?: string;
  markers?: GlobeMarker[];
};

function Globe({
  className,
  markers = [],
}: GlobeProps) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    let frame = 0;

    let phi = 1.25;
    let currentPhi = 1.25;

    let pointerDown = false;
    let lastX = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(
        window.devicePixelRatio,
        1.25,
      ),

      width: 700,
      height: 700,

      phi: currentPhi,
      theta: 0.25,

      dark: 1,
      diffuse: 1.5,

      mapSamples: 8000,
      mapBrightness: 4,

      baseColor: [0.08, 0.08, 0.08],

      // almost invisible markers
      markerColor: [0.05, 0.05, 0.05],

      glowColor: [0.25, 0.25, 0.25],

      markers: markers.map((marker) => ({
        id: marker.id,
        location: marker.location,
        size: 0.008,
      })),
    });

    const onPointerDown = (
      e: PointerEvent,
    ) => {
      pointerDown = true;
      lastX = e.clientX;

      canvas.style.cursor =
        'grabbing';
    };

    const onPointerMove = (
      e: PointerEvent,
    ) => {
      if (!pointerDown) return;

      const delta =
        e.clientX - lastX;

      phi -= delta * 0.004;

      lastX = e.clientX;
    };

    const onPointerUp = () => {
      pointerDown = false;

      canvas.style.cursor =
        'grab';
    };

    canvas.style.cursor = 'grab';

    canvas.addEventListener(
      'pointerdown',
      onPointerDown,
    );

    canvas.addEventListener(
      'pointermove',
      onPointerMove,
    );

    canvas.addEventListener(
      'pointerup',
      onPointerUp,
    );

    canvas.addEventListener(
      'pointerleave',
      onPointerUp,
    );

    const animate = () => {
      if (!pointerDown) {
        phi += 0.001;
      }

      currentPhi +=
        (phi - currentPhi) * 0.08;

      globe.update({
        phi: currentPhi,
      });

      frame =
        requestAnimationFrame(
          animate,
        );
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);

      canvas.removeEventListener(
        'pointerdown',
        onPointerDown,
      );

      canvas.removeEventListener(
        'pointermove',
        onPointerMove,
      );

      canvas.removeEventListener(
        'pointerup',
        onPointerUp,
      );

      canvas.removeEventListener(
        'pointerleave',
        onPointerUp,
      );

      globe.destroy();
    };
  }, [markers]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={700}
        height={700}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          touchAction: 'pan-y',
          userSelect: 'none',
        }}
      />

      {markers.map((marker) => (
        <div
          key={marker.id}
          className="cobe-label"
          style={
            {
              positionAnchor: `--cobe-${marker.id}`,
              opacity: `var(--cobe-visible-${marker.id}, 0)`,
            } as React.CSSProperties
          }
        >
          {marker.label}
        </div>
      ))}
    </>
  );
}

export default memo(Globe);