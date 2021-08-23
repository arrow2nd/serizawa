import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  dialog,
  desktopCapturer,
  shell
} from 'electron'
import * as Splashscreen from '@trodi/electron-splashscreen'
import Store from 'electron-store'
import path from 'path'

const store = new Store()
let win: BrowserWindow

const createWindow = (): void => {
  const mainOpts: Electron.BrowserWindowConstructorOptions = {
    title: 'serizawa',
    width: 1136,
    height: 664,
    center: true,
    useContentSize: true,
    frame: false,
    resizable: false,
    show: false,
    webPreferences: {
      // https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions
      worldSafeExecuteJavaScript: true,
      // nodeモジュールをレンダラープロセスで使用不可に（XSS対策）
      nodeIntegration: false,
      // 実行コンテキストを分離
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  }

  win = Splashscreen.initSplashScreen({
    windowOpts: mainOpts,
    templateUrl: `${__dirname}/images/splash.svg`,
    splashScreenOpts: {
      width: 512,
      height: 256,
      center: true,
      transparent: true
    }
  })

  win.loadFile('./build/index.html')

  Menu.setApplicationMenu(null)

  // 多重起動を防止
  const doubleboot = app.requestSingleInstanceLock()
  if (!doubleboot) {
    app.quit()
  }

  win.webContents.openDevTools()
}

const getPicDir = () => {
  return String(store.get('picDir', app.getPath('pictures')))
}

//---------------------------------------------------

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
  if (win.isAlwaysOnTop()) {
    app.focus({ steal: true })
  }
})

//---------------------------------------------------

// アプリケーションを終了
ipcMain.on('win-close', () => win.close())

// ウィンドウを最小化
ipcMain.on('win-minimize', () => win.minimize())

// ウィンドウの最大化状態を変更
ipcMain.on('win-change-maximize', () => {
  const isMaximized = !win.isFullScreen()
  win.setFullScreen(isMaximized)
})

// ウィンドウのピン留めを変更
ipcMain.on('win-change-pinned', () => {
  const isPinned = !win.isAlwaysOnTop()

  // 最前面に固定
  if (isPinned) {
    win.setAlwaysOnTop(true, 'screen-saver')
  } else {
    win.setAlwaysOnTop(false)
  }
})

// 再読み込み
ipcMain.on('win-reload', () => win.reload())

// スクリーンショット撮影
// ipcMain.on()

//---------------------------------------------------

// スクリーンショット保存先選択
ipcMain.on('open-select-dir', () => {
  const result = dialog.showOpenDialogSync(win, {
    properties: ['openDirectory']
  })

  if (result && result[0]) {
    store.set('picDir', result[0])
  }
})

// 保存先のパスを取得
ipcMain.handle('get-pic-dir', (): string => getPicDir())

// GitHubのページを開く
ipcMain.on('open-github', () => {
  const result = dialog.showMessageBoxSync(win, {
    type: 'info',
    buttons: ['はい', 'いいえ'],
    title: '確認',
    message: 'ブラウザを開きますか？',
    detail: 'GitHubのページを開いて更新を確認します。'
  })

  if (result === 0) {
    shell.openExternal('https://github.com/arrow2nd/serizawa/releases')
  }
})
