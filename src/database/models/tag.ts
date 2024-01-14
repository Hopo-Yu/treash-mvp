// database/models/tag.ts
import db from '../index';

export const getTags = () => {
  return db.prepare('SELECT * FROM Tag').all();
};

export const addTag = (tagName: string) => {
  const stmt = db.prepare('INSERT INTO Tag (TagName) VALUES (?)');
  const info = stmt.run(tagName);
  return info.lastInsertRowid;
};

export const editTag = (tagId: number, tagName: string) => {
  const stmt = db.prepare('UPDATE Tag SET TagName = ? WHERE TagID = ?');
  stmt.run(tagName, tagId);
};

export const deleteTag = (tagId: number) => {
  const stmt = db.prepare('DELETE FROM Tag WHERE TagID = ?');
  stmt.run(tagId);
};
