<p align="center">
  <img src="https://user-images.githubusercontent.com/44780846/143525542-500a4511-4bdd-4339-a951-6f41bb87749e.png" alt="serizawa">
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
   <img src="https://user-images.githubusercontent.com/44780846/130420125-eb430928-9263-45d3-96d3-37c8b8a4efb9.png" alt="スクリーンショット">
</p>

## 機能について

### スクリーンショットの保存＆クリップボードへのコピー

![スクショ](https://user-images.githubusercontent.com/44780846/148945625-9a693052-1f1a-4309-a953-ea472c343e21.gif)

１クリックでスクリーンショットを指定フォルダへ保存できます。

同時にクリップボードへコピーするので、SNS 等での共有が手軽に行えます。

### 非アクティブ状態での音声再生

![最前面固定](https://user-images.githubusercontent.com/44780846/148945600-bac753d9-c777-4991-a286-c1038caa4817.gif)

ウィンドウを最前面に固定することができるので、非アクティブ状態での音声再生が可能です。

モニタが複数あれば、コミュを流しつつ作業といったこともできます。

### 設定

![設定](https://user-images.githubusercontent.com/44780846/148947532-97016a8d-9137-4d7f-8ddd-8cb3041498f4.png)

スクリーンショットの保存先設定のほか、キャッシュの削除・ログアウト等が行えます。

## ダウンロード

[Releases](https://github.com/arrow2nd/serizawa/releases/latest) からお使いの環境にあったファイルをダウンロードしてください。

## 注意事項

- **課金周りについては動作検証を行っておりません**
- シャイニーカラーズ以外のサイトを表示した際の動作については確認しておりません **（enza を含む）**

## 免責事項

当ソフトウェアはファンメイドの **非公式ソフトウェア** です。

株式会社バンダイナムコエンターテインメント様、株式会社バンダイナムコネクサス様、及び、
その他関連企業様とは **一切関係ございません。**

お問い合わせ等はお控えください。

また、当ソフトウェア・ソースコードを使用したことによって発生したいかなる損害について、
製作者は **一切の責任を負いません。**

予め、ご了承ください。

## 実行・ビルド

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
