import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { GraphData, Link, Node } from '../models/Graph';
import { getGraphData } from '../services/getGraphData';

export default function GraphViewer() {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMockData = async () => {
      setLoading(true);
      try {
        const data = await getGraphData()
        setGraphData(data);
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
    <div className="w-[800px] h-[600px] rounded-lg overflow-hidden border border-gray-300 shadow-inner bg-white/30 backdrop-blur">
      <ForceGraph2D
        graphData={graphData}
        width={800}
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
