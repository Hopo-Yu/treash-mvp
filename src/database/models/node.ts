// database/models/node.ts
import db from '../index';

export const getNodes = () => {
  return db.prepare('SELECT * FROM Node').all();
};

export const addNode = (title: string, description: string) => {
  console.log('Inserting into database:', { title, description });
  const stmt = db.prepare('INSERT INTO Node (Title, Description) VALUES (?, ?)');
  const info = stmt.run(title, description);
  return info.lastInsertRowid;
};

export const editNode = (nodeId: number, title: string, description: string) => {
  const stmt = db.prepare('UPDATE Node SET Title = ?, Description = ? WHERE NodeID = ?');
  stmt.run(title, description, nodeId);
};

export const deleteNode = (nodeId: number) => {
  console.log('Executing delete in database for nodeId:', nodeId);
  const stmt = db.prepare('DELETE FROM Node WHERE NodeID = ?');
  stmt.run(nodeId);
};
