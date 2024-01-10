// preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getNodes: () => ipcRenderer.invoke('get-nodes'),
  addNode: (title, description) => ipcRenderer.invoke('add-node', title, description)
  // ...other IPC functions...
});
