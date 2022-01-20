import * as Splashscreen from '@trodi/electron-splashscreen'
import { BrowserView, BrowserWindow, Menu, app, dialog } from 'electron'
import path from 'path'

/**
 * ブラウザウィンドウ
 */
export class Browser {
  private window: BrowserWindow | undefined
  private view: BrowserView | undefined

  // ゲームの標準解像度
  private gameWindowSize = {
    width: 1136,
    height: 640
  }

  /**
   * メインウィンドウ設定を取得
   * @returns 設定
   */
  private getWindowOption = (): Electron.BrowserWindowConstructorOptions => {
    const windowSize = {
      ...this.gameWindowSize,
      height: this.gameWindowSize.height + 24
    }

    // windows環境だと上下に1pxずつ隙間ができるので修正
    if (process.platform === 'win32') {
      windowSize.height -= 2
    }

    return {
      title: 'serizawa',
      ...windowSize,
      minWidth: windowSize.width,
      minHeight: windowSize.height,
      center: true,
      frame: false,
      show: false,
      webPreferences: {
        // devTools: false,
        preload: path.join(__dirname, 'preload.js')
      }
    }
  }

  /**
   * ウィンドウを作成
   */
  public create = () => {
    // スプラッシュスクリーン
    this.window = Splashscreen.initSplashScreen({
      windowOpts: this.getWindowOption(),
      templateUrl: `${__dirname}/images/splash.svg`,
      splashScreenOpts: {
        width: 520,
        height: 264,
        center: true,
        transparent: true
      }
    })

    // ブラウザ画面の埋め込み
    this.view = new BrowserView()
    this.showView()

    // ビューの設定
    this.view.webContents.loadURL('https://shinycolors.enza.fun')
    this.view.setBounds({ x: 0, y: 24, ...this.gameWindowSize })
    this.view.setAutoResize({ width: true, height: true })

    // ウィンドウの設定
    this.window.loadFile('./build/index.html')

    // 開発者ツール
    this.window.webContents.openDevTools()
    this.view.webContents.openDevTools()

    // メニューバーを無効
    Menu.setApplicationMenu(null)

    // 多重起動を防止
    if (!app.requestSingleInstanceLock()) {
      app.quit()
    }
  }

  /**
   * ビューを表示
   */
  public showView = () => {
    if (!this.window || !this.view) return
    this.window.setBrowserView(this.view)
  }

  /**
   * ビューを非表示
   */
  public hideView = () => {
    if (!this.window || !this.view) return
    this.window.removeBrowserView(this.view)
  }

  /**
   * 閉じる
   */
  public close = () => {
    if (!this.window) return
    this.window.close()
  }

  /**
   * 最小化
   */
  public minimize = () => {
    if (!this.window) return
    this.window.minimize()
  }

  /**
   * 最大化切り替え
   */
  public maximize = () => {
    if (!this.window) return

    const nextState = !this.window.isFullScreen()
    this.window.setFullScreen(nextState)
  }

  /**
   * 最前面に固定切り替え
   */
  public pinned = () => {
    if (!this.window) return

    const nextState = !this.isPinned()
    this.window.setAlwaysOnTop(nextState, 'screen-saver')
  }

  /**
   * 最前面に固定されているか
   * @returns
   */
  public isPinned = (): boolean => {
    if (!this.window) return false
    return this.window.isAlwaysOnTop()
  }

  /**
   * ミュート切り替え
   */
  public muted = () => {
    if (!this.view) return

    const nextState = !this.view.webContents.isAudioMuted()
    this.view.webContents.setAudioMuted(nextState)
  }

  /**
   * フォーカスを当てる
   */
  public focus = () => {
    if (!this.window || !this.view) return

    this.window.webContents.focus()
    this.view.webContents.focus()
  }

  /**
   * 再読み込み
   */
  public reload = () => {
    if (!this.window || !this.view) return

    this.window.setFullScreen(false)
    this.window.setAlwaysOnTop(false)

    this.view.webContents.loadURL('https://shinycolors.enza.fun')
  }

  /**
   * スクリーンショットを撮影
   * @returns 生の画像データ
   */
  public capture = (): Promise<Electron.NativeImage> | undefined => {
    return this.view?.webContents.capturePage()
  }

  /**
   * メッセージダイアログを表示
   * @param options オプション
   * @returns 結果
   */
  public showMessageWindow = (
    options: Electron.MessageBoxSyncOptions
  ): number => {
    if (!this.window) return -1
    return dialog.showMessageBoxSync(this.window, options)
  }

  /**
   * ダイアログを表示
   * @param options オプション
   * @returns 結果
   */
  public showOpenDialog = (
    options: Electron.OpenDialogSyncOptions
  ): string[] | undefined => {
    if (!this.window) return undefined
    return dialog.showOpenDialogSync(this.window, options)
  }
}
