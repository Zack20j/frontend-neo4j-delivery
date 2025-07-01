// src/components/IncidentSimulator.tsx
import React, { useState } from 'react';

interface Incident {
  from: string;
  to: string;
  status: 'abierta' | 'cerrada';
}

const mockConnections = [
  { from: 'CD1', to: 'Z1' },
  { from: 'Z1', to: 'Z2' },
  { from: 'Z2', to: 'Z3' },
  { from: 'Z3', to: 'CD1' },
];

export default function IncidentSimulator() {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleClose = () => {
    setIncident((prev) =>
      prev ? { ...prev, status: 'cerrada' } : null
    );
    setStatusMessage('Conexión cerrada temporalmente.');
  };

  const handleOpen = () => {
    setIncident((prev) =>
      prev ? { ...prev, status: 'abierta' } : null
    );
    setStatusMessage('Conexión reabierta.');
  };

  return (
    <div className="bg-white p-4 shadow rounded mb-6">
      <h2 className="text-lg font-semibold mb-2">Simular Incidente</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          className="border p-2 rounded"
          onChange={(e) => {
            const [from, to] = e.target.value.split('|');
            setIncident({ from, to, status: 'abierta' });
            setStatusMessage(null);
          }}
        >
          <option value="">Selecciona una conexión</option>
          {mockConnections.map((conn, idx) => (
            <option key={idx} value={`${conn.from}|${conn.to}`}>
              {conn.from} → {conn.to}
            </option>
          ))}
        </select>

        <button
          onClick={handleClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar Conexión
        </button>

        <button
          onClick={handleOpen}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Reabrir Conexión
        </button>
      </div>

      {incident && (
        <div className="bg-yellow-100 p-4 rounded">
          <p>
            <strong>Conexión:</strong> {incident.from} → {incident.to}
          </p>
          <p>
            <strong>Estado:</strong> {incident.status}
          </p>
          {statusMessage && <p className="mt-2 text-sm">{statusMessage}</p>}
        </div>
      )}
    </div>
  );
}
