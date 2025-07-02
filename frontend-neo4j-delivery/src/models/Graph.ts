
export interface Node {
  id: string;
  name: string;
  label: string;
  x?: number; 
  y?: number;
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
