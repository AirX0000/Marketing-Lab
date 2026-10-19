import React from 'react';
import { RadarSkill } from '../types';

interface CEFRRadarProps {
  skills: RadarSkill[];
  size?: number;
}

export const CEFRRadar: React.FC<CEFRRadarProps> = ({ skills, size = 320 }) => {
  const center = size / 2;
  const radius = (size / 2) - 40;
  const total = skills.length;

  if (total === 0) return null;

  // Compute angle in radians for each skill axis
  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / total) * index - (Math.PI / 2);
    const distance = (value / 100) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  // Generate web rings (25%, 50%, 75%, 100%)
  const levels = [0.25, 0.5, 0.75, 1.0];

  // User polygon path
  const userPoints = skills.map((s, i) => {
    const coords = getCoordinates(i, s.score);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  // Benchmark polygon path
  const benchmarkPoints = skills.map((s, i) => {
    const coords = getCoordinates(i, s.benchmark);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Grid Rings */}
        {levels.map((lvl, idx) => (
          <circle
            key={idx}
            cx={center}
            cy={center}
            r={radius * lvl}
            fill="none"
            stroke="var(--border-subtle)"
            strokeDasharray={lvl === 1.0 ? 'none' : '3 3'}
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {skills.map((_, i) => {
          const outer = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--border-subtle)"
              strokeWidth="1"
            />
          );
        })}

        {/* Benchmark Polygon (Dashed Cyan) */}
        <polygon
          points={benchmarkPoints}
          fill="rgba(30, 144, 255, 0.08)"
          stroke="#1e90ff"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* User Score Polygon (Glowing Crimson) */}
        <polygon
          points={userPoints}
          fill="rgba(255, 71, 87, 0.25)"
          stroke="#ff4757"
          strokeWidth="2.5"
        />

        {/* User Data Points */}
        {skills.map((s, i) => {
          const pt = getCoordinates(i, s.score);
          return (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="4.5"
              fill="#ff4757"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Labels */}
        {skills.map((s, i) => {
          const labelPt = getCoordinates(i, 118);
          return (
            <text
              key={i}
              x={labelPt.x}
              y={labelPt.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="11"
              fontWeight="600"
              fill="var(--text-secondary)"
              fontFamily="var(--font-sans)"
            >
              {s.skill} ({Math.round(s.score)}%)
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '12px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ff4757', fontWeight: 600 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: '#ff4757' }}></span>
          Your Assessment
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1e90ff', fontWeight: 600 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: '#1e90ff', opacity: 0.7 }}></span>
          Global Tech Benchmark (C1)
        </span>
      </div>
    </div>
  );
};
