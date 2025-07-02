
export interface Node {
  id: string;
  name: string;
  label: 'Zona' | 'CentroDistribucion';
}

export interface Link {
  source: string;
  target: string;
  tiempo_minutos: number;
  trafico_actual?: string;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}