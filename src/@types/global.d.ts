declare global {
  interface Window {
    api: API
  }
}

export type API = {
  openAbout: () => void
  windowClose: () => void
  windowMinimize: () => void
  windowChangeMaximize: () => void
  windowChangePinned: () => void
  windowReload: () => void
}
