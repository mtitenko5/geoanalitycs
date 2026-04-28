import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in webpack/vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface HexMapProps {
  category: string;
  hexSize: number;
  onHexSelect: (hex: any) => void;
}

interface HexData {
  id: string;
  center: [number, number];
  positions: [number, number][];
  activeInterest: number;
  atv: number;
  loyalty: number;
  marketShare: number;
}

// Moscow bounds
const MOSCOW_BOUNDS = {
  north: 55.95,
  south: 55.45,
  east: 37.95,
  west: 37.35,
};

// Generate hex grid over Moscow
const generateHexGrid = (hexSizeKm: number = 0.9): HexData[] => {
  const hexes: HexData[] = [];
  
  // Convert hex size to degrees (approximate)
  const hexLatStep = (hexSizeKm / 111) * 1.5; // ~111km per degree latitude
  const hexLngStep = (hexSizeKm / (111 * Math.cos(55.75 * Math.PI / 180))) * 1.5;
  
  let rowIndex = 0;
  for (let lat = MOSCOW_BOUNDS.south; lat <= MOSCOW_BOUNDS.north; lat += hexLatStep) {
    const isOddRow = rowIndex % 2 === 1;
    const lngStart = isOddRow ? MOSCOW_BOUNDS.west + hexLngStep / 2 : MOSCOW_BOUNDS.west;
    
    let colIndex = 0;
    for (let lng = lngStart; lng <= MOSCOW_BOUNDS.east; lng += hexLngStep) {
      // Create hexagon coordinates
      const positions: [number, number][] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 * Math.PI) / 180;
        const dLat = hexLatStep * 0.5 * Math.sin(angle);
        const dLng = hexLngStep * 0.5 * Math.cos(angle);
        positions.push([lat + dLat, lng + dLng] as [number, number]);
      }
      
      hexes.push({
        id: `hex-${rowIndex}-${colIndex}`,
        center: [lat, lng],
        positions,
        activeInterest: Math.floor(Math.random() * 100),
        atv: +(1 + Math.random() * 0.8).toFixed(2),
        loyalty: +(2 + Math.random() * 3).toFixed(1),
        marketShare: Math.floor(Math.random() * 40 + 10),
      });
      
      colIndex++;
    }
    rowIndex++;
  }
  
  return hexes;
};

const getHexColor = (activeInterest: number): string => {
  if (activeInterest > 80) return '#10b981'; // emerald-500
  if (activeInterest > 50) return '#0079C1'; // vtb blue
  if (activeInterest > 20) return '#f59e0b'; // amber-500
  return '#cbd5e1'; // slate-300
};

export default function HexMap({ category, hexSize, onHexSelect }: HexMapProps) {
  const [hexes] = useState(() => generateHexGrid(hexSize / 1000));
  const [hoveredHex, setHoveredHex] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 h-[700px] flex items-center justify-center">
        <div className="text-slate-500">Загрузка карты...</div>
      </div>
    );
  }

  return (
    <div className="relative h-[700px]">
      {/* Map with hex overlay */}
      <MapContainer
        center={[55.75, 37.61]} // Moscow center
        zoom={10}
        minZoom={9}
        maxZoom={14}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {hexes.map((hex) => {
          const isHovered = hoveredHex === hex.id;
          const color = getHexColor(hex.activeInterest);
          
          return (
            <Polygon
              key={hex.id}
              positions={hex.positions}
              pathOptions={{
                fillColor: color,
                fillOpacity: isHovered ? 0.8 : 0.6,
                color: isHovered ? '#0079C1' : 'white',
                weight: isHovered ? 3 : 1,
              }}
              eventHandlers={{
                mouseover: () => setHoveredHex(hex.id),
                mouseout: () => setHoveredHex(null),
                click: () => onHexSelect(hex),
              }}
            >
              <Popup>
                <div className="p-2">
                  <div className="font-semibold mb-2">Гекс {hex.id}</div>
                  <div className="space-y-1 text-sm">
                    <div>Активность: <strong>{hex.activeInterest}%</strong></div>
                    <div>ATV: <strong>{hex.atv}</strong></div>
                    <div>Лояльность: <strong>{hex.loyalty}</strong></div>
                    <div>Доля рынка: <strong>{hex.marketShare}%</strong></div>
                  </div>
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>

      {/* Floating info */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-[1000]">
        <div className="px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl text-xs text-slate-600">
          <span className="font-medium text-slate-900">{hexes.length}</span> гексов на карте
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl text-xs text-slate-600">
            Размер зоны: <span className="font-medium text-slate-900">{hexSize} м</span>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl text-xs text-slate-500">
            💡 Кликните на гекс для деталей
          </div>
        </div>
      </div>
    </div>
  );
}
