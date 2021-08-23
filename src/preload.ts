import { contextBridge, ipcRenderer } from 'electron'
import { Rectangle } from 'electron/main'

contextBridge.exposeInMainWorld('api', {
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
  },
  captureScreen: (rect: Rectangle) => {
    ipcRenderer.send('capture-screen', rect)
  },
  openSelectDir: () => {
    ipcRenderer.send('open-select-dir')
  },
  getPicDir: (): Promise<string> => {
    return ipcRenderer.invoke('get-pic-dir')
  },
  removeCache: () => {
    ipcRenderer.send('remove-cache')
  },
  removeCookie: () => {
    ipcRenderer.send('remove-cookie')
  },
  openGitHub: () => {
    ipcRenderer.send('open-github')
  }
})
