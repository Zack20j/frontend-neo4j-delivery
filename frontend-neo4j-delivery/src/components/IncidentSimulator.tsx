// src/components/IncidentSimulator.tsx
import React, { useEffect, useState } from 'react';
import { AlertTriangleIcon } from 'lucide-react';
import { Incident } from '../models/ConnectionModel';
import { getConnections } from '../services/getConnections';


export default function IncidentSimulator() {
  const [connections, setConnections] = useState<Incident[]>([])
  const [incident, setIncident] = useState<Incident | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    ( async () => {
      try {
        const data = await getConnections()
        setConnections(data);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    })()
  }, [])

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
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white text-sm font-semibold">
        <AlertTriangleIcon size={18} />
        <span>Simular Incidente</span>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-white text-xs font-medium">Conexión:</label>
        <select
          className="p-2 rounded bg-white text-sm text-black focus:outline-none"
          onChange={(e) => {
            const [from, to] = e.target.value.split('|');
            setIncident({ from, to, status: 'abierta' });
            setStatusMessage(null);
          }}
        >
          <option value="">Selecciona una conexión</option>
          {connections.map((conn, idx) => (
            <option key={idx} value={`${conn.from}|${conn.to}`}>
              {conn.from} → {conn.to}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleClose}
            className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm font-semibold transition-colors"
          >
            Cerrar
          </button>

          <button
            onClick={handleOpen}
            className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm font-semibold transition-colors"
          >
            Reabrir
          </button>
        </div>
      </div>

      {incident && (
        <div className="bg-white/20 text-white text-sm p-3 rounded border border-white/30 mt-4 animate-fade-in">
          <p>
            <strong>Conexión:</strong> {incident.from} → {incident.to}
          </p>
          <p>
            <strong>Estado:</strong> {incident.status}
          </p>
          {statusMessage && <p className="mt-2 text-sm italic">{statusMessage}</p>}
        </div>
      )}
    </div>
  );
}
