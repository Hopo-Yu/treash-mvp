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

// Add more functions as needed for update and delete
