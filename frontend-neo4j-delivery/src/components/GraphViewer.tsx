import React, { useEffect, useState, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { GraphData, Link, Node } from '../models/Graph';
import { getGraphData } from '../services/getGraphData';

export default function GraphViewer() {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fgRef = useRef<any>();
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set());
  const [highlightLinks, setHighlightLinks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getGraphData();
        setGraphData(data);
        setErrorMessage(null);
      } catch (err) {
        console.error('Error loading graph:', err);
        setErrorMessage('Error al cargar el grafo');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Configuración de estilos (puedes modificar estos valores)
  const styles = {
    node: {
      centerSize: 2,
      normalSize: 5,
      centerColor: '#e63946',
      normalColor: '#1d3557',
      textColor: '#ffffff',
      borderColor: '#ffffff',
      borderWidth: 2
    },
    link: {
      width: 3,
      highWidth: 5,
      arrowLength: 8,
      particles: 1, // Desactivamos partículas que causaban flechas raras
      highColor: '#ff6b6b',
      mediumColor: '#feca57',
      lowColor: '#1dd1a1'
    }
  };

  const handleNodeHover = (node: Node | null) => {
    if (!node) {
      setHighlightNodes(new Set());
      setHighlightLinks(new Set());
      return;
    }

    // Resaltar nodo y sus conexiones
    const newHighlightNodes = new Set([node.id]);
    const newHighlightLinks = new Set();
    
    graphData.links.forEach(link => {
      if (link.source === node.id || link.target === node.id) {
        newHighlightLinks.add(`${link.source}-${link.target}`);
        newHighlightNodes.add(link.source as string);
        newHighlightNodes.add(link.target as string);
      }
    });

    setHighlightNodes(newHighlightNodes);
  };

  const handleLinkHover = (link: Link | null) => {
    if (!link) {
      setHighlightNodes(new Set());
      setHighlightLinks(new Set());
      return;
    }

    // Resaltar la relación y sus nodos
    const newHighlightNodes = new Set([link.source as string, link.target as string]);
    const newHighlightLinks = new Set([`${link.source}-${link.target}`]);
    
    setHighlightNodes(newHighlightNodes);
    setHighlightLinks(newHighlightLinks);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-full">
      <p className="text-lg text-white">Cargando grafo...</p>
    </div>
  );

  if (errorMessage) return (
    <div className="flex justify-center items-center h-full">
      <p className="text-lg text-red-500">{errorMessage}</p>
    </div>
  );

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-transparent">
      <ForceGraph2D
             ref={fgRef}
      graphData={graphData}
      width={window.innerWidth * 0.8}
      height={window.innerHeight * 0.8}
      backgroundColor="rgba(0,0,0,0)" 

      // Configuración de física para mayor separación
      



        // Configuración de nodos
        nodeRelSize={styles.node.normalSize}
        nodeVal={node => node.label === 'CentroDistribucion' ? styles.node.centerSize : styles.node.normalSize}
        nodeColor={node => {
          if (highlightNodes.has(node.id)) return '#ffbe76';
          return node.label === 'CentroDistribucion' ? styles.node.centerColor : styles.node.normalColor;
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          const nodeSize = node.label === 'CentroDistribucion' ? styles.node.centerSize : styles.node.normalSize;
          
          // Dibujar círculo del nodo
          ctx.beginPath();
          ctx.arc(node.x || 0, node.y || 0, nodeSize, 0, 2 * Math.PI, false);
          ctx.fillStyle = highlightNodes.has(node.id) ? '#ffbe76' : 
                         node.label === 'CentroDistribucion' ? styles.node.centerColor : styles.node.normalColor;
          ctx.fill();
          
          // Dibujar borde del nodo
          ctx.lineWidth = styles.node.borderWidth / globalScale;
          ctx.strokeStyle = styles.node.borderColor;
          ctx.stroke();
          
          // Dibujar texto dentro del nodo
          ctx.font = `bold ${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = styles.node.textColor;
          ctx.fillText(label, node.x || 0, node.y || 0);
        }}
        
        // Configuración de relaciones
        linkDirectionalArrowLength={styles.link.arrowLength}
        linkDirectionalArrowRelPos={1}
        linkDirectionalParticles={styles.link.particles} // Desactivadas
        linkWidth={link => 
          highlightLinks.has(`${link.source}-${link.target}`) ? styles.link.highWidth : 
          link.trafico_actual === 'alto' ? styles.link.highWidth : styles.link.width
        }
        linkColor={link => 
          highlightLinks.has(`${link.source}-${link.target}`) ? '#ffbe76' :
          link.trafico_actual === 'alto' ? styles.link.highColor :
          link.trafico_actual === 'medio' ? styles.link.mediumColor : styles.link.lowColor
        }
        
        // Interacciones mejoradas
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        onNodeClick={(node) => {
          // Centrar y hacer zoom al nodo clickeado
          fgRef.current?.centerAt(node.x || 0, node.y || 0, 1000);
          fgRef.current?.zoom(8, 2000);
        }}
        onNodeDrag={(node, translate) => {
          node.fx = node.x;
          node.fy = node.y;
        }}
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
        }}
        
        // Tooltips mejorados
        nodeLabel={node => `
          <div style="
            background: rgba(30, 30, 30, 0.95);
            padding: 8px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.5);
            color: #fff;
            font-size: 14px;
            max-width: 250px;
            border: 1px solid #555;
          ">
            <strong style="color: ${node.label === 'CentroDistribucion' ? '#ff6b6b' : '#74b9ff'}">
              ${node.label}: ${node.name}
            </strong>
            ${node.tipo ? `<div style="margin-top: 4px;"><em>Tipo:</em> ${node.tipo}</div>` : ''}
          </div>
        `}
        linkLabel={link => {
          const sourceNode = graphData.nodes.find(n => n.id === link.source);
          const targetNode = graphData.nodes.find(n => n.id === link.target);
          return `
            <div style="
              background: rgba(30, 30, 30, 0.95);
              padding: 8px;
              border-radius: 4px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.5);
              color: #fff;
              font-size: 14px;
              max-width: 250px;
              border: 1px solid #555;
            ">
              <strong style="color: #74b9ff">Conexión entre nodos</strong>
              <div style="margin-top: 6px;">
                <div><strong>Desde:</strong> ${sourceNode?.name}</div>
                <div><strong>Hacia:</strong> ${targetNode?.name}</div>
                <div><strong>Tiempo:</strong> ${link.tiempo_minutos} min</div>
                <div><strong>Tráfico:</strong> 
                  <span style="color: ${link.trafico_actual === 'alto' ? '#ff6b6b' : 
                                   link.trafico_actual === 'medio' ? '#feca57' : '#1dd1a1'}">
                  ${link.trafico_actual}
                  </span>
                </div>
                <div><strong>Capacidad:</strong> ${link.capacidad}</div>
              </div>
            </div>
          `;
        }}
      />
    </div>
  );
}
