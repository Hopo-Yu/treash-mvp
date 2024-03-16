import db from '../../../../database/index';
import { NodePosition } from '../../../../types/types';

export const saveNodePosition = (nodeId: number, x: number, y: number): void => {
  const stmt = db.prepare('INSERT INTO NodePosition (NodeID, X, Y) VALUES (?, ?, ?)');
  stmt.run(nodeId, x, y);
};

export const getAllNodePositions = (): NodePosition[] => {
  return db.prepare('SELECT * FROM NodePosition').all() as NodePosition[];
};

export const getNodePositionsByNodeIds = (nodeIds: number[]): NodePosition[] => {
  const placeholders: string = nodeIds.map(() => '?').join(',');
  const stmt = db.prepare(`SELECT * FROM NodePosition WHERE NodeID IN (${placeholders})`);
  return stmt.all(nodeIds) as NodePosition[];
};

export const deleteNodePosition = (positionId: number): void => {
  const stmt = db.prepare('DELETE FROM NodePosition WHERE PositionID = ?');
  stmt.run(positionId);
};
