import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  openAbout: () => {
    ipcRenderer.send('open-about')
  },
  windowClose: () => {
    ipcRenderer.send('win-close')
  },
  windowMinimize: () => {
    ipcRenderer.send('win-minimize')
  },
  windowChangeMaximize: () => {
    ipcRenderer.send('win-change-maximize')
  },
  windowChangePinned: () => {
    ipcRenderer.send('win-change-pinned')
  },
  windowReload: () => {
    ipcRenderer.send('win-reload')
  }
})
