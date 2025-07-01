// src/components/RouteForm.tsx
import React, { useState } from 'react';

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
    // Simulamos una llamada API
    setTimeout(() => {
      setResult(mockRouteResult);
    }, 500);
  };

  return (
    <div className="bg-white p-4 shadow rounded mb-6">
      <h2 className="text-lg font-semibold mb-2">Buscar Ruta Más Rápida</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          {mockZones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      {result && (
        <div className="bg-green-100 p-4 rounded">
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
