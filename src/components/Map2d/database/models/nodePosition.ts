// src/components/Map2d/database/models/nodePosition.ts

import db from '../../../../database/index'; // Adjust the path based on your directory structure

export const saveNodePosition = (nodeId: number, x: number, y: number) => {
  const stmt = db.prepare('INSERT INTO NodePosition (NodeID, X, Y) VALUES (?, ?, ?)');
  stmt.run(nodeId, x, y);
};

export const getAllNodePositions = () => {
  return db.prepare('SELECT * FROM NodePosition').all();
};