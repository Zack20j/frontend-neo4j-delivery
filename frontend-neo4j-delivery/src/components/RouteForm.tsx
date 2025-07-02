// src/components/RouteForm.tsx
import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';

interface RouteResult {
  path: string[];
  total_time: number;
}

const mockZones = [
  { id: 'CD1', name: 'Centro Norte' },
  { id: 'Z1', name: 'Altamira' },
  { id: 'Z2', name: 'Chacao' },
  { id: 'Z3', name: 'La Urbina' },
];

const mockRouteResult: RouteResult = {
  path: ['Centro Norte', 'Altamira', 'Chacao'],
  total_time: 9,
};

export default function RouteForm() {
  const [from, setFrom] = useState('CD1');
  const [to, setTo] = useState('Z2');
  const [result, setResult] = useState<RouteResult | null>(null);

  const handleSearch = () => {
    setTimeout(() => {
      setResult(mockRouteResult);
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white text-sm font-semibold">
        <SearchIcon size={18} />
        <span>Buscar Ruta Más Rápida</span>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-white text-xs  font-medium">Origen:</label>
        <select
          className="p-2 rounded bg-white text-sm text-black focus:outline-none"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          {mockZones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.name}
            </option>
          ))}
        </select>

        <label className="text-white text-xs font-medium mt-2">Destino:</label>
        <select
          className="p-2 rounded bg-white text-sm text-black focus:outline-none"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          {mockZones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="mt-4 w-full bg-[#0D3B3E] hover:bg-[#0b2f32] text-white py-2 px-4 rounded text-sm font-semibold transition-colors"
        >
          Calcular Ruta
        </button>
      </div>

      {result && (
        <div className="bg-white/20 text-white text-sm p-3 rounded border border-white/30 mt-4 animate-fade-in">
          <p>
            <strong>Ruta:</strong> {result.path.join(' → ')}
          </p>
          <p>
            <strong>Tiempo total:</strong> {result.total_time} minutos
          </p>
        </div>
      )}
    </div>
  );
}
