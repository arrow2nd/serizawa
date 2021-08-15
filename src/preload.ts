import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  appExit: () => {
    ipcRenderer.send('app-exit')
  },
  windowMinimize: () => {
    ipcRenderer.send('win-minimize')
  },
  windowChangePinned: () => {
    ipcRenderer.send('win-change-pinned')
  }
})
