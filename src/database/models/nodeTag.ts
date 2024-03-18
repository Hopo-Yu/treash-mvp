// database/models/nodeTag.ts
import db from '../index';
import { Node } from '../../types/types';

export const addNodeTag = (nodeId: number, tagId: number): void => {
  const stmt = db.prepare('INSERT INTO NodeTag (NodeID, TagID) VALUES (?, ?)');
  stmt.run(nodeId, tagId);
};

export const deleteNodeTag = (nodeId: number, tagId: number): void => {
  const stmt = db.prepare('DELETE FROM NodeTag WHERE NodeID = ? AND TagID = ?');
  stmt.run(nodeId, tagId);
};

export const getNodeTags = (nodeId: number) => {
  const stmt = db.prepare('SELECT t.TagID, t.TagName FROM Tag t JOIN NodeTag nt ON t.TagID = nt.TagID WHERE nt.NodeID = ?');
  return stmt.all(nodeId);
};

export const getNodesByTagIds = (tagIds: number[]): Node[] => {
  const placeholders = tagIds.map(() => '?').join(',');
  const query = `
    SELECT DISTINCT Node.NodeID, Node.Title, Node.Description
    FROM Node
    JOIN NodeTag ON Node.NodeID = NodeTag.NodeID
    WHERE NodeTag.TagID IN (${placeholders})
  `;
  const stmt = db.prepare(query);
  return stmt.all(...tagIds) as Node[]; 
};