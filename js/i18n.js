// 表示言語（日本語 / 英語）。端末の言語が日本語なら日本語、それ以外は英語。タイトル画面で切り替えも可能
const I18N = (() => {
  const dict = {
    ja: {
      'doc.title': '戦艦大和 天一号作戦',
      'title.date': '昭和二十年四月七日',
      'title.name': '戦艦大和<br> 天一号作戦',
      'title.lead': '昭和20年4月、沖縄へ向かう戦艦大和に、米第58任務部隊の艦載機が雲霞のごとく襲いかかる。米軍機は大和を転覆させるため、<b style="color:#ff8b78">左舷</b>に魚雷と爆弾を集中してくる——。',
      'title.rule': '敵機の猛攻に耐え抜き、沖縄までたどり着け。<br><b style="color:#ff8b78">左への傾斜が30°に達したら横転・沈没</b>で終わり。<br><span style="font-size:15px">傾きはほとんど戻らない。魚雷は撃ち落とすより、転舵してかわせ。</span>',
      'title.controls': '操作',
      'ctl.mouse': 'マウス',
      'ctl.mouseD': '照準。画面をクリックすると、マウスで自由に見回せる（上空・左右・後方もOK）',
      'ctl.click': 'クリック長押し',
      'ctl.clickD': 'ミサイル連射（弾数無制限・照準近くの敵機を自動追尾）',
      'ctl.rclick': '右クリック／',
      'ctl.rclickD': 'レールガン（ゲージ満タンで発射）。照準の方向へ一直線。水平線の敵空母も狙える',
      'ctl.rudderD': '転舵。魚雷の進路は<b style="color:#ff8b78">赤い点線</b>で表示。艦首か艦尾を雷跡に向けると当たりにくい',
      'ctl.bgm': 'BGM オン／オフ',
      'ctl.drag': '画面をドラッグ',
      'ctl.dragD': '照準（上空・左右・後方も見回せる）',
      'ctl.fireT': 'ミサイル',
      'ctl.fireTD': '押している間ミサイル連射。押したまま指をずらすと照準も動く。「自動射撃 ON」なら照準を動かすだけで連射',
      'ctl.beamT': 'レールガン',
      'ctl.beamTD': 'ゲージ満タンで発射。照準の方向へ一直線。水平線の敵空母も狙える',
      'ctl.rudderT': '取舵・面舵',
      'diff.label': '難易度', 'diff.easy': '易', 'diff.normal': '普通', 'diff.hist': '史実',
      'title.start': '出撃',
      'title.note': '※ レールガンとミサイルはゲーム独自の架空兵装です。出撃時刻、艦隊編成、左舷への集中攻撃、14時23分の沈没などは史実に基づいています。',
      'legal.privacy': 'プライバシーポリシー',
      'legal.adSettings': '広告の設定',
      'store.get': 'Android アプリ版', 'store.lead': 'スマホアプリ版もあります',
      'url.privacy': 'https://techgym.jp/privacy-policy/',

      'hud.date': '昭和20年4月7日　曇・低雲',
      'hud.toOkinawa': '沖縄まで',
      'hud.nm': '浬',
      'hud.from': '坊ノ岬沖', 'hud.to': '沖縄',
      'hud.kills': '敵機撃墜',
      'hud.carriers': '敵空母撃沈',
      'hud.torp': '被雷', 'hud.crash': '体当たり', 'hud.bomb': '被弾',
      'hud.lockHint': 'クリックで照準開始（マウスで自由に見回せます）',
      'hud.toCapsize': '横転まで あと {n}°',
      'hud.railgun': 'レールガン',
      'hud.charging': '充電中…',
      'hud.chargingKills': '充電中…（撃墜でも溜まる）',
      'hud.charged': '充電完了',
      'hud.readyTouch': '発射可能！ レールガンボタン',
      'hud.readyKb': '発射可能！ 右クリック / Space',
      'hud.keys': 'マウス 照準／クリック長押し ミサイル連射<br>右クリック・<span class="key">Space</span> レールガン<br><span class="key">A</span><span class="key">D</span> 転舵（雷跡をかわす）<span class="key">M</span> BGM <span class="key">P</span> 一時停止',
      'hud.list': '傾斜 {side} {n}°', 'hud.listL': '左', 'hud.listR': '右',
      'hud.port': '左舷', 'hud.star': '右舷',
      'hud.radar': '電探（黄線＝視線）',
      'hud.torpTag': '雷',
      'hud.carrierTag': '敵空母 {name}',
      'btn.left': '◀ 取舵', 'btn.right': '面舵 ▶', 'btn.fire': 'ミサイル', 'btn.beam': 'レールガン',
      'btn.autoOn': '自動射撃 ON', 'btn.autoOff': '自動射撃 OFF',

      'pause.title': '一時停止', 'pause.resume': '戦闘再開', 'pause.quit': 'タイトルへ',
      'cont.title': '傾斜 30°',
      'cont.lead': '広告を見ると、応急修理で傾斜を 12° まで戻して戦闘を続けられます<br><small>（1 回の出撃につき 1 回まで）</small>',
      'cont.watch': '▶ 広告を見て応急修理', 'cont.giveUp': 'あきらめる',
      'cont.loading': '広告を読み込み中…', 'cont.fail': '広告を読み込めませんでした',

      'res.sunk': '大和 沈没', 'res.win': '沖縄 到達',
      'res.subDate': '昭和20年4月{d}日 {time}',
      'res.subWin': '天一号作戦 成功', 'res.subSunk': '左舷への被害で傾斜30°に達し、左へ横転',
      'st.kills': '敵機撃墜', 'st.carriers': '敵空母撃沈', 'st.torp': '被雷', 'st.torpV': '{n} 本',
      'st.crash': '体当たり', 'st.crashV': '{n} 機', 'st.dodged': '魚雷回避', 'st.dodgedV': '{n} 本',
      'st.bomb': '被弾', 'st.bombV': '{n} 発', 'st.time': '耐えた時間', 'st.timeV': '{m}分{s}秒',
      'st.dist': '残り航程', 'st.distV': '{n} 浬',
      'res.histWin': '史実の大和は沖縄にたどり着けなかった。1945年4月7日14時23分、米軍機延べ約386機の攻撃を受け、左舷に魚雷を集中された大和は左へ横転、弾火薬庫が誘爆して坊ノ岬沖（北緯30度43分 東経128度04分付近）に沈んだ。乗員約3,332名のうち生存者は276名、第二艦隊全体の戦死者は約3,700名にのぼる（数値は諸説あり）。このゲームの結末は、かなわなかった「もしも」である。',
      'res.histSunk': '史実：1945年4月7日14時23分、大和は米第58任務部隊の艦載機延べ約386機の攻撃を受け、左舷に集中した魚雷（10本以上、諸説あり）と多数の爆弾により左へ傾斜。右舷への注水も及ばず横転し、弾火薬庫の誘爆とともに坊ノ岬沖（北緯30度43分 東経128度04分付近）に沈没した。その火柱と煙は鹿児島からも望見されたという。乗員約3,332名のうち生存者は276名。第二艦隊全体の戦死者は約3,700名にのぼる。',
      'res.again': '再び出撃', 'res.view': '艦影を眺める',
      'share.label': '結果をシェア', 'share.copy': 'リンクをコピー', 'share.copied': 'コピーしました',
      'share.more': 'その他…', 'share.app': 'シェアする', 'share.prompt': 'このリンクをコピーしてください',
      'share.title': '戦艦大和 天一号作戦', 'share.dialog': '結果をシェア',
      'share.win': '戦艦大和、沖縄に到達！',
      'share.sunk': '戦艦大和、{n}浬を残して沈没…',
      'share.stats': '敵機撃墜{k}機・空母撃沈{c}隻・被雷{t}本・魚雷回避{d}本',
      'share.tag': '#戦艦大和天一号作戦',

      'msg.start': '昭和20年4月7日 坊ノ岬沖。第一遊撃部隊、沖縄へ向かう',
      'msg.radar': '12:20 電探、敵大編隊を探知。方位090（左舷）',
      'msg.raid': '12:32 敵機来襲！ 対空戦闘！', 'alert.aa': '対空戦闘 用意！',
      'msg.hamakaze': '12:48 駆逐艦「浜風」被雷 轟沈',
      'msg.yahagi': '14:05 軽巡洋艦「矢矧」沈没',
      'msg.1423': '14:23 史実では、この時刻に大和は横転・沈没した——',
      'msg.stillAfloat': 'だが本艦は健在なり。進め、沖縄へ！',
      'msg.sunset': '日没迫る。沖縄まであとわずか',
      'msg.island': '前方に島影！ 沖縄本島を視認',
      'msg.bgmOn': 'BGM オン', 'msg.bgmOff': 'BGM オフ',
      'msg.torpHint': 'ヒント：A・Dで転舵し、艦首か艦尾を雷跡（赤い点線）に向けると魚雷は外れる',
      'msg.torpHintTouch': 'ヒント：取舵・面舵で、艦首か艦尾を雷跡（赤い点線）に向けると魚雷は外れる',
      'msg.diveHint': 'ヒント：急降下爆撃機（オレンジ）は降下前に撃て。真上で落とすと残骸が突っ込んでくる',
      'msg.dodged': '魚雷回避！',
      'msg.railHit': 'レールガン 命中！ 敵機 {n} 機 撃墜',
      'msg.carrierSunk': '敵空母「{name}」撃沈！ 敵機の来襲が減る',
      'msg.railCharging': 'レールガン 充電中（{n}%）',
      'msg.repaired': '応急修理完了！ 傾斜 12° まで復元。戦闘続行！', 'alert.repaired': '応急修理 完了！',
      'alert.torpPort': '左舷 雷跡！ A・Dで転舵せよ', 'alert.torpPortTouch': '左舷 雷跡！ 転舵せよ', 'alert.torpStar': '右舷 雷跡！ 転舵せよ',
      'alert.torpHitPort': '左舷 魚雷命中！ 傾斜増大', 'alert.torpHitStar': '右舷 魚雷命中！',
      'alert.crashPort': '左舷に敵機 体当たり！', 'alert.crashStar': '右舷に敵機 体当たり！',

      'name.Hamakaze': '浜風', 'name.Yahagi': '矢矧',
      'name.Hornet': 'ホーネット', 'name.Bennington': 'ベニントン', 'name.Essex': 'エセックス',
      'name.BunkerHill': 'バンカーヒル', 'name.Yorktown': 'ヨークタウン', 'name.Intrepid': 'イントレピッド',
    },
    en: {
      'doc.title': 'Battleship Yamato: Operation Ten-Go',
      'title.date': 'April 7, 1945',
      'title.name': 'Battleship Yamato<br> Operation Ten-Go',
      'title.lead': 'April 1945. As the battleship Yamato heads for Okinawa, swarms of carrier aircraft from U.S. Task Force 58 descend on her. To capsize the giant, they concentrate their torpedoes and bombs on her <b style="color:#ff8b78">port (left) side</b>...',
      'title.rule': 'Survive the onslaught and reach Okinawa.<br><b style="color:#ff8b78">If the ship lists 30° to port, she capsizes and sinks</b> — game over.<br><span style="font-size:15px">The list barely recovers. Dodge torpedoes by turning rather than trying to shoot them down.</span>',
      'title.controls': 'Controls',
      'ctl.mouse': 'Mouse',
      'ctl.mouseD': 'Aim. Click the screen to look around freely with the mouse (sky, sides and astern)',
      'ctl.click': 'Hold click',
      'ctl.clickD': 'Rapid-fire missiles (unlimited, they home in on planes near the crosshair)',
      'ctl.rclick': 'Right-click / ',
      'ctl.rclickD': 'Railgun (fires when the gauge is full). Shoots straight at the crosshair — it can even hit the enemy carriers on the horizon',
      'ctl.rudderD': 'Steer. Torpedo tracks are shown as <b style="color:#ff8b78">red dotted lines</b>. Turn your bow or stern toward them to make them miss',
      'ctl.bgm': 'Music on / off',
      'ctl.drag': 'Drag the screen',
      'ctl.dragD': 'Aim (look up, to the sides and astern)',
      'ctl.fireT': 'MISSILE',
      'ctl.fireTD': 'Hold to rapid-fire. Slide your finger while holding to aim at the same time. With "AUTO FIRE ON" it fires just by aiming',
      'ctl.beamT': 'RAILGUN',
      'ctl.beamTD': 'Fires when the gauge is full. Shoots straight at the crosshair — it can even hit the enemy carriers on the horizon',
      'ctl.rudderT': 'PORT / STBD',
      'diff.label': 'Difficulty', 'diff.easy': 'Easy', 'diff.normal': 'Normal', 'diff.hist': 'Historical',
      'title.start': 'SORTIE',
      'title.note': '* The railgun and missiles are fictional weapons for this game. The sortie times, fleet composition, the concentrated attack on the port side and the sinking at 14:23 are based on history.',
      'legal.privacy': 'Privacy Policy',
      'legal.adSettings': 'Ad settings',
      'store.get': 'Get the Android app', 'store.lead': 'Also available as a phone app',
      'url.privacy': 'https://techgym.jp/privacy-policy-en/',

      'hud.date': 'April 7, 1945 — overcast, low clouds',
      'hud.toOkinawa': 'To Okinawa',
      'hud.nm': 'nm',
      'hud.from': 'Cape Bōno', 'hud.to': 'Okinawa',
      'hud.kills': 'Planes downed',
      'hud.carriers': 'Carriers sunk',
      'hud.torp': 'Torpedoes', 'hud.crash': 'Crashes', 'hud.bomb': 'Bombs',
      'hud.lockHint': 'Click to start aiming (look around freely with the mouse)',
      'hud.toCapsize': '{n}° until capsizing',
      'hud.railgun': 'Railgun',
      'hud.charging': 'Charging...',
      'hud.chargingKills': 'Charging... (kills charge it too)',
      'hud.charged': 'Charged',
      'hud.readyTouch': 'Ready! Tap RAILGUN',
      'hud.readyKb': 'Ready! Right-click / Space',
      'hud.keys': 'Mouse: aim / Hold click: missiles<br>Right-click · <span class="key">Space</span>: railgun<br><span class="key">A</span><span class="key">D</span> steer (dodge torpedoes) <span class="key">M</span> music <span class="key">P</span> pause',
      'hud.list': 'List {side} {n}°', 'hud.listL': 'port', 'hud.listR': 'stbd',
      'hud.port': 'Port', 'hud.star': 'Stbd',
      'hud.radar': 'Radar (yellow = view)',
      'hud.torpTag': 'T',
      'hud.carrierTag': 'CV {name}',
      'btn.left': '◀ PORT', 'btn.right': 'STBD ▶', 'btn.fire': 'MISSILE', 'btn.beam': 'RAILGUN',
      'btn.autoOn': 'AUTO FIRE ON', 'btn.autoOff': 'AUTO FIRE OFF',

      'pause.title': 'PAUSED', 'pause.resume': 'Resume', 'pause.quit': 'Title',
      'cont.title': 'LIST 30°',
      'cont.lead': 'Watch an ad for emergency repairs: the list goes back to 12° and the battle continues<br><small>(once per sortie)</small>',
      'cont.watch': '▶ Watch ad to repair', 'cont.giveUp': 'Give up',
      'cont.loading': 'Loading ad...', 'cont.fail': 'Could not load the ad',

      'res.sunk': 'YAMATO SUNK', 'res.win': 'OKINAWA REACHED',
      'res.subDate': 'April {d}, 1945 {time}',
      'res.subWin': 'Operation Ten-Go succeeded', 'res.subSunk': 'Port-side damage brought the list to 30° and she capsized to port',
      'st.kills': 'Planes downed', 'st.carriers': 'Carriers sunk', 'st.torp': 'Torpedo hits', 'st.torpV': '{n}',
      'st.crash': 'Plane crashes', 'st.crashV': '{n}', 'st.dodged': 'Torpedoes dodged', 'st.dodgedV': '{n}',
      'st.bomb': 'Bomb hits', 'st.bombV': '{n}', 'st.time': 'Time survived', 'st.timeV': '{m}m {s}s',
      'st.dist': 'Distance left', 'st.distV': '{n} nm',
      'res.histWin': 'The real Yamato never reached Okinawa. At 14:23 on April 7, 1945, after attacks by some 386 U.S. carrier aircraft with torpedoes concentrated on her port side, she capsized to port and sank in a magazine explosion off Cape Bōno, Kagoshima (around 30°43′N 128°04′E). Of her roughly 3,332 crew, only 276 survived, and about 3,700 men of the Second Fleet were killed (figures vary by source). This ending is the "what if" that never came true.',
      'res.histSunk': 'History: at 14:23 on April 7, 1945, Yamato was attacked by some 386 aircraft from U.S. Task Force 58. Torpedoes concentrated on her port side (more than ten, by most accounts) and many bombs made her list to port. Counter-flooding on the starboard side could not save her: she capsized and sank in a magazine explosion off Cape Bōno, Kagoshima (around 30°43′N 128°04′E). The pillar of fire and smoke was said to be visible from Kagoshima. Of her roughly 3,332 crew, only 276 survived; about 3,700 men of the Second Fleet were killed.',
      'res.again': 'Sortie again', 'res.view': 'View the ship',
      'share.label': 'Share your result', 'share.copy': 'Copy link', 'share.copied': 'Copied',
      'share.more': 'More...', 'share.app': 'Share', 'share.prompt': 'Copy this link',
      'share.title': 'Battleship Yamato: Operation Ten-Go', 'share.dialog': 'Share your result',
      'share.win': 'Battleship Yamato reached Okinawa!',
      'share.sunk': 'Battleship Yamato sank {n} nm short of Okinawa...',
      'share.stats': '{k} planes downed, {c} carriers sunk, {t} torpedo hits, {d} torpedoes dodged',
      'share.tag': '#YamatoTenGo',

      'msg.start': 'April 7, 1945, off Cape Bōno. The First Diversion Attack Force sails for Okinawa',
      'msg.radar': '12:20 Radar contact: large enemy formation, bearing 090 (port)',
      'msg.raid': '12:32 Enemy aircraft incoming! Anti-aircraft action!', 'alert.aa': 'AA STATIONS!',
      'msg.hamakaze': '12:48 Destroyer Hamakaze torpedoed and sunk',
      'msg.yahagi': '14:05 Light cruiser Yahagi sunk',
      'msg.1423': '14:23 In history, this is the moment Yamato capsized and sank...',
      'msg.stillAfloat': 'But we are still afloat. Onward to Okinawa!',
      'msg.sunset': 'Sunset approaches. Okinawa is close',
      'msg.island': 'Land ahead! Okinawa in sight',
      'msg.bgmOn': 'Music on', 'msg.bgmOff': 'Music off',
      'msg.torpHint': 'Tip: steer with A/D and point your bow or stern at the torpedo tracks (red dotted lines) to make them miss',
      'msg.torpHintTouch': 'Tip: steer with PORT/STBD and point your bow or stern at the torpedo tracks (red dotted lines) to make them miss',
      'msg.diveHint': 'Tip: shoot dive bombers (orange) before they dive. Down them overhead and the wreck will crash into you',
      'msg.dodged': 'Torpedo dodged!',
      'msg.railHit': 'Railgun hit! {n} planes downed',
      'msg.carrierSunk': 'Enemy carrier {name} sunk! Fewer raids will come',
      'msg.railCharging': 'Railgun charging ({n}%)',
      'msg.repaired': 'Repairs complete! List back to 12°. Keep fighting!', 'alert.repaired': 'REPAIRS COMPLETE!',
      'alert.torpPort': 'TORPEDOES TO PORT! Steer with A/D', 'alert.torpPortTouch': 'TORPEDOES TO PORT! STEER!', 'alert.torpStar': 'TORPEDOES TO STARBOARD! STEER!',
      'alert.torpHitPort': 'TORPEDO HIT, PORT! LIST INCREASING', 'alert.torpHitStar': 'TORPEDO HIT, STARBOARD!',
      'alert.crashPort': 'PLANE CRASHED INTO PORT SIDE!', 'alert.crashStar': 'PLANE CRASHED INTO STARBOARD SIDE!',

      'name.Hamakaze': 'Hamakaze', 'name.Yahagi': 'Yahagi',
      'name.Hornet': 'Hornet', 'name.Bennington': 'Bennington', 'name.Essex': 'Essex',
      'name.BunkerHill': 'Bunker Hill', 'name.Yorktown': 'Yorktown', 'name.Intrepid': 'Intrepid',
    },
  };

  const STORE_KEY = 'yamato_lang';
  let saved = null;
  try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* 保存不可 */ }
  const deviceLang = (navigator.languages && navigator.languages[0]) || navigator.language || 'ja';
  let lang = dict[saved] ? saved : (/^ja\b/i.test(deviceLang) ? 'ja' : 'en');
  const listeners = [];

  // t('hud.toCapsize', { n: 12 }) → '横転まで あと 12°'
  function t(key, vars) {
    let s = dict[lang][key];
    if (s === undefined) s = dict.ja[key];
    if (s === undefined) return key;
    return vars ? s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m)) : s;
  }

  // data-i18n（文字）/ data-i18n-html（タグを含む）/ data-i18n-href（リンク先）の付いた要素を書き換える
  function apply() {
    document.documentElement.lang = lang;
    document.title = t('doc.title');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll('[data-i18n-href]').forEach(el => { el.href = t(el.dataset.i18nHref); });
    document.querySelectorAll('[data-lang]').forEach(el => el.classList.toggle('on', el.dataset.lang === lang));
  }

  function setLang(l) {
    if (!dict[l] || l === lang) return;
    lang = l;
    try { localStorage.setItem(STORE_KEY, l); } catch (e) { /* 保存不可 */ }
    apply();
    listeners.forEach(f => f(l));
  }

  return {
    t, apply, setLang,
    get lang() { return lang; },
    onChange(f) { listeners.push(f); },
  };
})();
