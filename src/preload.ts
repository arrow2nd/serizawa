import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  windowClose: () => {
    ipcRenderer.send('win-close')
  },
  windowMinimize: () => {
    ipcRenderer.send('win-minimize')
  },
  windowChangePinned: () => {
    ipcRenderer.send('win-change-pinned')
  },
  getPinnedStatus: async (): Promise<boolean> => {
    return await ipcRenderer.invoke('get-pinned-status')
  }
})
