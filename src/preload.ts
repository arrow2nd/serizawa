import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  appExit: () => {
    ipcRenderer.send('ipc-app-exit')
  },
  windowMinimize: () => {
    ipcRenderer.send('ipc-win-minimize')
  }
})
