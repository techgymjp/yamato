# 戦艦大和 天一号作戦

艦長目線で戦艦大和を指揮し、絶え間なく襲いかかる米艦載機の猛攻に耐えて沖縄到達を目指すブラウザゲームです。

`index.html` をブラウザで開くだけで遊べます（Three.js は `js/vendor/` に同梱）。

## 表示言語（日本語 / 英語）

端末（ブラウザ）の言語が日本語なら日本語、それ以外は英語で表示します。タイトル画面の「日本語 / English」で切り替えられ、選んだ言語は次回も使われます。
文言は `js/i18n.js` にまとめています。Android のアプリ名も端末の言語に合わせて切り替わります（日本語「戦艦大和 天一号作戦」/ 英語「Yamato: Ten-Go」）。

## ルール
- 敵機の攻撃に約5分間耐え抜けば **沖縄到達（勝利）**
- 左舷に魚雷・爆弾を受けると左へ傾く。**傾斜30°で横転・沈没（敗北）**
- 傾斜は被弾後10秒間まったく戻らず、その後もごくわずかしか戻らない
- 敵の約半数は雷撃機で、4〜7機の編隊で遠くから魚雷を放ってくる
- 近くで撃墜した敵機の残骸や炎上機が艦に激突すると、魚雷と同じく大きく傾く（急降下爆撃機は降下前に撃て）

## 操作
- **マウス**: 照準。画面をクリックするとマウスで自由に見回せる（Escで解除）
- **クリック長押し**: ミサイル連射（弾数無制限・照準付近の敵機を自動追尾）
- **右クリック / Space**: レールガン（ゲージ満タン時）。艦首から照準の方向へ発射。水平線上の敵空母を沈めると敵機が減る
- **A / D**: 転舵。魚雷の進路は赤い点線で表示される。艦首か艦尾を雷跡に向けると当たりにくい
- **M**: BGM オン／オフ
- **スマホ**: 画面ドラッグで照準。「ミサイル」ボタンを押したまま指をずらしても照準が動く（別の指での照準と同時操作も可）。「自動射撃 ON」なら照準を動かすだけで連射

視点は艦橋最上部の防空指揮所です（史実でも有賀艦長はここで指揮しました）。
結果画面から X・LINE・Facebook へシェアできます（https://techgym.jp/column/claude-code-game-yamato/）。
BGM はゲーム内で合成するオリジナルの管弦楽風楽曲です。

## 史実に基づく要素
- 第二艦隊（大和・矢矧・駆逐艦8隻）の輪形陣、低い雲の下からの来襲
- 左舷に集中した雷撃・爆撃、12:48 浜風沈没、14:05 矢矧沈没、14:23 大和沈没の表示
- 横転後の弾火薬庫誘爆

レールガンとミサイルはゲーム独自の架空兵装です。

## Android 版（Google Play 配布用）

[Capacitor](https://capacitorjs.com/) でゲームのファイルをアプリ内に同梱しているため、ネットにつながっていなくても遊べます（Three.js も `js/vendor/` に同梱）。

- 横画面固定・全画面表示（ステータスバー／ナビゲーションバーを隠す）
- プレイ中は画面が暗くならない
- Android の戻るボタンで一時停止（タイトル・結果画面ではアプリを終了）
- 別のアプリに切り替えると自動で一時停止し、音も止まる
- 「シェアする」は Android の共有メニューから LINE や X などを選べる
- 案内文はタッチ操作のボタン名で表示。タイトル画面にビルド番号とプライバシーポリシーへのリンクを表示

アプリ ID（パッケージ名）は `jp.techgym.yamato` です（Google Play に一度公開すると変更できません）。

### 広告（Google AdMob）

Android アプリでのみ広告を表示します（Web 版には広告は出ません）。

| 広告 | タイミング |
| --- | --- |
| バナー（画面下） | タイトル・結果・一時停止の画面だけ（プレイ中は操作ボタンと重なるので出さない）。表示中は画面の内容をバナーの高さぶん上にずらす |
| インタースティシャル（全画面） | 結果画面で「再び出撃」を押したとき、2 回に 1 回 |
| リワード | 傾斜が 30° に達したときの画面で「広告を見て応急修理」を選ぶと、傾斜 12° まで戻して戦闘続行（1 回の出撃につき 1 回まで、10 秒で自動的に沈没） |

- EU・英国など同意が必要な地域では、初回起動時に Google の同意確認画面が出ます。その地域では、タイトル画面の「広告の設定」から同意内容をいつでも変更できます。
- 広告ユニット ID は `js/ads.js`、AdMob のアプリ ID は `android/app/src/main/res/values/strings.xml` にあります。
  アプリ ID・バナー・インタースティシャル・リワードとも本番の ID を設定済みです（ID を空にした種類は、Google Play 版では出しません）。
- 動作確認用 APK（Release の `yamato.apk`）は常に **Google のテスト広告** を表示します。自分でタップしても問題ありません。
- Google Play 用の .aab をビルドするときだけ、CI が `ADMOB_MODE=production` で本番の広告に切り替えます（`scripts/build-web.js` が `js/ads-config.js` を書き換えます）。
- 本番の広告を自分でタップするとアカウント停止の対象になるので注意してください。

### ビルド方法

**GitHub Actions（自動）**: Web 版や `android/` を変更して push すると、`.github/workflows/android.yml` が動作確認用の APK を作ります。
既定ブランチのビルドは GitHub の Release（`android-latest`）に自動で載るので、Android 端末で次の URL を開くか QR コードを読み取るだけで最新版をダウンロードできます。

https://github.com/techgymjp/yamato/releases/latest/download/yamato.apk

<img src="docs/apk-qr.png" alt="APK ダウンロード用 QR コード" width="180">

ダウンロードした `yamato.apk` を開き、「提供元不明のアプリ」のインストールを許可するとインストールできます。
動作確認用の署名鍵（`android/app/debug.keystore`）はリポジトリで固定しているので、新しいビルドもアンインストールせずに上書きインストールできます。
（Release に載る APK はデバッグ版です。Google Play には下の手順で作る署名済み .aab を使います）

**手元の PC（Android Studio）**:

```bash
npm ci
npm run android:sync   # Web ファイルを www/ にまとめて Android プロジェクトへコピー
npm run android:open   # Android Studio で開く
```

アイコンと起動画面は `python3 scripts/make-icons.py` で `assets/` の元画像と Android の各サイズを作り直せます。

### Google Play へ公開する手順

1. GitHub のリポジトリの Settings → Secrets and variables → Actions に次の 4 つを登録する（アップロード鍵は JET STRIKE と同じものを使い回せます）
   | 名前 | 内容 |
   | --- | --- |
   | `ANDROID_KEYSTORE_BASE64` | `base64 -i upload.jks \| tr -d '\n' \| pbcopy` でコピーした文字列 |
   | `ANDROID_KEYSTORE_PASSWORD` | キーストアのパスワード |
   | `ANDROID_KEY_ALIAS` | `upload` |
   | `ANDROID_KEY_PASSWORD` | 鍵のパスワード |
2. Actions の「Android build」を実行すると、署名済みの `yamato-release-aab`（.aab）ができる
3. [Google Play Console](https://play.google.com/console) でアプリを作成し、.aab をアップロードする（広告を含む・広告 ID を使用する、の申告が必要）

バージョン番号（versionCode）は Actions の実行回数が自動で使われます。表示用のバージョン名は `package.json` の `version` です。

## ライセンス

All rights reserved. 著作権はテックジム株式会社に帰属します。無断での複製・改変・再配布、Web サイトやアプリとしての公開を禁止します。ただし、テックジムの受講生が学習目的で複製・改変することは許可します（商用利用は不可。詳しくは `LICENSE`）。
同梱の Three.js は MIT License です（`js/vendor/THREE_LICENSE`）。

## ファイル構成

```
index.html               ゲーム本体（画面構成・3D モデル・ゲームロジック・BGM）
js/vendor/three.min.js   Three.js r128（MIT License）
js/i18n.js               表示言語（日本語 / 英語）の文言
js/ads.js                Google AdMob 広告（Android アプリのみ）
js/ads-config.js         広告のモード（test / production）
js/build-info.js         タイトル画面に出すバージョン
scripts/build-web.js     www/ にアプリ同梱用のファイルをまとめる
scripts/make-icons.py    アイコンと起動画面を作る
assets/                  アイコン・起動画面の元画像
android/                 Android プロジェクト（Capacitor）
capacitor.config.json    Capacitor の設定（appId: jp.techgym.yamato）
```
