// src/components/Map2d/database/models/nodePosition.ts

import db from '../../../../database/index'; 

export const saveNodePosition = (nodeId: number, x: number, y: number) => {
  const stmt = db.prepare('INSERT INTO NodePosition (NodeID, X, Y) VALUES (?, ?, ?)');
  stmt.run(nodeId, x, y);
};

export const getAllNodePositions = () => {
  return db.prepare('SELECT * FROM NodePosition').all();
};

export const getNodePositionsByNodeIds = (nodeIds) => {
  // Ensure nodeIds is an array of numbers/strings
  const ids = nodeIds.map(node => node.NodeID || node);
  
  const placeholders = ids.map(() => '?').join(',');
  const stmt = db.prepare(`
      SELECT * FROM NodePosition
      WHERE NodeID IN (${placeholders})
  `);
  return stmt.all(ids);
};