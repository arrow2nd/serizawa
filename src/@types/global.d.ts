declare global {
  interface Window {
    api: API
  }
}

export type API = {
  windowClose: () => void
  windowMinimize: () => void
  windowChangePinned: () => void
  getPinnedStatus: () => Proimse<Bool>
}
