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

  const result = browser.showMessageDialog({
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

//----------------------------------------------------------------------

app.whenReady().then(() => {
  // ウィンドウを作成
  browser.create()

  // 更新を確認
  checkUpdate()
    .then((url) => showUpdateDialog(url))
    .catch((err) => console.error(err))
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
  // ピン止めされていないなら何もしない
  if (!browser.isPinned()) return

  // フォーカスを奪う
  app.focus({ steal: true })

  // 実際にフォーカスが当たるまで遅延があるので
  // 少し間隔をあけてからビューにフォーカスを当てる
  setTimeout(() => browser.focusView(), 100)
})

//----------------------------------------------------------------------

// ビューにフォーカスを当てる
ipcMain.on('focus-view', () => browser.focusView())

// ビューを表示
ipcMain.on('show-view', () => browser.showView())

// ビューを非表示
ipcMain.on('hide-view', () => browser.hideView())

// 再読み込み
ipcMain.on('reload-view', () => browser.reloadView())

// ウィンドウを閉じる
ipcMain.on('close', () => browser.close())

// ウィンドウを最小化
ipcMain.on('minimize', () => browser.minimize())

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

  // スクリーンショットを取得
  const rowPicture = await browser.capture()
  if (!rowPicture) return

  // 保存先のパスを作成
  const dateStr = date2String(new Date())
  const savePath = path.join(saveDir, `ScreenShot_${dateStr}.png`)

  // 保存 & クリップボードへ書き込み
  clipboard.writeImage(rowPicture)
  writeFileSync(savePath, rowPicture.toPNG())
})

//----------------------------------------------------------------------

// スクリーンショット保存先選択
ipcMain.on('show-select-dir-dialog', () => {
  const result = browser.showFileDialog({
    properties: ['openDirectory']
  })

  if (result && result[0]) {
    store.set('picDir', result[0])
  }
})

// 保存先のパスを取得
ipcMain.handle('get-picture-dir', (): string => getPicDir())

// キャッシュを削除
ipcMain.handle('remove-cache', async (): Promise<void> => {
  const result = browser.showMessageDialog({
    type: 'question',
    buttons: ['はい', 'いいえ'],
    defaultId: 0,
    title: '確認',
    message: 'キャッシュを削除しますか？'
  })

  if (result !== 0) return

  await session.defaultSession.clearCache()

  browser.showMessageDialog({
    type: 'info',
    title: '完了',
    message: '削除が完了しました'
  })
})

// Cookieを削除
ipcMain.handle('remove-cookie', async (): Promise<void> => {
  const result = browser.showMessageDialog({
    type: 'question',
    buttons: ['はい', 'いいえ'],
    defaultId: 1,
    title: '危険！',
    message: '初期化（ログアウト）しますか？',
    detail: 'アカウントが削除されることはありません。'
  })

  if (result !== 0) return

  const cookies = await session.defaultSession.cookies.get({})

  // 全てのCookieを削除
  for (const cookie of cookies) {
    let url = cookie.secure ? 'https://' : 'http://'

    url += cookie.domain?.charAt(0) === '.' ? 'www' : ''
    url += `${cookie.domain || ''}${cookie.path || ''}`

    session.defaultSession.cookies.remove(url, cookie.name)
  }

  // 設定を削除
  store.clear()

  browser.showMessageDialog({
    type: 'info',
    title: '完了',
    message: '初期化が完了しました',
    detail: 'アプリケーションを終了します。'
  })

  app.quit()
})

// 更新確認
ipcMain.handle('check-update', async (): Promise<void> => {
  try {
    const url = await checkUpdate()

    if (!url) {
      browser.showMessageDialog({
        type: 'info',
        title: '通知',
        message: '現在のバージョンは最新版です！'
      })
      return
    }

    showUpdateDialog(url)
  } catch (_e) {
    browser.showMessageDialog({
      type: 'error',
      title: '接続エラー',
      message: '更新の確認に失敗しました'
    })
  }
})

// プライバシーポリシーを開く
ipcMain.on('open-privacy-policy', () => {
  shell.openExternal('https://arrow2nd.github.io/serizawa/')
})

// GitHubを開く
ipcMain.on('open-github', () => {
  shell.openExternal('https://github.com/arrow2nd/serizawa/')
})
