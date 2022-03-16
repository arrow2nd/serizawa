declare global {
  interface Window {
    api: API
  }
}

export type API = {
  focusView: () => void
  showView: () => void
  hideView: () => void
  close: () => void
  minimize: () => void
  reload: () => void
  toggleMaximize: () => void
  togglePinned: () => void
  toggleMute: () => void
  capture: () => void
  showSelectDirDialog: () => void
  getPictureDir: () => Promise<string>
  removeCache: () => Promise<void>
  removeCookie: () => Promise<void>
  checkUpdate: () => Promise<void>
  openPrivacyPolicy: () => void
  openGitHub: () => void
}
