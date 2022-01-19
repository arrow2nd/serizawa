import * as Splashscreen from '@trodi/electron-splashscreen'
import {
  BrowserWindow,
  Menu,
  app,
  clipboard,
  dialog,
  ipcMain,
  session,
  shell
} from 'electron'
import Store from 'electron-store'
import { Rectangle } from 'electron/main'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import path from 'path'

import { checkUpdate } from './libs/checkUpdate'
import { date2String } from './libs/util'

const defaultSize = {
  width: 1136,
  height: 640 + 24 // タイトルバー込み
}

const store = new Store()

let win: BrowserWindow

// ウィンドウ作成
const createWindow = () => {
  const mainOpts: Electron.BrowserWindowConstructorOptions = {
    title: 'serizawa',
    ...defaultSize,
    resizable: false,
    center: true,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nativeWindowOpen: true,
      devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  }

  // スプラッシュ画面
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

  // 画面の設定
  win.loadFile('./build/index.html')
  // win.setAspectRatio(142 / 83) // 142:83

  const handleUrlOpen = (e: Electron.Event, url: string) => {
    e.preventDefault()

    if (/^http/.test(url)) {
      shell.openExternal(url)
    }
  }

  // 外部リンクを標準ブラウザで開く
  win.webContents.on('will-navigate', handleUrlOpen)
  win.webContents.on('new-window', handleUrlOpen)

  // win.webContents.openDevTools()

  // メニューバーを無効
  Menu.setApplicationMenu(null)

  // 多重起動を防止
  if (!app.requestSingleInstanceLock()) {
    app.quit()
  }
}

// スクショの保存ディレクトリを取得
const getPicDir = () => {
  const defaultPath = path.join(app.getPath('pictures'), 'serizawa')
  return String(store.get('picDir', defaultPath))
}

// 更新通知ダイアログ
const openDownloadPage = (url: string | undefined) => {
  if (!url || !/^https:\/\/github\.com/.test(url)) return

  const result = dialog.showMessageBoxSync(win, {
    type: 'question',
    buttons: ['はい', 'いいえ'],
    defaultId: 0,
    title: '更新通知',
    message: '新しいバージョンが利用可能です',
    detail: 'ブラウザを開いてファイルをダウンロードしますか？'
  })

  if (result === 0) {
    shell.openExternal(url)
    app.quit() // 終了
  }
}

//---------------------------------------------------

app.whenReady().then(() => {
  // ウィンドウを作成
  createWindow()
  // 更新を確認
  checkUpdate().then((url) => openDownloadPage(url))
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
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
  win.setFullScreen(!win.isFullScreen())
})

// ウィンドウのピン留めを変更
ipcMain.on('win-change-pinned', () => {
  if (win.isAlwaysOnTop()) {
    // 解除
    win.setAlwaysOnTop(false)
  } else {
    // ピン留め
    win.setAlwaysOnTop(true, 'screen-saver')
  }
})

// 再読み込み
ipcMain.on('win-reload', () => {
  win.setFullScreen(false)
  win.setAlwaysOnTop(false)
  win.reload()
})

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

// ミュート状態の変更
ipcMain.on('win-change-mute', () => {
  win.webContents.setAudioMuted(!win.webContents.isAudioMuted())
})

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
  for (const cookie of cookies) {
    let url = cookie.secure ? 'https://' : 'http://'

    url += cookie.domain?.charAt(0) === '.' ? 'www' : ''
    url += `${cookie.domain || ''}${cookie.path || ''}`

    session.defaultSession.cookies.remove(url, cookie.name)
  }

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

// 更新確認
ipcMain.on('check-update', async () => {
  const url = await checkUpdate()

  if (!url) {
    dialog.showMessageBoxSync(win, {
      type: 'info',
      title: '通知',
      message: '現在のバージョンは最新版です！'
    })
    return
  }

  openDownloadPage(url)
})
