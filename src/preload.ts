// preload.ts
import { contextBridge, ipcRenderer} from 'electron';
import { Node, Tag, NodeTag, FilePath, NodePosition } from './types/types';


contextBridge.exposeInMainWorld('electron', {
  // Node operations
  getNodes: (): Promise<Node[]> => ipcRenderer.invoke('get-nodes'),
  addNode: (title: string, description: string): Promise<number> => ipcRenderer.invoke('add-node', title, description),
  editNode: (nodeId: number, title: string, description: string): Promise<void> => ipcRenderer.invoke('edit-node', nodeId, title, description),
  deleteNode: (nodeId: number): Promise<void> => ipcRenderer.invoke('delete-node', nodeId),
  searchNodes: (searchTerm: string, tagIds: number[]): Promise<Node[]> => ipcRenderer.invoke('search-nodes', searchTerm, tagIds),
  getNodeTitle: (nodeId: number): Promise<string> => ipcRenderer.invoke('get-node-title', nodeId),
  getNodeDescription: (nodeId: number): Promise<string> => ipcRenderer.invoke('get-node-description', nodeId),


  // Tag operations
  getTags: (searchTerm?: string): Promise<Tag[]> => ipcRenderer.invoke('get-tags', searchTerm),

  addTag: (tagName: string): Promise<void> => ipcRenderer.invoke('add-tag', tagName),
  editTag: (tagId: number, tagName: string): Promise<void> => ipcRenderer.invoke('edit-tag', tagId, tagName),
  deleteTag: (tagId: number): Promise<void> => ipcRenderer.invoke('delete-tag', tagId),
  
  // NodeTag operations
  addNodeTag: (nodeId: number, tagId: number): Promise<void> => ipcRenderer.invoke('add-node-tag', nodeId, tagId),
  deleteNodeTag: (nodeId: number, tagId: number): Promise<void> => ipcRenderer.invoke('delete-node-tag', nodeId, tagId),
  getNodeTags: (nodeId: number): Promise<NodeTag[]> => ipcRenderer.invoke('get-node-tags', nodeId),
  getNodesByTagIds: (tagIds: number[]): Promise<Node[]> => ipcRenderer.invoke('get-nodes-by-tag-ids', tagIds),

  // FilePath operations
  addFilePath: (nodeId: number, filePath: string): Promise<void> => ipcRenderer.invoke('add-file-path', nodeId, filePath),
  getFilePathsByNodeId: (nodeId: number): Promise<FilePath[]> => ipcRenderer.invoke('get-file-paths-by-node-id', nodeId),
  deleteFilePath: (filePathId: number): Promise<void> => ipcRenderer.invoke('delete-file-path', filePathId),
  selectFile: () => ipcRenderer.invoke('select-file'),

  // NodePosition operations
  saveNodePosition: (nodeId: number, x: number, y: number): Promise<void> => ipcRenderer.invoke('save-node-position', nodeId, x, y),
  getAllNodePositions: (): Promise<NodePosition[]> => ipcRenderer.invoke('get-all-node-positions'),
  getNodePositionsByNodeIds: (nodeIds: number[]): Promise<NodePosition[]> => ipcRenderer.invoke('get-node-positions-by-node-ids', nodeIds),
  deleteNodePosition: (positionId: number): Promise<void> => ipcRenderer.invoke('delete-node-position', positionId),
  


  openFile: (filePath: string): Promise<void> => ipcRenderer.invoke('open-file', filePath),
  openInFileExplorer: (filePath: string): Promise<void> => ipcRenderer.invoke('open-in-file-explorer', filePath),
});

