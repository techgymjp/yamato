# iOS 版をビルドして App Store に出す手順（Mac での作業）

戦艦大和 天一号作戦の iOS 版は、Android 版と同じ Capacitor で作っています（`ios/` フォルダ）。
コードの準備はできているので、Mac では「ビルドして App Store Connect にアップロードする」作業だけを行います。

- Bundle ID：`jp.techgym.yamato`（Android のパッケージ名と同じ）
- チーム：Team ID `GNM3VTX9YG`（Xcode の設定に入れてあります）。Apple Developer には**個人で登録**しています（App Store の販売元は個人名になります）
- 対応端末：iPhone（横画面固定）。iPad では iPhone 用の画面で動きます
- ホーム画面の名前：日本語の端末では「戦艦大和」、それ以外では「Yamato Ten-Go」
- 広告：AdMob（iOS 用のアプリと広告ユニット）。起動時に「トラッキングの許可」の確認画面が出ます

---

## 0. ブラウザで先に済ませること（ゲームごとに1回）

1. **Apple Developer**（https://developer.apple.com/account ）→「Certificates, Identifiers & Profiles」→「Identifiers」→「＋」→「App IDs」→「App」
   - Description：`Yamato Ten-Go`（英数字。記号や日本語は使えないことがある）
   - Bundle ID：「Explicit」で `jp.techgym.yamato`
   - Capabilities：何もチェックしない
2. **App Store Connect**（https://appstoreconnect.apple.com ）→「アプリ」→「＋」→「新規 App」
   - プラットフォーム：iOS
   - 名前：`戦艦大和 天一号作戦`（App Store 全体で重複不可。使えなければ英語名 `Battleship Yamato: Ten-Go` を試す）
   - プライマリ言語：日本語
   - バンドル ID：1 で登録した `jp.techgym.yamato`
   - SKU：`yamato`（あとから変更不可）
   - ユーザアクセス：アクセス制限なし
3. **AdMob**
   - 「アプリを追加」→ **iOS** →「ストアに掲載されていない」で登録し、**バナー・インタースティシャル・リワード**の広告ユニットを作る
   - アプリ ID（`ca-app-pub-…~…`）と広告ユニット ID 3 つを Claude Code に渡す（`ios/App/App/Info.plist` と `js/ads.js` に入れてもらう）
   - 「プライバシーとメッセージ」→「欧州の規制」のメッセージに、iOS アプリも対象として追加する

> AdMob の iOS 用 ID が入るまでは、iOS 版は Google のテスト用 ID で動きます（本番の広告ユニット ID が空の種類は、App Store 版では出しません）。

---

## 1. Mac の準備（最初の1回だけ）

1. **Xcode** を App Store からインストールする（数十 GB あるので時間がかかります）。インストール後に一度起動し、追加コンポーネントのインストールを済ませる
2. Xcode の「Settings…」→「Accounts」→「＋」で、Apple Developer に登録している Apple ID でサインインする（チームが個人名で表示されれば OK）
3. **Node.js**（LTS 版）を https://nodejs.org/ からインストールする
4. ターミナルでリポジトリを取得する
   ```bash
   cd ~/Desktop   # 置きたい場所（どこでもよい）
   git clone https://github.com/techgymjp/yamato.git
   cd yamato
   npm ci
   ```
   `git` がないと言われたら、表示に従って「コマンドライン・デベロッパツール」をインストールしてから、もう一度実行します。

2回目以降は、`cd yamato` のあと `git pull` と `npm ci` で最新にします。

---

## 2. 自分の iPhone で動作確認する（テスト広告）

```bash
npm run ios:sync    # ゲームのファイルを iOS のプロジェクトにコピー（テスト広告）
npm run ios:open    # Xcode で開く
```

1. iPhone を USB ケーブルで Mac につなぎ、iPhone で「このコンピュータを信頼」を許可する
2. iPhone の「設定」→「プライバシーとセキュリティ」→「デベロッパモード」をオンにする（再起動を求められます。項目がない場合は、Xcode で一度 iPhone を選ぶと表示されます）
3. Xcode の上部で、実行先に自分の iPhone を選ぶ
4. 左の「App」→「Signing & Capabilities」で、「Automatically manage signing」がオン、Team に自分（個人名）のチームが選ばれていることを確認する
5. ▶（Run）を押すと、iPhone にアプリが入って起動する

確認すること：
- 横画面の全画面で表示され、ホーム画面の名前が「戦艦大和」になっている
- 起動時にトラッキングの確認画面が出る
- 画面のドラッグで照準、「ミサイル」で連射、「レールガン」、取舵・面舵が使える
- 音（BGM・効果音）が鳴る。別のアプリに切り替えると一時停止し、音が止まる
- タイトル・結果画面の下に**テスト広告のバナー**、「再び出撃」で**テストの全画面広告**、傾斜 30° で「広告を見て応急修理」（**テストのリワード広告**）が出る
- 結果画面の「シェアする」で iOS の共有メニューが開く

---

## 3. App Store 用にビルドしてアップロードする（本番広告）

```bash
git pull && npm ci
npm run ios:release   # 本番の広告 ID でコピーする（ここが ios:sync と違う）
npm run ios:open
```

1. Xcode の左で「App」→「General」→「Identity」を開き、**Build の番号を前回より大きくする**（初回は 1。アップロードのたびに 2、3…と上げる。同じ番号は二度アップロードできない）。Version はストアに表示されるバージョン（1.0.0）
2. 上部の実行先を「**Any iOS Device (arm64)**」にする
3. 画面最上部のメニューバーの「Product」→「**Archive**」（全画面表示だとメニューバーが隠れるので、マウスを画面の上端に動かす）
4. 終わると Organizer が開くので、「**Distribute App**」→「**App Store Connect**」→「Upload」で進める（途中の確認は既定のまま「Next」でよい。「Xcode Cloud can automate…」は「Remind Me Later」で閉じる）
5. 10〜30 分ほどで、App Store Connect の「TestFlight」タブにビルドが表示される

輸出コンプライアンス（暗号化）の質問は、Info.plist で「独自の暗号化は使っていない」と設定済みなので、聞かれません。

**注意**：`ios:release` でビルドしたアプリは本番の広告が出ます。TestFlight で確認するときも、**本番の広告はタップしない**でください（AdMob のアカウント停止の対象）。Xcode から iPhone に直接入れて試すときは、`npm run ios:sync` でテスト広告に戻してから実行します。

---

## 4. TestFlight で確認する

1. App Store Connect の「TestFlight」→「内部テスト」でグループを作り、自分を追加する
2. iPhone に「TestFlight」アプリを App Store から入れ、届いた招待から「戦艦大和」をインストールする

---

## 5. App Store Connect で審査に出す

「配信」タブ（iOS App のバージョン）で入力します。**バージョンの番号は「1.0.0」**にそろえてください（「1.0」のままだと、アップロードしたビルドが選べません）。

| 項目 | 入力内容 |
| --- | --- |
| スクリーンショット | 「Dynamic Island 搭載 iPhone（中型ディスプレイ）」の欄に、`docs/store/ios/6.3inch/` の 2622 × 1206（横向き）を入れる。日本語（ja-）と英語（en-）各 4 枚。英語は「English (U.S.)」のローカライズを追加して入れる |
| ヘッダ・検索結果 | 「ヘッダと検索結果」に `docs/store/ios/appstore-header-3840x1646.png` と `appstore-search-3840x2560.png`（ヘッダを入れたら検索結果も必ず入れる） |
| プロモーション用テキスト・概要 | Google Play 用の文章（`docs/store/listing.md`）を流用。英語は `docs/store/listing-en.txt` |
| キーワード | 日本語：`戦艦,大和,戦艦大和,天一号作戦,沖縄,海戦,対空戦闘,シューティング,3D,ミリタリー,歴史,太平洋戦争` ／ 英語：`battleship,yamato,warship,navy,ww2,okinawa,anti-aircraft,shooter,3d,history,pacific,naval` |
| サポート URL | https://techgym.jp/ |
| プライバシーポリシー URL（App 情報） | 日本語 https://techgym.jp/privacy-policy/ ／ 英語 https://techgym.jp/privacy-policy-en/ |
| 著作権 | 2026 TECH GYM K.K. |
| カテゴリ（App 情報） | ゲーム（サブカテゴリ：アクション、シミュレーション） |
| コンテンツの配信権（App 情報） | 第三者のコンテンツは「いいえ」（絵・音・曲はすべて自前） |
| ビルド | TestFlight で確認したビルドを選ぶ |
| 年齢制限 | 質問に答える（航空機・艦船を破壊する表現あり、人物・流血の描写なし。第二次世界大戦の史実を題材にしている） |
| App のプライバシー | AdMob が収集するデータを申告する（下記） |
| App Review に関する情報 | ログイン不要。連絡先を入力。メモに「広告（AdMob）を表示し、起動時に App Tracking Transparency の確認を行います。レールガンとミサイルは架空の兵装です」と書いておくとよい |

**App のプライバシー（AdMob を使うアプリの目安）**
Google の「Apple の App Store のデータ開示要件への準備」（AdMob のヘルプ）に、AdMob が収集するデータの一覧があります。必ずそちらを見て最終確認してください。目安は次のとおりです。

- 収集する：ID（デバイス ID）、使用状況データ（広告データ、製品の操作）、診断（クラッシュデータ、パフォーマンスデータ、その他の診断データ）、位置情報（おおよその場所）
- 目的：サードパーティ広告、アナリティクス
- ユーザーに関連付け：しない
- トラッキングに使用：デバイス ID と広告データは「する」

入力が終わったら「審査用に追加」→「審査へ提出」。

---

## 6. 公開後にやること

- AdMob で iOS アプリを App Store のアプリに紐づける（「アプリ」→ iOS の戦艦大和 →「アプリの設定」）
- App Store からインストールして、起動・同意画面・トラッキングの確認・広告を確認する

---

## 7. GitHub Actions

`.github/workflows/ios.yml` が、push のたびに GitHub の Mac 環境で「署名なしでシミュレーター向けにビルドできるか」だけを確認します。
App Store に出すビルドは、これまでどおり手元の Mac の Xcode で作ります。

アップロードまで自動にしたい場合は、JET STRIKE の `docs/IOS_BUILD.md` の 7 章（API キーと配布用証明書を GitHub Secrets に登録する）を済ませてから、Claude Code に「iOS の自動アップロードのワークフローを作って」と頼みます。Organization secrets に登録済みなら、このリポジトリでもそのまま使えます。

---

## つまずきやすいところ

| 症状 | 対処 |
| --- | --- |
| アップロードで「同じビルド番号がすでにある」 | General の Build の番号を上げてから Archive し直す |
| ビルドを選ぼうとしても、アップロードしたビルドが出てこない | App Store Connect のバージョンが「1.0」のまま。「1.0.0」に直して保存する |
| 6.9 インチのスクリーンショットがアップロードできない | 欄が「中型ディスプレイ」。`docs/store/ios/6.3inch/`（2622 × 1206）を使う |
| ヘッダ・検索結果の欄が赤枠になる | ヘッダを入れたら、検索結果の画像（3:2）も入れる |
| 「審査用に追加できません」 | 「コンテンツの配信権」を「いいえ」で保存、「アプリのプライバシー」にプライバシーポリシーの URL を入れる |
| Signing でエラー（チームが選べない、証明書がない） | Xcode の Accounts で Apple ID にサインインし直し、Team を選ぶ。「Automatically manage signing」をオンにする |
| 実行先に iPhone が出ない | ケーブルをつなぎ直し、iPhone で「信頼」を許可。デベロッパモードをオンにする |
| 実行先に「iOS 26.x Not Installed」と出る | 「Get」で iOS のシミュレーターと部品をダウンロードする（8 GB ほど。Archive にも必要） |
| ビルドが古いゲームのまま | `npm run ios:sync`（または `ios:release`）を実行し忘れている。`git pull` してから実行し直す |
| 本番広告とテスト広告の取り違え | App Store 用は必ず `npm run ios:release`。Xcode から実機で試すときは `npm run ios:sync` に戻す |
| App Store の審査で「Xcode が古い」と言われる | Xcode を最新版に更新してから Archive し直す |
