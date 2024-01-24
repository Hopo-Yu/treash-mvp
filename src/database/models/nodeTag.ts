// database/models/nodeTag.ts
import db from '../index';

export const addNodeTag = (nodeId: number, tagId: number) => {
  const stmt = db.prepare('INSERT INTO NodeTag (NodeID, TagID) VALUES (?, ?)');
  stmt.run(nodeId, tagId);
};

export const deleteNodeTag = (nodeId: number, tagId: number) => {
  const stmt = db.prepare('DELETE FROM NodeTag WHERE NodeID = ? AND TagID = ?');
  stmt.run(nodeId, tagId);
};

export const getNodeTags = (nodeId: number) => {
  const stmt = db.prepare('SELECT t.TagID, t.TagName FROM Tag t JOIN NodeTag nt ON t.TagID = nt.TagID WHERE nt.NodeID = ?');
  return stmt.all(nodeId);
};

export const deleteNodeTagAssociations = (tagId: number) => {
  const stmt = db.prepare('DELETE FROM NodeTag WHERE TagID = ?');
  stmt.run(tagId);
};


export const getNodesByTagIds = (tagIds) => {
  const placeholders = tagIds.map(() => '?').join(',');
  const stmt = db.prepare(`
      SELECT Node.* 
      FROM Node
      JOIN NodeTag ON Node.NodeID = NodeTag.NodeID
      WHERE NodeTag.TagID IN (${placeholders})
  `);
  return stmt.all(tagIds);
};
