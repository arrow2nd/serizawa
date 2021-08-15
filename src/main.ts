import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import path from 'path'

let win: BrowserWindow

const createWindow = (): void => {
  win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      // https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions
      worldSafeExecuteJavaScript: true,
      // nodeモジュールをレンダラープロセスで使用不可に（XSS対策）
      nodeIntegration: false,
      // 実行コンテキストを分離
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./build/index.html')

  // メニューを無効化
  Menu.setApplicationMenu(null)
}

// 多重起動を防止
const doubleboot = app.requestSingleInstanceLock()
if (!doubleboot) {
  app.quit()
}

// 初期化できたらウィンドウを作成
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//---------------------------------------------------

// アプリケーションを終了
ipcMain.on('ipc-app-exit', () => app.quit())

// ウィンドウを最小化
ipcMain.on('ipc-win-minimize', () => win.minimize())
