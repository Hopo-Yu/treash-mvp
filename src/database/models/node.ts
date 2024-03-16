// database/models/node.ts
import db from '../index';
import {Node} from '../../types/types'

export const getNodes = () => {
  return db.prepare('SELECT * FROM Node').all();
};

export const addNode = (title: string, description: string) => {
  const stmt = db.prepare('INSERT INTO Node (Title, Description) VALUES (?, ?)');
  const info = stmt.run(title, description);
  return info.lastInsertRowid;
};

export const editNode = (nodeId: number, title: string, description: string) => {
  const stmt = db.prepare('UPDATE Node SET Title = ?, Description = ? WHERE NodeID = ?');
  stmt.run(title, description, nodeId);
};

export const deleteNode = (nodeId: number) => {
  const stmt = db.prepare('DELETE FROM Node WHERE NodeID = ?');
  stmt.run(nodeId);
};

export const getNodeTitle = (nodeId: number) => {
  const stmt = db.prepare('SELECT Title FROM Node WHERE NodeID = ?');
  const node = stmt.get(nodeId) as Node | undefined; // Use type assertion here
  return node?.Title ?? null;
};

export const searchNodes = (searchTerm: string = '', tagIds: number[] = []): Node[] => {
  const tagConditions = tagIds.length > 0 ? `NodeTag.TagID IN (${tagIds.join(',')})` : '1=1';
  const searchConditions = searchTerm ? `Node.Title LIKE '%${searchTerm}%' OR Node.Description LIKE '%${searchTerm}%'` : '1=1';

  const query = `
    SELECT Node.* FROM Node
    LEFT JOIN NodeTag ON Node.NodeID = NodeTag.NodeID
    WHERE (${searchConditions}) AND (${tagConditions})
    GROUP BY Node.NodeID
  `;
  const stmt = db.prepare(query);
  return stmt.all() as Node[];
};
