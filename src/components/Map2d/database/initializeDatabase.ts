// src/components/Map2d/database/initializeDatabase.ts

import db from '../../../database/index'; // Adjust the path based on your directory structure

export const initializeMapDatabase = () => {
  db.exec(`PRAGMA foreign_keys = OFF;`);
  
  db.exec(`
    DROP TABLE IF EXISTS NodePosition;
  `);

  db.exec(`

  CREATE TABLE IF NOT EXISTS NodePosition (
    PositionID INTEGER PRIMARY KEY AUTOINCREMENT,
    NodeID INTEGER,
    X REAL,
    Y REAL,
    FOREIGN KEY (NodeID) REFERENCES Node(NodeID) ON DELETE CASCADE
  );
`);
};
