import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import path from 'path'

let isPinned = false
let win: BrowserWindow

const createWindow = (): void => {
  win = new BrowserWindow({
    title: 'serizawa',
    width: 1136,
    height: 664,
    useContentSize: true,
    frame: false,
    resizable: false,
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

  Menu.setApplicationMenu(null)
  win.webContents.openDevTools()
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

// フォーカスを失わないようにする
app.on('browser-window-blur', () => {
  if (isPinned) {
    app.focus()
  }
})

//---------------------------------------------------

// アプリケーションを終了
ipcMain.on('app-exit', () => app.quit())

// ウィンドウを最小化
ipcMain.on('win-minimize', () => win.minimize())

// ウィンドウのピン留めを変更
ipcMain.on('win-change-pinned', () => {
  isPinned = !isPinned

  // 最前面に固定
  win.setAlwaysOnTop(isPinned, 'screen-saver')
})
