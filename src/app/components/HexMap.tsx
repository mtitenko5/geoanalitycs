import { useState } from 'react';
import { motion } from 'motion/react';

interface HexMapProps {
  category: string;
  hexSize: number;
  onHexSelect: (hex: any) => void;
}

interface HexData {
  id: string;
  x: number;
  y: number;
  activeInterest: number;
  atv: number;
  loyalty: number;
  marketShare: number;
}

// Generate hex grid data
const generateHexGrid = (): HexData[] => {
  const hexes: HexData[] = [];
  const cols = 24;
  const rows = 18;
  const hexWidth = 40;
  const hexHeight = 35;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexWidth + (row % 2 ? hexWidth / 2 : 0);
      const y = row * hexHeight * 0.75;

      hexes.push({
        id: `hex-${row}-${col}`,
        x,
        y,
        activeInterest: Math.floor(Math.random() * 100),
        atv: +(1 + Math.random() * 0.8).toFixed(2),
        loyalty: +(2 + Math.random() * 3).toFixed(1),
        marketShare: Math.floor(Math.random() * 40 + 10),
      });
    }
  }

  return hexes;
};

// Hexagon path
const getHexPath = (size: number = 30) => {
  const angle = Math.PI / 3;
  const points = [];
  for (let i = 0; i < 6; i++) {
    const x = size * Math.cos(angle * i);
    const y = size * Math.sin(angle * i);
    points.push(`${x},${y}`);
  }
  return `M ${points.join(' L ')} Z`;
};

const getHexColor = (activeInterest: number): string => {
  if (activeInterest > 80) return '#10b981'; // emerald-500
  if (activeInterest > 50) return '#0079C1'; // vtb blue
  if (activeInterest > 20) return '#f59e0b'; // amber-500
  return '#cbd5e1'; // slate-300
};

export default function HexMap({ category, hexSize, onHexSelect }: HexMapProps) {
  const [hexes] = useState(() => generateHexGrid());
  const [hoveredHex, setHoveredHex] = useState<string | null>(null);

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 h-[700px] overflow-hidden">
      {/* Map background with city grid */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0079C1" strokeWidth="0.5" />
            </pattern>
            <pattern id="dotGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="#0079C1" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>

      {/* Decorative city landmarks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-12 w-3 h-3 rounded-full bg-[#0079C1]/20 animate-pulse" />
        <div className="absolute top-24 right-32 w-2 h-2 rounded-full bg-emerald-500/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-24 w-2.5 h-2.5 rounded-full bg-violet-500/20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 right-16 w-3 h-3 rounded-full bg-amber-500/20 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Hex Grid - scrollable container */}
      <div className="absolute inset-0 overflow-auto p-8 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div className="min-w-max flex items-center justify-center">
          <svg
            width="1000"
            height="650"
            viewBox="0 0 1000 650"
            className="drop-shadow-sm"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {hexes.map((hex, index) => {
              const isHovered = hoveredHex === hex.id;
              const color = getHexColor(hex.activeInterest);

              return (
                <motion.g
                  key={hex.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.001,
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                  }}
                  transform={`translate(${hex.x + 20}, ${hex.y + 20})`}
                >
                  <motion.path
                    d={getHexPath(18)}
                    fill={color}
                    fillOpacity={isHovered ? 0.95 : 0.75}
                    stroke={isHovered ? '#0079C1' : 'white'}
                    strokeWidth={isHovered ? 2 : 1}
                    className="cursor-pointer transition-all duration-150"
                    filter={isHovered ? 'url(#glow)' : undefined}
                    onMouseEnter={() => setHoveredHex(hex.id)}
                    onMouseLeave={() => setHoveredHex(null)}
                    onClick={() => onHexSelect(hex)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  />

                  {/* Show value on hover */}
                  {isHovered && (
                    <motion.text
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      x="0"
                      y="3"
                      textAnchor="middle"
                      className="text-[10px] font-medium pointer-events-none"
                      fill="#1e293b"
                      style={{ fontWeight: 600 }}
                    >
                      {hex.activeInterest}%
                    </motion.text>
                  )}
                </motion.g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Floating info */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl text-xs text-slate-600">
          <span className="font-medium text-slate-900">{hexes.length}</span> гексов на карте
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl text-xs text-slate-600">
            Размер зоны: <span className="font-medium text-slate-900">{hexSize} м</span>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl text-xs text-slate-500">
            💡 Наведите на гекс для деталей
          </div>
        </div>
      </div>
    </div>
  );
}
