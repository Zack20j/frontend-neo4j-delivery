import { GraphData } from "../models/Graph";

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

export async function getGraphData(): Promise<GraphData> {
    try {
        const response = await fetch('http://localhost:8080/api/graph', {
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors', // Asegúrate de incluir esto
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching graph data:', error);
        throw error;
    }
}

/*
export const getGraphData = async (): Promise<GraphData> => {
    return mockGraphData
}
*/
