declare global {
  interface Window {
    api: API;
  }
}

export type API = {
  /**
   * ビューにフォーカスを当てる
   */
  focusView: () => void;

  /**
   * ビューを表示
   */
  showView: () => void;

  /**
   * ビューを非表示
   */
  hideView: () => void;

  /**
   * ビューを再読み込み
   */
  reloadView: () => void;

  /**
   * ウィンドウを閉じる
   */
  close: () => void;

  /**
   * ウィンドウを最小化
   */
  minimize: () => void;

  /**
   * ウィンドウの最大化切り替え
   */
  toggleMaximize: () => void;

  /**
   * ウィンドウのピン止め切り替え
   */
  togglePinned: () => void;

  /**
   * ミュート切り替え
   */
  toggleMute: () => void;

  /**
   * スクリーンショットを撮影
   */
  capture: () => void;

  /**
   * ディレクトリ選択ダイアログを開く
   */
  showSelectDirDialog: () => void;

  /**
   * スクリーンショット保存ディレクトリを取得
   * @returns パス
   */
  getPictureDir: () => Promise<string>;

  /**
   * キャッシュを削除
   */
  removeCache: () => Promise<void>;

  /**
   * Cookieを削除
   */
  removeCookie: () => Promise<void>;

  /**
   * 更新を確認
   */
  checkUpdate: () => Promise<void>;

  /**
   * プライバシーポリシーを開く
   */
  openPrivacyPolicy: () => void;

  /**
   * GitHubを開く
   */
  openGitHub: () => void;
};
