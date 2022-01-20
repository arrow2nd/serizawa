declare global {
  interface Window {
    api: API
  }
}

export type API = {
  focus: () => void
  close: () => void
  minimize: () => void
  reload: () => void
  toggleMaximize: () => void
  togglePinned: () => void
  toggleMute: () => void
  capture: () => void
  showSelectDirDialog: () => void
  getPictureDir: () => Promise<string>
  removeCache: () => void
  removeCookie: () => void
  checkUpdate: () => void
}
