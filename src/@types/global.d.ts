declare global {
  interface Window {
    api: API
  }
}

export type API = {
  appExit: () => void
  windowMinimize: () => void
  windowChangePinned: () => void
  getPinnedStatus: () => Proimse<Bool>
}
