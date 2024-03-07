// database/models/filePath.ts
import db from '../index';
import path from 'path';

export const addFilePath = (nodeId: number, filePath: string) => {
  console.log('Inserting file path into database:', { nodeId, filePath });
  const stmt = db.prepare('INSERT INTO FilePath (NodeID, Path) VALUES (?, ?)');
  const info = stmt.run(nodeId, filePath);
  return info.lastInsertRowid;
};

export const getFilePathsByNodeId = (nodeId: number) => {
  const stmt = db.prepare('SELECT * FROM FilePath WHERE NodeID = ?');
  const filePaths = stmt.all(nodeId);
  // Extract file names from paths
  const filePathsWithNames = filePaths.map(file => ({
    ...file,
    FileName: path.basename(file.Path)
  }));
  return filePathsWithNames;
};

export const deleteFilePath = (filePathId: number) => {
  console.log('Deleting file path from database for FilePathID:', filePathId);
  const stmt = db.prepare('DELETE FROM FilePath WHERE FilePathID = ?');
  stmt.run(filePathId);
};

export const updateFilePath = (filePathId: number, newPath: string) => {
  const stmt = db.prepare('UPDATE FilePath SET Path = ? WHERE FilePathID = ?');
  stmt.run(newPath, filePathId);
};
