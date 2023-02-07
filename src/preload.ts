import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  // ビューに対する操作
  focusView: () => ipcRenderer.send("focus-view"),
  showView: () => ipcRenderer.send("show-view"),
  hideView: () => ipcRenderer.send("hide-view"),
  reloadView: () => ipcRenderer.send("reload-view"),

  // ウィンドウに対する操作
  close: () => ipcRenderer.send("close"),
  minimize: () => ipcRenderer.send("minimize"),
  toggleMaximize: () => ipcRenderer.send("toggle-maximize"),
  togglePinned: () => ipcRenderer.send("toggle-pinned"),
  toggleMute: () => ipcRenderer.send("toggle-mute"),

  // スクリーンショット関係
  capture: () => ipcRenderer.send("capture"),
  showSelectDirDialog: () => ipcRenderer.send("show-select-dir-dialog"),
  getPictureDir: (): Promise<string> => ipcRenderer.invoke("get-picture-dir"),

  // 設定関係
  removeCache: (): Promise<void> => ipcRenderer.invoke("remove-cache"),
  removeCookie: (): Promise<void> => ipcRenderer.invoke("remove-cookie"),
  checkUpdate: (): Promise<void> => ipcRenderer.invoke("check-update"),

  // リンク関係
  openPrivacyPolicy: () => ipcRenderer.send("open-privacy-policy"),
  openGitHub: () => ipcRenderer.send("open-github")
});
