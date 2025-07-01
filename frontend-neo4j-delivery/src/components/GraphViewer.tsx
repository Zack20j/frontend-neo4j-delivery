import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

interface Node {
  id: string;
  name: string;
  label: 'Zona' | 'CentroDistribucion';
}

interface Link {
  source: string;
  target: string;
  tiempo_minutos: number;
  trafico_actual?: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

const mockGraphData: GraphData = {
  nodes: [
    { id: 'Z1', name: 'Altamira', label: 'Zona' },
    { id: 'Z2', name: 'Chacao', label: 'Zona' },
    { id: 'Z3', name: 'La Urbina', label: 'Zona' },
    { id: 'CD1', name: 'Centro Norte', label: 'CentroDistribucion' },
  ],
  links: [
    { source: 'CD1', target: 'Z1', tiempo_minutos: 5, trafico_actual: 'bajo' },
    { source: 'Z1', target: 'Z2', tiempo_minutos: 4, trafico_actual: 'medio' },
    { source: 'Z2', target: 'Z3', tiempo_minutos: 7, trafico_actual: 'alto' },
    { source: 'Z3', target: 'CD1', tiempo_minutos: 6, trafico_actual: 'medio' },
  ],
};

export default function GraphViewer() {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMockData = async () => {
      setLoading(true);
      try {
        await new Promise((res) => setTimeout(res, 500)); // simula latencia
        setGraphData(mockGraphData);
      } catch (err) {
        setError('Error al cargar el grafo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMockData();
  }, []);

  if (loading) return <p className="text-center">Cargando grafo...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="border rounded-md w-full h-[600px]">
      <ForceGraph2D
        graphData={graphData}
        nodeLabel={(node: Node) => `${node.label}: ${node.name}`}
        nodeAutoColorBy="label"
        linkLabel={(link: Link) => `Tiempo: ${link.tiempo_minutos} min\nTráfico: ${link.trafico_actual || 'N/A'}`}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        onNodeClick={(node: Node) => alert(`Zona: ${node.name}`)}
      />
    </div>
  );
}
