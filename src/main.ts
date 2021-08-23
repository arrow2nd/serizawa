import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  dialog,
  shell,
  session,
  clipboard
} from 'electron'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { Rectangle } from 'electron/main'
import * as Splashscreen from '@trodi/electron-splashscreen'
import Store from 'electron-store'
import path from 'path'

const store = new Store()
let win: BrowserWindow

const createWindow = () => {
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
      devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  }

  win = Splashscreen.initSplashScreen({
    windowOpts: mainOpts,
    templateUrl: `${__dirname}/images/splash.svg`,
    splashScreenOpts: {
      width: 520,
      height: 264,
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

  // win.webContents.openDevTools()
}

const getPicDir = () => {
  const defaultPath = path.join(app.getPath('pictures'), 'serizawa')
  return String(store.get('picDir', defaultPath))
}

const date2String = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}${month}${day}_${hours}${minutes}${seconds}`
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
ipcMain.on(
  'capture-screen',
  async (_ev: Electron.IpcMainEvent, rect: Rectangle) => {
    const saveDir = getPicDir()

    // ディレクトリが無い場合作成
    if (!existsSync(saveDir)) {
      mkdirSync(saveDir)
    }

    const pic = await win.webContents.capturePage(rect)
    const dateStr = date2String(new Date())
    const savePath = path.join(saveDir, `ScreenShot_${dateStr}.png`)

    // 保存
    clipboard.writeImage(pic)
    writeFileSync(savePath, pic.toPNG())
  }
)

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

// キャッシュを削除
ipcMain.on('remove-cache', async () => {
  const result = dialog.showMessageBoxSync(win, {
    type: 'question',
    buttons: ['はい', 'いいえ'],
    defaultId: 0,
    title: '確認',
    message: 'キャッシュを削除しますか？'
  })

  if (result !== 0) return

  await session.defaultSession.clearCache()

  dialog.showMessageBoxSync(win, {
    type: 'info',
    title: '完了',
    message: '削除が完了しました'
  })
})

// Cookieを削除
ipcMain.on('remove-cookie', async () => {
  const result = dialog.showMessageBoxSync(win, {
    type: 'question',
    buttons: ['はい', 'いいえ'],
    defaultId: 1,
    title: '危険！',
    message: '初期化（ログアウト）しますか？',
    detail: 'アカウントが削除されることはありません。'
  })

  if (result !== 0) return

  // 全てのCookieを削除
  const cookies = await session.defaultSession.cookies.get({})
  cookies.forEach((cookie) => {
    let url = cookie.secure ? 'https://' : 'http://'
    url += cookie.domain?.charAt(0) === '.' ? 'www' : ''
    url += `${cookie.domain || ''}${cookie.path || ''}`

    session.defaultSession.cookies.remove(url, cookie.name)
  })

  // 設定を削除
  store.clear()

  dialog.showMessageBoxSync(win, {
    type: 'info',
    title: '完了',
    message: '初期化が完了しました',
    detail: 'アプリケーションを終了します。'
  })

  app.quit()
})

// GitHubのページを開く
ipcMain.on('open-github', () => {
  const result = dialog.showMessageBoxSync(win, {
    type: 'question',
    buttons: ['はい', 'いいえ'],
    defaultId: 0,
    title: '確認',
    message: 'ブラウザを開きますか？',
    detail: 'GitHubのページを開いて更新を確認します。'
  })

  if (result === 0) {
    shell.openExternal('https://github.com/arrow2nd/serizawa/releases')
  }
})
