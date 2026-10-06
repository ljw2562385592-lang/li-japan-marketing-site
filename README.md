# RIKOMOKO

日本店舗向け 店舗集客・SNSマーケティング支援。ビルド不要の HTML / CSS / JavaScript サイトです。

## 公開

https://ljw2562385592-lang.github.io/li-japan-marketing-site/

GitHub Pages の main / /(root) から配信。main に push すると再デプロイされます。旧リポジトリ名はインフラ上の名前で、公開ブランドは RIKOMOKO です。

## 現行ファイル

- index.html — 16セクション。課題別入口、支援領域、Demo、Creator、プロセス、料金、知識、FAQ、無料診断と相談。
- growth.css — 米白・黒・深緑の編集的レイアウト、レスポンシブ、軽量アニメーション。
- app.js — メニュー、サービス選択、メール草稿、コピー、プライバシー、動作停止、スクロール表示。
- site-config.js — 公開メール宛先。秘密情報を入れないこと。
- assets/rikomoko-photography.webp — 800px、約132KBの遅延読み込みイラスト。架空のカフェであり顧客実績ではありません。

旧CSS・PNGは保持しますが、新版は読み込みません。外部フォント、外部JavaScript、アクセス解析、広告Cookieは使用しません。

## 商品と問い合わせ

初回の無料店舗診断：1店舗の公開情報を確認し、改善点3つをメールで提案。詳細調査・2〜4ページの資料は別途見積もり。SNS Content Test / Creator PR Test は個別見積もりです。架空の価格・成果保証は掲載していません。

フォームはメール草稿を作成するだけで、サーバー保存・自動送信しません。入力変更で古い草稿を無効化し、送信は利用者のメールアプリで行います。

## ローカル確認

node scripts/serve.mjs で http://127.0.0.1:4173/ を開きます。

検査：node --check app.js、node scripts/check.mjs、node scripts/check-positioning.mjs。

監査・参考分析・検証範囲は GROWTH-REBUILD.md を参照。Lighthouse のスコアは未計測で、目標達成の断定はしていません。
