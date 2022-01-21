<p align="center">
  <img src="https://user-images.githubusercontent.com/44780846/150469564-9d01dc39-01c6-4769-bddd-2de78de7bac7.png" alt="serizawa">
</p>

<p align="center">
  <a href="https://shinycolors.idolmaster.jp/">アイドルマスターシャイニーカラーズ</a> の非公式専用ブラウザ
</p>

<p align="center">
  <a href="https://idollist.idolmaster-official.jp/detail/50013">
    <img src="https://img.shields.io/badge/SHINY%20COLORS-%E8%8A%B9%E6%B2%A2%E3%81%82%E3%81%95%E3%81%B2-F30100" alt="芹沢あさひ">
  </a>
  <a href="https://github.com/arrow2nd/serizawa/actions/workflows/build.yaml">
    <img src="https://github.com/arrow2nd/serizawa/actions/workflows/build.yaml/badge.svg" alt="release">
  </a>
  <a href="https://github.com/arrow2nd/serizawa/releases/latest">
    <img src="https://img.shields.io/github/downloads/arrow2nd/serizawa/total" alt="GitHub all releases">
  </a>
  <a href="https://github.com/arrow2nd/serizawa/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/arrow2nd/serizawa" alt="GitHub license">
  </a>
</p>

<p align="center">
   <img src="https://user-images.githubusercontent.com/44780846/150469291-f9037c2a-119a-4fcc-bc74-eb6e26c6f56f.png" alt="スクリーンショット">
</p>

## ❓ 機能について

### スクリーンショットの保存＆クリップボードへのコピー

![スクショ](https://user-images.githubusercontent.com/44780846/148945625-9a693052-1f1a-4309-a953-ea472c343e21.gif)

１クリックでスクリーンショットを指定フォルダへ保存できます。

同時に画像をクリップボードへコピーするので、SNS 等での共有が手軽に行えます。

### 音声の常時再生（非アクティブ化防止）

![最前面固定](https://user-images.githubusercontent.com/44780846/148945600-bac753d9-c777-4991-a286-c1038caa4817.gif)

ウィンドウを最前面に固定して、非アクティブ状態になることを防止できます。

モニタが複数あれば、コミュを流しつつ作業といったことも可能です。

### 各種設定

![設定](https://user-images.githubusercontent.com/44780846/150470748-1979fb26-3aa2-4f28-84c7-8ccf0d9ed9de.png)

スクリーンショットの保存先設定のほか、キャッシュの削除・ログアウト等が行えます。

## 🖥 動作環境

- Windows 10 / 11
- macOS Monterey 12.1~ (Intel)

## 💾 ダウンロード

> **ダウンロードする前に 注意事項・免責事項 を必ずご確認ください。**

[Releases](https://github.com/arrow2nd/serizawa/releases/latest) からお使いの環境にあったファイルをダウンロードしてください。

## ⚠️ 注意事項

- **課金については一切サポートしていません**
- **新規でのプレイはサポートしていません。** 必ず事前にアカウントを作成した上でログインしてください
- バンダイナムコ ID 以外でのログインについては検証していません

## ❗️ 免責事項

当ソフトウェアはファンメイドの **非公式ソフトウェア** です。

株式会社バンダイナムコエンターテインメント様、株式会社バンダイナムコネクサス様、及びその他関連企業様とは **一切関係ございません。**

お問い合わせ等はお控えください。

また、当ソフトウェア・ソースコードを使用したことによって発生したいかなる損害について、
製作者は **一切の責任を負いません。**

予め、ご了承ください。

## 🛠 ビルドと実行

```sh
# いつもの
yarn install

# ビルド&実行
yarn start

# ビルドのみ
yarn build

# パッケージング
yarn pack:(win|mac|linux)
```
