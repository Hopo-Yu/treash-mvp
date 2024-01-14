// preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getNodes: () => ipcRenderer.invoke('get-nodes'),
  addNode: (title, description) => ipcRenderer.invoke('add-node', title, description),
  editNode: (nodeId, title, description) => ipcRenderer.invoke('edit-node', nodeId, title, description),
  deleteNode: (nodeId) => ipcRenderer.invoke('delete-node', nodeId),
  getTags: () => ipcRenderer.invoke('get-tags'),
  addTag: (tagName) => ipcRenderer.invoke('add-tag', tagName),
  editTag: (tagId, tagName) => ipcRenderer.invoke('edit-tag', tagId, tagName),
  deleteTag: (tagId) => ipcRenderer.invoke('delete-tag', tagId)
});
