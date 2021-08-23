declare global {
  interface Window {
    api: API
  }
}

export type API = {
  windowClose: () => void
  windowMinimize: () => void
  windowChangeMaximize: () => void
  windowChangePinned: () => void
  windowReload: () => void
  captureScreen: (rect: Rectangle) => void
  openSelectDir: () => void
  getPicDir: () => Promise<string>
  removeCache: () => void
  removeCookie: () => void
  openGitHub: () => void
}
