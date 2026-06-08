import * as React from "react";
import { createMap } from "svg-dotted-map";
import { cn } from "@/lib/utils/cn";

export interface Marker {
  lat: number;
  lng: number;
  size?: number;
}

type WithXY<T> = T & {
  x: number;
  y: number;
};

export type MarkerOverlayProps<T extends Marker = Marker> = {
  marker: WithXY<T>;
  x: number;
  y: number;
  r: number;
  index: number;
};

export interface DottedMapProps<T extends Marker = Marker> extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  mapSamples?: number;
  markers?: T[];
  dotColor?: string;
  markerColor?: string;
  dotRadius?: number;
  stagger?: boolean;
  renderMarkerOverlay?: (props: MarkerOverlayProps<T>) => React.ReactNode;
}

export function DottedMap<T extends Marker = Marker>({
  width = 150,
  height = 75,
  mapSamples = 5000,
  markers = [],
  // markerColor = "#FF6900",
  dotRadius = 0.2,
  stagger = true,
  className,
  style,
  renderMarkerOverlay,
}: DottedMapProps<T>) {
  const { points, addMarkers } = createMap({
    width,
    height,
    mapSamples,
  });

  const processedMarkers = React.useMemo(() => addMarkers(markers), [addMarkers, markers]);

  const memo = React.useMemo(() => {
    const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x);

    let step = Infinity;
    const rowMap = new Map<number, number>();

    for (let i = 0; i < sorted.length; i++) {
      const p = sorted[i];

      if (!rowMap.has(p.y)) {
        rowMap.set(p.y, rowMap.size);
      }

      if (i > 0) {
        const prev = sorted[i - 1];
        if (prev.y === p.y) {
          const delta = p.x - prev.x;
          if (delta > 0 && delta < step) {
            step = delta;
          }
        }
      }
    }

    return {
      xStep: step === Infinity ? 1 : step,
      yToRowIndex: rowMap,
    };
  }, [points]);

  const { xStep, yToRowIndex } = memo;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("text-gray-500 dark:text-gray-500", className)}
      style={{ width: "100%", height: "100%", ...style }}
    >
      {points.map((point, index) => {
        const rowIndex = yToRowIndex.get(point.y) ?? 0;
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0;

        return (
          <circle
            cx={point.x + offsetX}
            cy={point.y}
            r={dotRadius}
            fill="currentColor"
            key={`${point.x}-${point.y}-${index}`}
          />
        );
      })}

      {processedMarkers.map((marker, index) => {
        const rowIndex = yToRowIndex.get(marker.y) ?? 0;
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0;

        const x = marker.x + offsetX;
        const y = marker.y;
        const r = marker.size ?? dotRadius;

        const typedMarker = marker as unknown as WithXY<T>;

        return (
          <g key={`${marker.x}-${marker.y}-${index}`}>
            <circle cx={x} cy={y} r={r} />

            {renderMarkerOverlay &&
              renderMarkerOverlay({
                marker: typedMarker,
                x,
                y,
                r,
                index,
              })}
          </g>
        );
      })}
    </svg>
  );
}
