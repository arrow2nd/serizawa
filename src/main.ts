import {
  BrowserWindow,
  app,
  clipboard,
  ipcMain,
  session,
  shell
} from 'electron'
import Store from 'electron-store'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import path from 'path'

import { checkUpdate } from './libs/checkUpdate'
import { date2String } from './libs/util'

import { Browser } from './window'

const store = new Store()
const browser = new Browser()

//----------------------------------------------------------------------

/**
 * スクリーンショットの保存ディレクトリを取得
 * @returns ディレクトリパス
 */
const getPicDir = (): string => {
  const defaultPath = path.join(app.getPath('pictures'), 'serizawa')
  return String(store.get('picDir', defaultPath))
}

/**
 * 更新通知ダイアログを表示
 * @param url GitHubのURL
 */
const showUpdateDialog = (url: string | undefined) => {
  if (!url || !/^https:\/\/github\.com/.test(url)) return

  const result = browser.showMessageWindow({
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

/**
 * ウィンドウにフォーカスを当てる
 *
 * TODO: 動いてないかもなので後で対応する
 */
const focusWindow = () => {
  console.log('[focus] ' + new Date().toTimeString())
  browser.focus()
  app.focus({ steal: true })
}

//----------------------------------------------------------------------

app.whenReady().then(() => {
  // ウィンドウを作成
  browser.create()
  // 更新を確認
  checkUpdate().then((url) => showUpdateDialog(url))
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    browser.create()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// フォーカスを失わないようにする
app.on('browser-window-blur', () => {
  if (browser.isPinned()) {
    focusWindow()
  }
})

//----------------------------------------------------------------------

// フォーカスを当てる
ipcMain.on('focus', () => focusWindow())

// ビューを表示
ipcMain.on('show-view', () => browser.showView())

// ビューを非表示
ipcMain.on('hide-view', () => browser.hideView())

// アプリケーションを終了
ipcMain.on('close', () => browser.close())

// ウィンドウを最小化
ipcMain.on('minimize', () => browser.minimize())

// 再読み込み
ipcMain.on('reload', () => browser.reload())

// ウィンドウの最大化状態を変更
ipcMain.on('toggle-maximize', () => browser.maximize())

// ウィンドウのピン留めを変更
ipcMain.on('toggle-pinned', () => browser.pinned())

// ミュート状態の変更
ipcMain.on('toggle-mute', () => browser.muted())

// スクリーンショット撮影
ipcMain.on('capture', async () => {
  const saveDir = getPicDir()

  // ディレクトリが無い場合作成
  if (!existsSync(saveDir)) {
    mkdirSync(saveDir)
  }

  // 撮影
  const pic = await browser.capture()
  if (!pic) return

  // パスを作成
  const dateStr = date2String(new Date())
  const savePath = path.join(saveDir, `ScreenShot_${dateStr}.png`)

  // 保存
  clipboard.writeImage(pic)
  writeFileSync(savePath, pic.toPNG())
})

//----------------------------------------------------------------------

// スクリーンショット保存先選択
ipcMain.on('show-select-dir-dialog', () => {
  const result = browser.showOpenDialog({
    properties: ['openDirectory']
  })

  if (result && result[0]) {
    store.set('picDir', result[0])
  }
})

// 保存先のパスを取得
ipcMain.handle('get-picture-dir', (): string => getPicDir())

// キャッシュを削除
ipcMain.on('remove-cache', async () => {
  const result = browser.showMessageWindow({
    type: 'question',
    buttons: ['はい', 'いいえ'],
    defaultId: 0,
    title: '確認',
    message: 'キャッシュを削除しますか？'
  })

  if (result !== 0) return

  await session.defaultSession.clearCache()

  browser.showMessageWindow({
    type: 'info',
    title: '完了',
    message: '削除が完了しました'
  })
})

// Cookieを削除
ipcMain.on('remove-cookie', async () => {
  const result = browser.showMessageWindow({
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

  browser.showMessageWindow({
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
    browser.showMessageWindow({
      type: 'info',
      title: '通知',
      message: '現在のバージョンは最新版です！'
    })
    return
  }

  showUpdateDialog(url)
})
