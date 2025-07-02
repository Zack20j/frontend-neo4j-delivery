import { Incident } from "../models/ConnectionModel";

const mockConnections: Incident[] = [
  { from: 'CD1', to: 'Z1', status: 'abierta' },
  { from: 'Z1', to: 'Z2', status: 'abierta' },
  { from: 'Z2', to: 'Z3', status: 'abierta' },
  { from: 'Z3', to: 'CD1', status: 'abierta' },
];

export const getConnections = async () => {
    return mockConnections
}