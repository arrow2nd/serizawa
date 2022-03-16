import * as Splashscreen from '@trodi/electron-splashscreen'
import { BrowserView, BrowserWindow, Menu, app, dialog, shell } from 'electron'
import path from 'path'

/**
 * ブラウザウィンドウ
 */
export class Browser {
  private window!: BrowserWindow
  private view!: BrowserView

  /** ゲームの標準解像度 */
  private gameWindowSize = {
    width: 1136,
    height: 640
  }

  /** タイトルバーの高さ */
  private titlebarHeight = 24

  /**
   * メインウィンドウ設定を取得
   * @returns 設定
   */
  private getWindowOption = (): Electron.BrowserWindowConstructorOptions => {
    const windowSize = {
      ...this.gameWindowSize,
      height: this.gameWindowSize.height + this.titlebarHeight
    }

    /**
     * NOTE:
     * windows環境で異なるDPIのディスプレイ間を移動させた際に
     * ウィンドウのサイズが拡大され元のサイズに戻らない為、リサイズ可能にしてる
     */

    return {
      title: 'serizawa',
      ...windowSize,
      minWidth: windowSize.width,
      minHeight: windowSize.height,
      center: true,
      frame: false,
      show: false,
      thickFrame: false,
      webPreferences: {
        devTools: false,
        preload: path.join(__dirname, 'preload.js')
      }
    }
  }

  /**
   * ビューをリサイズ
   * @param bounds 画面サイズ
   */
  private resizeView = (bounds?: Electron.Rectangle) => {
    // 指定なしの場合、現在のサイズを取得
    const { width, height } = bounds || this.window.getBounds()

    // タイトルバーの高さを考慮
    this.view.setBounds({
      x: 0,
      y: this.titlebarHeight,
      width,
      height: height - this.titlebarHeight
    })
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

    // ビューの設定
    this.view = new BrowserView()
    this.showView()
    this.reload()
    this.setViewEventHandlers()

    // ウィンドウの設定
    this.window.loadFile('./build/index.html')
    this.setWindowEventHandlers()

    // 開発者ツール
    // this.window.webContents.openDevTools()
    // this.view.webContents.openDevTools()

    // メニューバーを無効
    Menu.setApplicationMenu(null)

    // 多重起動を防止
    if (!app.requestSingleInstanceLock()) {
      app.quit()
    }
  }

  /**
   * ウィンドウのイベントハンドラを設定
   */
  private setWindowEventHandlers = () => {
    // リサイズ操作にビューのサイズを追従させる
    this.window.on('will-resize', (_e, bounds) => {
      this.resizeView(bounds)
    })

    // 最小化解除時にビューにフォーカスを当てる
    this.window.on('restore', () => {
      this.focusView()
    })

    // ウィンドウにフォーカスが当たったらビューにフォーカスを当てる
    this.window.on('focus', () => {
      this.focusView()
      this.window.flashFrame(false)
    })
  }

  /**
   * 許可されたURLかどうか
   * @param url URL
   * @return 状態
   */
  private isAllowedURL = (url: string): boolean => {
    const safeList = [
      /^https:\/\/(portal|shinycolors)\.enza\.fun/,
      /^https:\/\/.*\.bandainamcoid\.com/,
      /^https:\/\/.*\.line\.me/,
      /^https:\/\/.*\.apple\.com/,
      /^https:\/\/.*\.facebook\.com/,
      /^https:\/\/.*\.twitter\.com/
    ]

    const result = safeList.find((patten) => patten.test(url))

    return typeof result !== 'undefined'
  }

  /**
   * ビューのイベントハンドラを設定
   */
  private setViewEventHandlers = () => {
    // 許可されてないリンクなら標準ブラウザで開く
    this.view.webContents.on('will-navigate', (e, url) => {
      if (this.isAllowedURL(url)) return

      shell.openExternal(url)
      e.preventDefault()
    })

    this.view.webContents.setWindowOpenHandler(({ url }) => {
      if (this.isAllowedURL(url)) return { action: 'allow' }

      shell.openExternal(url)
      return { action: 'deny' }
    })
  }

  /**
   * ビューにフォーカスを当てる
   */
  public focusView = () => {
    this.view.webContents.focus()

    // タスクバーの点滅をオフ
    this.window.flashFrame(false)
  }

  /**
   * ビューを表示
   */
  public showView = () => {
    this.window.setBrowserView(this.view)
    this.resizeView()
  }

  /**
   * ビューを非表示
   */
  public hideView = () => {
    this.window.removeBrowserView(this.view)
  }

  /**
   * 閉じる
   */
  public close = () => {
    this.window.close()
  }

  /**
   * 最小化
   */
  public minimize = () => {
    this.window.minimize()
  }

  /**
   * 最大化切り替え
   */
  public maximize = () => {
    const nextState = !this.window.isFullScreen()
    this.window.setFullScreen(nextState)

    // ビューをリサイズ
    setTimeout(() => this.resizeView(), 250)
  }

  /**
   * 最前面に固定切り替え
   */
  public pinned = () => {
    const nextState = !this.isPinned()
    this.window.setAlwaysOnTop(nextState, 'screen-saver')
  }

  /**
   * 最前面に固定されているか
   * @returns 状態
   */
  public isPinned = (): boolean => {
    return this.window.isAlwaysOnTop()
  }

  /**
   * ミュート切り替え
   */
  public muted = () => {
    const nextState = !this.view.webContents.isAudioMuted()
    this.view.webContents.setAudioMuted(nextState)
  }

  /**
   * 再読み込み
   */
  public reload = () => {
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
    return dialog.showOpenDialogSync(this.window, options)
  }
}
