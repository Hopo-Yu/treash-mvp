// preload.ts
import { contextBridge, ipcRenderer, dialog } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getNodes: () => ipcRenderer.invoke('get-nodes'),
  addNode: (title, description) => ipcRenderer.invoke('add-node', title, description),
  editNode: (nodeId, title, description) => ipcRenderer.invoke('edit-node', nodeId, title, description),
  deleteNode: (nodeId) => ipcRenderer.invoke('delete-node', nodeId),
  searchNodes: (searchTerm, tagIds) => ipcRenderer.invoke('search-nodes', searchTerm, tagIds),
  
  getTags: () => ipcRenderer.invoke('get-tags'),
  addTag: (tagName) => ipcRenderer.invoke('add-tag', tagName),
  editTag: (tagId, tagName) => ipcRenderer.invoke('edit-tag', tagId, tagName),
  deleteTag: (tagId) => ipcRenderer.invoke('delete-tag', tagId),
  addNodeTag: (nodeId, tagId) => ipcRenderer.invoke('add-node-tag', nodeId, tagId),
  deleteNodeTag: (nodeId, tagId) => ipcRenderer.invoke('delete-node-tag', nodeId, tagId),
  getNodeTags: (nodeId) => ipcRenderer.invoke('get-node-tags', nodeId),
  deleteNodeTagAssociations: (tagId) => ipcRenderer.invoke('delete-node-tag-associations', tagId),
  getNodeTitle: (nodeId) => ipcRenderer.invoke('get-node-title', nodeId),
  getNodesByTagIds: (tagId) => ipcRenderer.invoke('get-nodes-by-tag-ids', tagId),
  //world map 2d
  saveNodePosition: (nodeId, x, y) => ipcRenderer.invoke('save-node-position', nodeId, x, y),
  getAllNodePositions: () => ipcRenderer.invoke('get-all-node-positions'),
  getNodePositionsByNodeIds: (nodeIds) => ipcRenderer.invoke('get-node-positions-by-node-ids', nodeIds),
  selectFile: async () => {
    return ipcRenderer.invoke('select-file');
  },
  addFilePath: (nodeId, filePath) => ipcRenderer.invoke('add-file-path', nodeId, filePath),
  getFilePathsByNodeId: (nodeId) => ipcRenderer.invoke('get-file-paths-by-node-id', nodeId),
  deleteFilePath: (filePathId) => ipcRenderer.invoke('delete-file-path', filePathId),
  openFile: (filePath) => ipcRenderer.invoke('open-file', filePath),

  openInFileExplorer: (filePath) => ipcRenderer.invoke('open-in-file-explorer', filePath),

  
});

