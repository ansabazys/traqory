"use client";

import { motion } from "motion/react";
import { MoveUpRight, MoveDownRight } from "lucide-react";

interface SparklineData {
  value: number;
}

interface AnalyticsKpiCardProps {
  title: string;
  value: string;
  change: number; // positive or negative percentage
  data: SparklineData[];
  index: number;
  titleClassName?: string;
}

export function AnalyticsKpiCard({
  title,
  value,
  change,
  data,
  index,
  titleClassName,
}: AnalyticsKpiCardProps) {
  const isPositive = change >= 0;
  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // Calculate a very basic SVG path for the sparkline
  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value));
  const range = maxVal - minVal || 1;
  const width = 60;
  const height = 24;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d.value - minVal) / range) * height;
      return `${x},${y}`;
    })
    .join(" L ");

  const pathData = `M ${points}`;

  // Choose color based on trend if we want, or stick to neutral positive/negative
  const strokeColor = isPositive ? "#22c55e" : "#ef4444";

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, borderColor: "#2a2a2a" }}
      transition={{ duration: 0.2 }}
      className="group relative flex min-h-28 flex-col justify-between border border-[#1a1a1a] bg-[#0a0a0a] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-[10px] font-mono tracking-widest text-[#888888]`}>{title}</h3>
        <svg
          width={width}
          height={height}
          className="opacity-70 group-hover:opacity-100 transition-opacity"
        >
          <motion.path
            d={pathData}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 + index * 0.1, ease: "easeOut" }}
          />
        </svg>
      </div>

      <div className="flex items-end justify-between">
        <p
          className={`text-3xl font-semibold tracking-tight text-white ${titleClassName ?? "uppercase"}`}
        >
          {value}
        </p>
        <div
          className={`flex items-center gap-1 text-xs font-mono ${isPositive ? "text-[#22c55e]" : "text-[#ef4444]"}`}
        >
          {isPositive ? <MoveUpRight className="h-3 w-3" /> : <MoveDownRight className="h-3 w-3" />}
          {Math.abs(change)}%
        </div>
      </div>
    </motion.div>
  );
}
