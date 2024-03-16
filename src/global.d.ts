// global.d.ts
export {};


interface ElectronAPI {
  // Node operations
  getNodes: () => Promise<Node[]>;
  addNode: (title: string, description: string) => Promise<number>;
  editNode: (nodeId: number, title: string, description: string) => Promise<void>;
  deleteNode: (nodeId: number) => Promise<void>;
  searchNodes: (searchTerm: string, tagIds: number[]) => Promise<Node[]>;
  getNodeTitle: (nodeId: number) => Promise<string>;

  // Tag operations
  getTags: () => Promise<Tag[]>;
  addTag: (tagName: string) => Promise<void>;
  editTag: (tagId: number, tagName: string) => Promise<void>;
  deleteTag: (tagId: number) => Promise<void>;
  
  // NodeTag operations
  addNodeTag: (nodeId: number, tagId: number) => Promise<void>;
  deleteNodeTag: (nodeId: number, tagId: number) => Promise<void>;
  getNodeTags: (nodeId: number) => Promise<NodeTag[]>;
  getNodesByTagIds: (tagIds: number[]) => Promise<Node[]>;
  // FilePath operations
  addFilePath: (nodeId: number, filePath: string) => Promise<void>;
  getFilePathsByNodeId: (nodeId: number) => Promise<FilePath[]>;
  deleteFilePath: (filePathId: number) => Promise<void>;

  // NodePosition operations
  saveNodePosition: (nodeId: number, x: number, y: number) => Promise<void>;
  getAllNodePositions: () => Promise<NodePosition[]>;
  getNodePositionsByNodeIds: (nodeIds: number[]) => Promise<NodePosition[]>;
  deleteNodePosition: (positionId: number) => Promise<void>;

  // File dialog operations
  selectFile: () => Promise<string>;
  openFile: (filePath: string) => Promise<void>;
  openInFileExplorer: (filePath: string) => Promise<void>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
