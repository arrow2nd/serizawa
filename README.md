<p align="center">
  <img src="https://user-images.githubusercontent.com/44780846/158746414-19a6833f-84e8-4f1e-8b58-885f6ffeaea3.png" alt="serizawa">
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
  <a href="https://github.com/arrow2nd/serizawa/releases/latest">
    <img src="https://img.shields.io/github/package-json/v/arrow2nd/serizawa" alt="GitHub package.json version">
  </a>
  <a href="https://github.com/arrow2nd/serizawa/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/arrow2nd/serizawa" alt="GitHub license">
  </a>
</p>

<p align="center">
   <img src="https://user-images.githubusercontent.com/44780846/158744831-41930e18-ce22-47a1-a66e-c2446e999ba0.png" alt="スクリーンショット">
</p>

## 主な機能

### スクリーンショットの保存＆クリップボードへのコピー

![デモ](https://user-images.githubusercontent.com/44780846/158739234-c446ad54-c3f1-4f27-8de1-8e909f4cbc3d.gif)

１クリックでスクリーンショットを指定フォルダへ保存できます。

同時に画像をクリップボードへコピーするので、SNS 等での共有が手軽に行えます。

### 音声の常時再生（非アクティブ化防止）

![デモ](https://user-images.githubusercontent.com/44780846/158740470-cfeea64f-de9c-4876-83fb-ef55ac34f3e1.gif)

ウィンドウを最前面に固定して、非アクティブ状態になることを防止し、音声を常時再生しつづけます。

![デュアルスクリーン](https://user-images.githubusercontent.com/44780846/158741870-e161c4e7-cd27-4751-8dba-40d5bf956ef6.png)

モニタが複数あれば、コミュを流しつつ他の作業を行うこともできます。

### 各種設定

![設定](https://user-images.githubusercontent.com/44780846/158744196-15a70918-41eb-409d-8ea0-f7ed3fe4e687.gif)

スクリーンショットの保存先設定のほか、キャッシュの削除・ログアウト等が行えます。

## 検証済み動作環境

- Windows 10 / 11
- macOS Monterey 12.1~ (Intel)

## ダウンロード

> **ダウンロードする前に 注意事項・免責事項 を必ずご確認ください。**

[Releases](https://github.com/arrow2nd/serizawa/releases/latest) からお使いの環境にあった実行ファイルをダウンロードしてください。

## 注意事項

- **課金については一切サポートしていません**
- **新規でのプレイはサポートしていません。** 必ず事前にアカウントを作成した上でログインしてください
- バンダイナムコ ID 以外でのログインについては検証していません

## 免責事項

本ソフトウェアはファンメイドの **非公式ソフトウェア** です。

株式会社バンダイナムコエンターテインメント、株式会社バンダイナムコネクサス、及びその他関連企業とは **一切関係ございません。**

また、本ソフトウェア・ソースコードを使用したことによって発生したいかなる損害について、
arrow2nd 及びコントリビュータは **一切の責任を負いません。**

## プライバシーポリシー

[こちら](https://arrow2nd.github.io/serizawa/) をご覧ください。

## ビルドと実行

```sh
# いつもの
yarn install

# ビルド & 実行
yarn start

# ビルド
yarn build

# パッケージング
yarn pack:win
yarn pack:mac
yarn pack:linux
```
