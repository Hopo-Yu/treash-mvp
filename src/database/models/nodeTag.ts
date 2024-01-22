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


export const getNodesByTagName = (tagName: string) => {
  const stmt = db.prepare(`
    SELECT n.* 
    FROM Node n 
    JOIN NodeTag nt ON n.NodeID = nt.NodeID 
    JOIN Tag t ON nt.TagID = t.TagID 
    WHERE t.TagName = ?
  `);
  return stmt.all(tagName);
};
