import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  // ビューにフォーカスを当てる
  focusView: () => ipcRenderer.send('focus-view'),
  // ビューを表示
  showView: () => ipcRenderer.send('show-view'),
  // ビューを非表示
  hideView: () => ipcRenderer.send('hide-view'),
  // 閉じる
  close: () => ipcRenderer.send('close'),
  // 最小化
  minimize: () => ipcRenderer.send('minimize'),
  // 再読み込み
  reload: () => ipcRenderer.send('reload'),
  // 最大化切り替え
  toggleMaximize: () => ipcRenderer.send('toggle-maximize'),
  // 最前面に固定切り替え
  togglePinned: () => ipcRenderer.send('toggle-pinned'),
  // ミュート切り替え
  toggleMute: () => ipcRenderer.send('toggle-mute'),
  // スクリーンショットを撮影
  capture: () => ipcRenderer.send('capture'),
  // ディレクトリ選択ダイアログを開く
  showSelectDirDialog: () => ipcRenderer.send('show-select-dir-dialog'),
  // スクリーンショット保存ディレクトリを取得
  getPictureDir: (): Promise<string> => ipcRenderer.invoke('get-picture-dir'),
  // キャッシュを削除
  removeCache: () => ipcRenderer.send('remove-cache'),
  // Cookieを削除
  removeCookie: () => ipcRenderer.send('remove-cookie'),
  // 更新を確認
  checkUpdate: () => ipcRenderer.send('check-update'),
  // プライバシーポリシー
  openPrivacyPolicy: () => ipcRenderer.send('open-privacy-policy')
})
