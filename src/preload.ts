import { contextBridge, ipcRenderer } from 'electron'

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
  openSelectDir: () => {
    ipcRenderer.send('open-select-dir')
  },
  getPicDir: (): Promise<string> => {
    return ipcRenderer.invoke('get-pic-dir')
  },
  openGitHub: () => {
    ipcRenderer.send('open-github')
  }
})
