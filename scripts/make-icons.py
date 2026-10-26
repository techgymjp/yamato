"""アイコンと起動画面を作る（Android と iOS）。

assets/ の元画像（1024px のアイコン、2732px の起動画面）を描き、
android/app/src/main/res/ の各サイズを書き出す。
使い方: python3 scripts/make-icons.py
"""
import math
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
ASSETS = os.path.join(ROOT, 'assets')
RES = os.path.join(ROOT, 'android', 'app', 'src', 'main', 'res')
IOS_ASSETS = os.path.join(ROOT, 'ios', 'App', 'App', 'Assets.xcassets')
FONT = '/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf'

NAVY_TOP, NAVY_BOT = (34, 46, 64), (10, 14, 20)
GOLD, GOLD_DARK = (226, 184, 78), (150, 104, 30)
INK = (12, 14, 17)


def gradient(size, top, bot):
    w, h = size
    img = Image.new('RGB', size)
    d = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(1, h - 1)
        d.line([(0, y), (w, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(top, bot)))
    return img


def yamato_silhouette(d, cx, cy, L):
    """側面から見た大和のシルエット（艦首は右）。L は全長のピクセル数。"""
    u = L / 263.0
    X = lambda z: cx + z * u          # z: 艦首 +131 … 艦尾 -132（m）
    Y = lambda y: cy - y * u          # y: 水線 0、上が正（m）
    # 船体（舷弧が艦首へ反り上がる）
    hull = [(X(-132), Y(8.6)), (X(-60), Y(9.6)), (X(30), Y(10)), (X(80), Y(11)), (X(112), Y(13)), (X(131), Y(15.5)),
            (X(124), Y(4)), (X(118), Y(-2)), (X(-118), Y(-2)), (X(-128), Y(2))]
    d.polygon(hull, fill=INK)
    # 主砲塔と砲身
    for z, base, rev in [(82, 11, 1), (60, 15.5, 1), (-72, 10, -1)]:
        d.polygon([(X(z - 8 * rev), Y(base)), (X(z + 6 * rev), Y(base)), (X(z + 7 * rev), Y(base + 4)), (X(z - 7 * rev), Y(base + 5))], fill=INK)
        d.polygon([(X(z + 5 * rev), Y(base + 2.2)), (X(z + 26 * rev), Y(base + 3.2)), (X(z + 26 * rev), Y(base + 4.2)), (X(z + 5 * rev), Y(base + 3.6))], fill=INK)
    # 副砲・上部構造
    d.polygon([(X(-50), Y(10)), (X(46), Y(10)), (X(44), Y(16)), (X(30), Y(16)), (X(28), Y(20.5)), (X(-36), Y(20.5)), (X(-40), Y(16)), (X(-48), Y(16))], fill=INK)
    d.polygon([(X(36), Y(19)), (X(46), Y(19)), (X(47), Y(22)), (X(35), Y(22.5))], fill=INK)
    # 塔型艦橋
    d.polygon([(X(28), Y(20)), (X(12), Y(20)), (X(14), Y(31)), (X(16), Y(40)), (X(15), Y(48)), (X(17.5), Y(53)),
               (X(24), Y(53)), (X(26), Y(48)), (X(24), Y(40)), (X(25), Y(31))], fill=INK)
    d.rectangle([X(10), Y(50.6), X(31), Y(49.2)], fill=INK)   # 測距儀
    # 後方へ傾いた煙突
    d.polygon([(X(4), Y(20)), (X(-14), Y(20)), (X(-22), Y(40)), (X(-8), Y(41))], fill=INK)
    # 後檣
    d.polygon([(X(-24), Y(20)), (X(-26.5), Y(20)), (X(-31), Y(52)), (X(-29.5), Y(52))], fill=INK)
    d.line([(X(-38), Y(42)), (X(-22), Y(43))], fill=INK, width=max(1, round(1.2 * u)))


def emblem(size, with_bg=True, scale=1.0):
    """丸い金の円盤の前に大和の艦影。size は正方形の一辺。"""
    S = size * 2   # 2 倍で描いて縮小（アンチエイリアス）
    img = gradient((S, S), NAVY_TOP, NAVY_BOT).convert('RGBA') if with_bg else Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = S / 2
    r = S * 0.30 * scale
    # 円盤（金のグラデーション風に同心円を重ねる）
    for i in range(60, 0, -1):
        t = i / 60
        col = tuple(round(g + (gd - g) * t ** 2) for g, gd in zip(GOLD, GOLD_DARK)) + (255,)
        rr = r * t
        d.ellipse([c - rr, c - rr * 1 - S * 0.04 * scale, c + rr, c + rr - S * 0.04 * scale], fill=col)
    # 海面
    sea_y = c + S * 0.12 * scale
    d.rectangle([c - S * 0.42 * scale, sea_y, c + S * 0.42 * scale, sea_y + S * 0.016 * scale], fill=(16, 22, 30, 255) if with_bg else (16, 22, 30, 255))
    yamato_silhouette(d, c, sea_y, S * 0.78 * scale)
    # 航跡
    for k in range(5):
        y = sea_y + S * (0.03 + k * 0.022) * scale
        w = S * (0.36 - k * 0.05) * scale
        d.line([(c - w, y), (c + w * 0.4, y)], fill=(210, 220, 230, 140 - k * 25), width=max(1, round(S * 0.006 * scale)))
    return img.resize((size, size), Image.LANCZOS)


def splash(size, dark=False):
    top, bot = ((18, 24, 34), (4, 6, 9)) if dark else (NAVY_TOP, NAVY_BOT)
    img = gradient((size, size), top, bot).convert('RGBA')
    em = emblem(round(size * 0.34), with_bg=False)
    img.alpha_composite(em, (round((size - em.width) / 2), round(size * 0.5 - em.height * 0.62)))
    d = ImageDraw.Draw(img)
    f1 = ImageFont.truetype(FONT, round(size * 0.042))
    f2 = ImageFont.truetype(FONT, round(size * 0.018))
    for text, f, y, col in [('戦艦大和 天一号作戦', f1, size * 0.555, (236, 228, 208)), ('BATTLESHIP YAMATO  OPERATION TEN-GO', f2, size * 0.605, (200, 194, 176)), ('TECH GYM', f2, size * 0.635, (190, 160, 90))]:
        w = d.textlength(text, font=f)
        d.text(((size - w) / 2, y), text, font=f, fill=col)
    return img.convert('RGB')


def cover(img, w, h):
    s = max(w / img.width, h / img.height)
    r = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    x, y = (r.width - w) // 2, (r.height - h) // 2
    return r.crop((x, y, x + w, y + h))


def main():
    os.makedirs(ASSETS, exist_ok=True)
    icon = emblem(1024).convert('RGB')
    icon.save(os.path.join(ASSETS, 'icon-only.png'))
    fg = emblem(1024, with_bg=False, scale=1.05)
    fg.save(os.path.join(ASSETS, 'icon-foreground.png'))
    bg = gradient((1024, 1024), NAVY_TOP, NAVY_BOT)
    bg.save(os.path.join(ASSETS, 'icon-background.png'))
    sp, spd = splash(2732), splash(2732, dark=True)
    sp.save(os.path.join(ASSETS, 'splash.png'))
    spd.save(os.path.join(ASSETS, 'splash-dark.png'))

    # ランチャーアイコン（従来型・丸型・アダプティブ用の前景と背景）
    mask_round = lambda n: (lambda m: (ImageDraw.Draw(m).ellipse([0, 0, n - 1, n - 1], fill=255), m)[1])(Image.new('L', (n, n), 0))
    for dpi, n in {'ldpi': 36, 'mdpi': 48, 'hdpi': 72, 'xhdpi': 96, 'xxhdpi': 144, 'xxxhdpi': 192}.items():
        out = os.path.join(RES, f'mipmap-{dpi}')
        os.makedirs(out, exist_ok=True)
        ic = icon.resize((n, n), Image.LANCZOS)
        ic.save(os.path.join(out, 'ic_launcher.png'))
        rd = Image.new('RGBA', (n, n), (0, 0, 0, 0))
        rd.paste(ic, (0, 0), mask_round(n))
        rd.save(os.path.join(out, 'ic_launcher_round.png'))
        fg.resize((n, n), Image.LANCZOS).save(os.path.join(out, 'ic_launcher_foreground.png'))
        bg.resize((n, n), Image.LANCZOS).save(os.path.join(out, 'ic_launcher_background.png'))

    # 起動画面（縦・横・ダーク）
    sizes = {'ldpi': (240, 320), 'mdpi': (320, 480), 'hdpi': (480, 800), 'xhdpi': (720, 1280), 'xxhdpi': (960, 1600), 'xxxhdpi': (1280, 1920)}
    for dpi, (w, h) in sizes.items():
        for night, src in [('', sp), ('-night', spd)]:
            for orient, (ww, hh) in [('port', (w, h)), ('land', (h, w))]:
                out = os.path.join(RES, f'drawable-{orient}{night}-{dpi}')
                os.makedirs(out, exist_ok=True)
                cover(src, ww, hh).save(os.path.join(out, 'splash.png'))
    cover(sp, 320, 480).save(os.path.join(RES, 'drawable', 'splash.png'))
    cover(spd, 320, 240).save(os.path.join(RES, 'drawable-night', 'splash.png'))

    # iOS：アプリアイコン（1024px・透過なし）と起動画面（2732px を 3 枚）
    if os.path.isdir(IOS_ASSETS):
        icon.save(os.path.join(IOS_ASSETS, 'AppIcon.appiconset', 'AppIcon-512@2x.png'))
        for name in ['splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png']:
            sp.save(os.path.join(IOS_ASSETS, 'Splash.imageset', name))
    print('icons and splash screens written')


if __name__ == '__main__':
    main()
