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

export const getNodeTitle = (nodeId: number) => {
  const stmt = db.prepare('SELECT Title FROM Node WHERE NodeID = ?');
  const node = stmt.get(nodeId);
  return node ? node.Title : null;
};

export const searchNodes = (searchTerm = '', tagIds = []) => {
  // Construct a WHERE clause for tags if any tags are selected
  const tagConditions = tagIds.length > 0 ? 'NodeTag.TagID IN (' + tagIds.join(',') + ')' : '1=1';

  // Use LIKE operator for searchTerm with wildcard characters
  const searchConditions = searchTerm ? `Node.Title LIKE '%${searchTerm}%' OR Node.Description LIKE '%${searchTerm}%'` : '1=1';

  const stmt = db.prepare(`
    SELECT Node.* FROM Node
    LEFT JOIN NodeTag ON Node.NodeID = NodeTag.NodeID
    WHERE (${searchConditions}) AND (${tagConditions})
    GROUP BY Node.NodeID
  `);

  return stmt.all();
};
