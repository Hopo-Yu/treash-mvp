// database/index.ts
import Database from 'better-sqlite3';

const db = new Database('node_library.db', { verbose: console.log });

export const initializeDatabase = () => {
  db.exec(`PRAGMA foreign_keys = OFF;`);

  db.exec(`
    DROP TABLE IF EXISTS FilePath;
    DROP TABLE IF EXISTS NodeTag;
    DROP TABLE IF EXISTS Tag;
    DROP TABLE IF EXISTS Node;
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS Node (
      NodeID INTEGER PRIMARY KEY AUTOINCREMENT,
      Title TEXT,
      Description TEXT
    );
    CREATE TABLE IF NOT EXISTS Tag (
      TagID INTEGER PRIMARY KEY AUTOINCREMENT,
      TagName TEXT
    );
    CREATE TABLE IF NOT EXISTS NodeTag (
      NodeID INTEGER,
      TagID INTEGER,
      PRIMARY KEY (NodeID, TagID),
      FOREIGN KEY (NodeID) REFERENCES Node(NodeID) ON DELETE CASCADE,
      FOREIGN KEY (TagID) REFERENCES Tag(TagID) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS FilePath (
      FilePathID INTEGER PRIMARY KEY AUTOINCREMENT,
      NodeID INTEGER,
      Path TEXT,
      FOREIGN KEY (NodeID) REFERENCES Node(NodeID) ON DELETE CASCADE
    );
  `);
};

export default db;
