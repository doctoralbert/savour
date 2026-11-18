#!/usr/bin/env python3
# Afbeeldingen bij de blogartikelen, in dezelfde huisstijl als de rekenvoorbeelden bij "Foodcost berekenen":
# licht papier, donkere vlakken met goud, Playfair Display en DM Sans, en het SAVOUR-logo onderin.
#
# Wat er op elke afbeelding staat, staat in tools/blog-beelden/<artikel>.json (de map in site/blog), in vijf
# talen (nl, en, de, es, fr); "after" is de Nederlandse kop waaronder de afbeelding komt. Alles komt uit de tekst van het artikel zelf: geen nieuwe cijfers, geen nieuwe beloftes. Een getal op een
# afbeelding heeft dezelfde bron als in het artikel.
# tools/build-seo.mjs zet elke afbeelding in het artikel, onder de sectie uit "after" (de Nederlandse kop).
#
# Draaien: py -3 tools/blog-beelden.py [artikel ...]   (nodig: Python 3 met Pillow)
# Uitkomst: assets/blog/<artikel>/<naam>-<taal>.png (1600 x 900). Daarna: node tools/build-seo.mjs
import importlib.util
import json
import os
import sys

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location('blog_afbeeldingen', os.path.join(HERE, 'blog-afbeeldingen.py'))
B = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(B)

S = B.S
LANGS = B.LANGS
ROOT = B.ROOT
INK, INK2, INK3, LINE = B.INK, B.INK2, B.INK3, B.LINE
GOLD, GOLD_DARK, NIGHT, CREAM, MUTED = B.GOLD, B.GOLD_DARK, B.NIGHT, B.CREAM, B.MUTED
PAPER, PAPER2 = B.PAPER, B.PAPER2
WHITE = (255, 255, 255)
RED = (156, 74, 58)
serif, sans, sansb = B.serif, B.sans, B.sansb

W, H, FOOT = 1600, 900, 120
X0, X1 = 90, W - 90  # linker- en rechterkant van de inhoud
TOP, BOTTOM = 250, 740  # ruimte tussen ondertitel en voet


def L(v, li):
    """Tekst in de taal li: een lijst van vijf, of één tekst voor alle talen."""
    if isinstance(v, list) and len(v) == 5 and all(isinstance(x, str) for x in v):
        return v[li]
    return v


def tr(x, li):
    """Vertaalt een heel blok: elke lijst van vijf teksten wordt de tekst in taal li."""
    if isinstance(x, list):
        if len(x) == 5 and all(isinstance(y, str) for y in x):
            return x[li]
        return [tr(y, li) for y in x]
    if isinstance(x, dict):
        return {k: tr(v, li) for k, v in x.items()}
    return x


def P(v):
    return int(round(v * S))


def fit(d, text, fn, size, maxw, minsize=12):
    while size > minsize and d.textlength(text, font=fn(size)) > maxw * S:
        size -= 1
    return fn(size), size


def wrap_fit(d, text, fn, size, maxw, maxlines, minsize=14):
    """Grootste lettergrootte waarbij de tekst in maxlines regels past."""
    while True:
        lines = []
        for part in text.split('\n'):
            lines += B.wrap(d, part, fn(size), maxw) or ['']
        if len(lines) <= maxlines or size <= minsize:
            return lines, fn(size), size
        size -= 1


def text_block(d, x, y, text, fn, size, maxw, maxlines, fill, lh=1.32, anchor='la', minsize=14, draw=True):
    lines, f, sz = wrap_fit(d, text, fn, size, maxw, maxlines, minsize)
    if draw:
        for i, l in enumerate(lines):
            d.text((P(x), P(y + i * sz * lh)), l, font=f, fill=fill, anchor=anchor)
    return len(lines) * sz * lh


def rbox(d, x1, y1, x2, y2, r=18, fill=None, outline=None, width=2):
    d.rounded_rectangle([P(x1), P(y1), P(x2), P(y2)], radius=P(r), fill=fill, outline=outline, width=P(width) if outline else 0)


def base(title, sub):
    im = Image.new('RGB', (P(W), P(H)), PAPER)
    d = ImageDraw.Draw(im)
    f, size = fit(d, title, serif, 54, W - 180, 34)
    d.text((P(X0), P(70)), title, font=f, fill=INK)
    d.rectangle([P(X0), P(150), P(170), P(155)], fill=GOLD_DARK)
    if sub:
        f2, _ = fit(d, sub, sans, 26, W - 180, 18)
        d.text((P(X0), P(175)), sub, font=f2, fill=INK2)
    d.rectangle([0, P(H - FOOT), P(W), P(H)], fill=NIGHT)
    cy = H - FOOT / 2
    B.logo(d, X0, cy - 4, 34, CREAM, GOLD)
    d.text((P(X1), P(cy)), 'savour.page', font=sans(24), fill=GOLD, anchor='rm')
    return im, d


def note(d, text, y=None):
    if text:
        f, _ = fit(d, text, sans, 20, W - 180, 14)
        d.text((P(X0), P(y or BOTTOM - 4)), text, font=f, fill=INK3, anchor='ls')


def check_mark(d, x, y, s, col):
    d.line([(P(x), P(y)), (P(x + s * 0.35), P(y + s * 0.35)), (P(x + s), P(y - s * 0.45))], fill=col, width=P(3.2), joint='curve')


def cross_mark(d, x, y, s, col):
    d.line([(P(x), P(y - s / 2)), (P(x + s), P(y + s / 2))], fill=col, width=P(3))
    d.line([(P(x), P(y + s / 2)), (P(x + s), P(y - s / 2))], fill=col, width=P(3))


def arrow(d, x1, y, x2, col=GOLD_DARK):
    d.line([(P(x1), P(y)), (P(x2), P(y))], fill=col, width=P(3))
    d.line([(P(x2 - 10), P(y - 9)), (P(x2), P(y)), (P(x2 - 10), P(y + 9))], fill=col, width=P(3), joint='curve')


# ------------------------------------------------------------------------------------------- sjablonen
def t_flow(d, s):
    """Stappen naast elkaar: [[kop, tekst], ...]; de laatste stap donker als "end" waar is."""
    steps = s['steps']
    n = len(steps)
    gap = 44
    cw = (X1 - X0 - gap * (n - 1)) / n
    hs, ts = (34, 24) if n <= 3 else (31, 22) if n == 4 else (28, 21)

    def content(x, y, head, text, dark, draw):
        hh = text_block(d, x + 28, y + 96, head, serif, hs, cw - 52, 3, GOLD if dark else INK, 1.18, minsize=20, draw=draw)
        th = text_block(d, x + 28, y + 110 + hh, text, sans, ts, cw - 52, 8, MUTED if dark else INK2, 1.38, minsize=15, draw=draw)
        return 110 + hh + th + 34

    area_top, area_bot = TOP + 10, BOTTOM - (44 if s.get('note') else 6)
    ch = max(content(0, 0, h, t, False, False) for h, t in steps)
    ch = min(max(ch, 250), area_bot - area_top)
    y1 = area_top + (area_bot - area_top - ch) / 2
    for i, (head, text) in enumerate(steps):
        x = X0 + i * (cw + gap)
        dark = s.get('end') and i == n - 1
        rbox(d, x, y1, x + cw, y1 + ch, 20, fill=NIGHT if dark else WHITE, outline=None if dark else LINE)
        cx = x + 50
        d.ellipse([P(cx - 24), P(y1 + 48 - 24), P(cx + 24), P(y1 + 48 + 24)], fill=GOLD if dark else GOLD_DARK)
        d.text((P(cx), P(y1 + 49)), str(i + 1), font=sansb(23), fill=NIGHT if dark else WHITE, anchor='mm')
        content(x, y1, head, text, dark, True)
        if i < n - 1:
            arrow(d, x + cw + 8, y1 + ch / 2, x + cw + gap - 8)
    note(d, s.get('note'))


def t_versus(d, s):
    """Twee kanten: links (licht, kruisjes) en rechts (donker, vinkjes)."""
    y1, y2 = TOP + 20, BOTTOM - (40 if s.get('note') else 10)
    gap = 50
    cw = (X1 - X0 - gap) / 2
    for side, (head, items) in enumerate([s['left'], s['right']]):
        x = X0 + side * (cw + gap)
        dark = side == 1
        rbox(d, x, y1, x + cw, y2, 22, fill=NIGHT if dark else WHITE, outline=None if dark else LINE)
        f, _ = fit(d, head, serif, 36, cw - 80, 22)
        d.text((P(x + 40), P(y1 + 62)), head, font=f, fill=GOLD if dark else INK, anchor='lm')
        d.rectangle([P(x + 40), P(y1 + 98), P(x + 90), P(y1 + 101)], fill=GOLD if dark else LINE)
        yy = y1 + 150
        for j, it in enumerate(items):
            if dark:
                check_mark(d, x + 42, yy + 2, 18, GOLD)
            else:
                cross_mark(d, x + 42, yy + 2, 16, INK3)
            yy += text_block(d, x + 82, yy - 16, it, sans, 27, cw - 120, 2, CREAM if dark else INK2, 1.28, minsize=17) + 30
    if 'mid' in s:
        cx = X0 + cw + gap / 2
        d.ellipse([P(cx - 30), P((y1 + y2) / 2 - 30), P(cx + 30), P((y1 + y2) / 2 + 30)], fill=GOLD)
        arrow(d, cx - 14, (y1 + y2) / 2, cx + 14, NIGHT)
    note(d, s.get('note'))


def t_hbars(d, s):
    """Liggende staven: rows = [[label, getal, tekst bij de staaf]]; negatief kan (signed)."""
    rows = s['rows']
    n = len(rows)
    side = s.get('side')  # donker vak rechts: [groot, klein, klein2]
    right = X1 - (330 if side else 0)
    lw = s.get('labelw', 430)
    bx0 = X0 + lw
    vals = [r[1] for r in rows]
    vmax = s.get('max') or max(abs(v) for v in vals)
    signed = any(v < 0 for v in vals)
    room = right - bx0 - 150
    zero = bx0 + (room * 0.42 if signed else 0)
    scale = (room * (0.58 if signed else 1)) / vmax if signed else room / vmax
    avail = BOTTOM - 60 - (TOP + 20)
    rh = min(90 if n <= 3 else 66, avail / n)
    y = TOP + 20 + (avail - n * rh) / 2
    hl = s.get('highlight', [])
    for i, (lab, v, shown) in enumerate(rows):
        cy = y + i * rh + rh / 2
        f, _ = fit(d, lab, sans, 25, lw - 24, 15)
        d.text((P(X0), P(cy)), lab, font=f, fill=INK, anchor='lm')
        w = abs(v) * scale
        bh = min(30, rh - 18)
        col = GOLD_DARK if (i in hl or (not hl and v == max(vals))) else GOLD
        if v >= 0:
            rbox(d, zero, cy - bh / 2, zero + max(w, 6), cy + bh / 2, 8, fill=col)
            d.text((P(zero + max(w, 6) + 16), P(cy)), shown, font=sansb(25), fill=INK, anchor='lm')
        else:
            rbox(d, zero - w, cy - bh / 2, zero, cy + bh / 2, 8, fill=INK3)
            d.text((P(zero - w - 16), P(cy)), shown, font=sansb(25), fill=INK, anchor='rm')
    if signed:
        d.line([(P(zero), P(y - 4)), (P(zero), P(y + n * rh + 4))], fill=INK3, width=P(2))
    if side:
        cx1 = X1 - 300
        rbox(d, cx1, TOP + 20, X1, BOTTOM - 70, 22, fill=NIGHT)
        mx = (cx1 + X1) / 2
        f, _ = fit(d, side[0], serif, 66, 236, 30)
        d.text((P(mx), P(TOP + 150)), side[0], font=f, fill=GOLD, anchor='mm')
        text_block(d, mx, TOP + 220, side[1], sans, 24, 250, 3, CREAM, 1.3, anchor='ma', minsize=16)
        if len(side) > 2:
            text_block(d, mx, BOTTOM - 170, side[2], sans, 20, 250, 3, MUTED, 1.3, anchor='ma', minsize=14)
    note(d, s.get('note'))


def t_stack(d, s):
    """Eén liggende balk opgedeeld in delen: parts = [[label, getal, tekst]]; legenda eronder."""
    parts = s['parts']
    total = sum(p[1] for p in parts)
    y1, y2 = TOP + 60, TOP + 160
    x = X0
    cols = [GOLD_DARK, GOLD, (200, 170, 110), INK2, INK3, (160, 150, 130), NIGHT, (110, 90, 50)]
    if s.get('colors'):
        cols = [tuple(c) for c in s['colors']]
    width = X1 - X0
    for i, (lab, v, shown) in enumerate(parts):
        w = width * v / total
        d.rectangle([P(x), P(y1), P(x + w - 3), P(y2)], fill=cols[i % len(cols)])
        if w > 90:
            dark_bg = cols[i % len(cols)] in (GOLD_DARK, INK2, INK3, NIGHT, (110, 90, 50), (160, 150, 130))
            d.text((P(x + w / 2), P((y1 + y2) / 2)), shown, font=sansb(26 if w > 130 else 21), fill=WHITE if dark_bg else INK, anchor='mm')
        x += w
    # legenda in kolommen
    ncol = s.get('legend_cols', 4)
    lw = (X1 - X0) / ncol
    for i, (lab, v, shown) in enumerate(parts):
        r, c = divmod(i, ncol)
        lx, ly = X0 + c * lw, y2 + 70 + r * 64
        d.rounded_rectangle([P(lx), P(ly - 12), P(lx + 24), P(ly + 12)], radius=P(5), fill=cols[i % len(cols)])
        f, _ = fit(d, lab, sans, 24, lw - 150, 15)
        d.text((P(lx + 38), P(ly)), lab, font=f, fill=INK, anchor='lm')
        d.text((P(lx + lw - 30), P(ly)), shown, font=sansb(24), fill=INK, anchor='rm')
    if s.get('callout'):
        big, txt = s['callout']
        yy = BOTTOM - 150
        rbox(d, X0, yy, X1, BOTTOM - 46, 18, fill=NIGHT)
        d.text((P(X0 + 40), P(yy + 52)), big, font=serif(50), fill=GOLD, anchor='lm')
        bw = d.textlength(big, font=serif(50)) / S
        text_block(d, X0 + 70 + bw, yy + 34, txt, sans, 24, X1 - X0 - 120 - bw, 2, CREAM, 1.3, minsize=16)
    note(d, s.get('note'))


def t_table(d, s):
    """Tabel: head = [...], rows = [[...]], cols = breedte per kolom (verhouding)."""
    head, rows = s['head'], s['rows']
    ws = s.get('cols') or [1] * len(head)
    tot = sum(ws)
    xs = [X0]
    for w in ws:
        xs.append(xs[-1] + (X1 - X0) * w / tot)
    y = TOP + 10
    n = len(rows)
    avail = BOTTOM - y - (44 if s.get('note') else 6)
    rh = min(64, avail / (n + 1))
    fs = s.get('size', 24 if rh >= 56 else 21)
    rbox(d, X0, y, X1, y + rh, 12, fill=NIGHT)
    for j, h in enumerate(head):
        f, _ = fit(d, h, sansb, fs - 2, xs[j + 1] - xs[j] - 36, 13)
        d.text((P(xs[j] + 24), P(y + rh / 2)), h, font=f, fill=GOLD, anchor='lm')
    hl = s.get('highlight', [])
    for i, row in enumerate(rows):
        yy = y + (i + 1) * rh
        if i in hl:
            d.rectangle([P(X0), P(yy), P(X1), P(yy + rh)], fill=PAPER2)
        d.line([(P(X0), P(yy + rh)), (P(X1), P(yy + rh))], fill=LINE, width=P(1.5))
        for j, cell in enumerate(row):
            fn = sansb if (j == 0 or (s.get('boldcol') == j)) else sans
            f, _ = fit(d, cell, fn, fs, xs[j + 1] - xs[j] - 36, 12)
            d.text((P(xs[j] + 24), P(yy + rh / 2)), cell, font=f, fill=INK if j == 0 else INK2, anchor='lm')
    note(d, s.get('note'))


def t_calc(d, s):
    """Rekensom in vakken met tekens ertussen, en eronder een uitgewerkt voorbeeld."""
    boxes, ops = s['boxes'], s['ops']
    n = len(boxes)
    opw = 70
    widths = [b[3] if len(b) > 3 else 1 for b in boxes]
    unit = (X1 - X0 - opw * (n - 1)) / sum(widths)
    x, y, bh = X0, TOP + 20, 170
    for i, b in enumerate(boxes):
        label, value, dark = b[0], b[1], b[2]
        w = unit * widths[i]
        rbox(d, x, y, x + w, y + bh, 18, fill=NIGHT if dark else WHITE, outline=None if dark else LINE)
        f, _ = fit(d, value, serif, 46, w - 30, 20)
        d.text((P(x + w / 2), P(y + bh * 0.4)), value, font=f, fill=GOLD if dark else INK, anchor='mm')
        if label:
            f, _ = fit(d, label, sans, 22, w - 24, 13)
            d.text((P(x + w / 2), P(y + bh * 0.75)), label, font=f, fill=CREAM if dark else INK3, anchor='mm')
        x += w
        if i < n - 1:
            d.text((P(x + opw / 2), P(y + bh / 2)), ops[i], font=serif(54), fill=GOLD_DARK, anchor='mm')
            x += opw
    if s.get('panel'):
        head, lines = s['panel'][0], s['panel'][1:]
        py = y + bh + 50
        rbox(d, X0, py, X1, BOTTOM - 6, 18, fill=PAPER2)
        d.text((P(X0 + 40), P(py + 40)), head, font=sansb(20), fill=GOLD_DARK)
        yy = py + 84
        for k, ln in enumerate(lines):
            f, sz = fit(d, ln, serif if k == 0 else sans, 44 if k == 0 else 24, X1 - X0 - 80, 16)
            d.text((P(X0 + 40), P(yy)), ln, font=f, fill=INK if k == 0 else INK2)
            yy += sz * 1.9


def t_cards(d, s):
    """Kaarten naast elkaar met pictogram: items = [{icon, head, sub, lines}]."""
    items = s['items']
    n = len(items)
    gap = 34
    cw = (X1 - X0 - gap * (n - 1)) / n
    area_top, area_bot = TOP + 10, BOTTOM - (44 if s.get('note') else 6)

    def body(x, y1, it, dark, draw):
        hy = y1 + (150 if it.get('icon') else 44)
        hh = text_block(d, x + 32, hy, it['head'], serif, 34, cw - 64, 2, GOLD if dark else INK, 1.15, minsize=22, draw=draw)
        yy = hy + hh + 12
        if it.get('sub'):
            yy += text_block(d, x + 32, yy, it['sub'], sansb, 20, cw - 64, 2, GOLD if dark else GOLD_DARK, 1.3, minsize=14, draw=draw) + 10
        for ln in it.get('lines', []):
            if draw:
                d.ellipse([P(x + 34), P(yy + 12), P(x + 42), P(yy + 20)], fill=GOLD if dark else GOLD_DARK)
            yy += text_block(d, x + 54, yy, ln, sans, 23, cw - 90, 4, CREAM if dark else INK2, 1.32, minsize=15, draw=draw) + 12
        return yy - y1 + 26

    ch = max(body(0, 0, it, False, False) for it in items)
    ch = min(max(ch, 260), area_bot - area_top)
    y1 = area_top + (area_bot - area_top - ch) / 2
    y2 = y1 + ch
    for i, it in enumerate(items):
        x = X0 + i * (cw + gap)
        dark = it.get('dark')
        rbox(d, x, y1, x + cw, y2, 22, fill=NIGHT if dark else WHITE, outline=None if dark else LINE)
        if it.get('icon'):
            cx, cy = x + 66, y1 + 72
            d.ellipse([P(cx - 42), P(cy - 42), P(cx + 42), P(cy + 42)], fill=(14, 20, 20) if dark else PAPER2)
            B.icon(d, it['icon'], cx, cy, 26, GOLD if dark else GOLD_DARK)
        body(x, y1, it, dark, True)
    note(d, s.get('note'))


def t_tiles(d, s):
    """Grote getallen: items = [[getal, uitleg]] (+ optioneel donker)."""
    items = s['items']
    n = len(items)
    gap = 34
    cw = (X1 - X0 - gap * (n - 1)) / n
    area_top, area_bot = TOP + 10, BOTTOM - (50 if s.get('note') else 10)
    th = max(text_block(d, 0, 0, it[1], sans, 25, cw - 60, 5, INK, 1.35, minsize=16, draw=False) for it in items)
    ch = min(area_bot - area_top, 225 + th + 50)
    y1 = area_top + (area_bot - area_top - ch) / 2
    y2 = y1 + ch
    for i, it in enumerate(items):
        big, txt = it[0], it[1]
        dark = len(it) > 2 and it[2]
        x = X0 + i * (cw + gap)
        rbox(d, x, y1, x + cw, y2, 22, fill=NIGHT if dark else WHITE, outline=None if dark else LINE)
        f, sz = fit(d, big, serif, 84, cw - 60, 30)
        d.text((P(x + cw / 2), P(y1 + 120)), big, font=f, fill=GOLD if dark else INK, anchor='mm')
        d.rectangle([P(x + cw / 2 - 25), P(y1 + 190), P(x + cw / 2 + 25), P(y1 + 193)], fill=GOLD if dark else GOLD_DARK)
        text_block(d, x + cw / 2, y1 + 225, txt, sans, 25, cw - 60, 5, CREAM if dark else INK2, 1.35, anchor='ma', minsize=16)
    note(d, s.get('note'))


def t_folders(d, s):
    """Mappen naast elkaar: cols = [[naam, [recepten]]]."""
    cols = s['cols']
    n = len(cols)
    gap = 28
    cw = (X1 - X0 - gap * (n - 1)) / n
    area_top, area_bot = TOP + 40, BOTTOM - (44 if s.get('note') else 6)

    def colh(col):
        h = 40 + text_block(d, 0, 0, col[0], serif, 30, cw - 52, 2, INK, 1.15, minsize=19, draw=False)
        if len(col) > 2 and col[2]:
            h += text_block(d, 0, 0, col[2], sans, 19, cw - 52, 3, INK, 1.3, minsize=13, draw=False) + 6
        h += 24
        for it in col[1]:
            h += text_block(d, 0, 0, it, sans, 22, cw - 84, 2, INK, 1.28, minsize=14, draw=False) + 12
        return h + 30

    ch = min(max(max(colh(c) for c in cols), 240), area_bot - area_top)
    y1 = area_top + (area_bot - area_top - ch) / 2
    y2 = y1 + ch
    for i, col in enumerate(cols):
        name, items = col[0], col[1]
        sub = col[2] if len(col) > 2 else ''
        dark = s.get('dark') == i
        x = X0 + i * (cw + gap)
        tabw = min(130, cw * 0.5)
        fill = NIGHT if dark else WHITE
        d.rounded_rectangle([P(x), P(y1 - 22), P(x + tabw), P(y1 + 12)], radius=P(10), fill=GOLD_DARK if not dark else GOLD)
        rbox(d, x, y1, x + cw, y2, 18, fill=fill, outline=None if dark else LINE)
        hh = text_block(d, x + 26, y1 + 30, name, serif, 30, cw - 52, 2, GOLD if dark else INK, 1.15, minsize=19)
        yy = y1 + 40 + hh
        if sub:
            yy += text_block(d, x + 26, yy, sub, sans, 19, cw - 52, 3, MUTED if dark else INK3, 1.3, minsize=13) + 6
        d.line([(P(x + 26), P(yy + 6)), (P(x + cw - 26), P(yy + 6))], fill=(40, 52, 52) if dark else LINE, width=P(1.5))
        yy += 24
        for it in items:
            d.rounded_rectangle([P(x + 26), P(yy + 6), P(x + 42), P(yy + 24)], radius=P(3), outline=GOLD if dark else GOLD_DARK, width=P(2))
            yy += text_block(d, x + 54, yy + 2, it, sans, 22, cw - 84, 2, CREAM if dark else INK2, 1.28, minsize=14) + 12
    note(d, s.get('note'))


def t_quad(d, s):
    """Kwadrant 2 x 2: cells = [[kop, tekst] x4] (linksboven, rechtsboven, linksonder, rechtsonder), assen."""
    cells, (xa, ya) = s['cells'], s['axes']
    gx0, gy0 = X0 + 70, TOP + 10
    gx1, gy1 = X1, BOTTOM - 50
    gw, gh = (gx1 - gx0) / 2, (gy1 - gy0) / 2
    dark_i = s.get('dark', 1)
    for k, (head, txt) in enumerate(cells):
        r, c = divmod(k, 2)
        x, y = gx0 + c * gw, gy0 + r * gh
        dark = k == dark_i
        rbox(d, x + 8, y + 8, x + gw - 8, y + gh - 8, 18, fill=NIGHT if dark else WHITE, outline=None if dark else LINE)
        d.text((P(x + 40), P(y + 58)), head, font=serif(38), fill=GOLD if dark else INK, anchor='lm')
        text_block(d, x + 40, y + 96, txt, sans, 23, gw - 80, 3, CREAM if dark else INK2, 1.3, minsize=15)
    # assen
    f = sansb(19)
    d.text((P((gx0 + gx1) / 2), P(gy1 + 30)), xa, font=f, fill=GOLD_DARK, anchor='mm')
    arrow(d, (gx0 + gx1) / 2 + d.textlength(xa, font=f) / S / 2 + 14, gy1 + 30, (gx0 + gx1) / 2 + d.textlength(xa, font=f) / S / 2 + 60)
    tmp = Image.new('RGBA', (P(gh * 2), P(40)), (0, 0, 0, 0))
    td = ImageDraw.Draw(tmp)
    td.text((P(gh), P(20)), ya, font=f, fill=GOLD_DARK, anchor='mm')
    yw = td.textlength(ya, font=f) / S
    td.line([(P(gh + yw / 2 + 14), P(20)), (P(gh + yw / 2 + 60), P(20))], fill=GOLD_DARK, width=P(3))
    td.line([(P(gh + yw / 2 + 50), P(11)), (P(gh + yw / 2 + 60), P(20)), (P(gh + yw / 2 + 50), P(29))], fill=GOLD_DARK, width=P(3))
    tmp = tmp.rotate(90, expand=True)
    d._image.paste(tmp, (P(X0 + 10), P((gy0 + gy1) / 2 - gh)), tmp)


def t_chips(d, s):
    """Rij met labels in vakjes: items = [...], cols."""
    items = s['items']
    cols = s.get('cols', 7)
    gap = 18
    cw = (X1 - X0 - gap * (cols - 1)) / cols
    rows = (len(items) + cols - 1) // cols
    ch = 96
    y0 = TOP + 30
    for i, it in enumerate(items):
        r, c = divmod(i, cols)
        x, y = X0 + c * (cw + gap), y0 + r * (ch + gap)
        rbox(d, x, y, x + cw, y + ch, 16, fill=WHITE, outline=LINE)
        d.text((P(x + 22), P(y + 28)), str(i + 1), font=sansb(17), fill=GOLD_DARK, anchor='lm')
        f, _ = fit(d, it, sansb, 23, cw - 34, 13)
        d.text((P(x + 22), P(y + 64)), it, font=f, fill=INK, anchor='lm')
    if s.get('extra'):
        head, items2 = s['extra']
        y = y0 + rows * (ch + gap) + 30
        rbox(d, X0, y, X1, BOTTOM - 44, 18, fill=NIGHT)
        d.text((P(X0 + 36), P(y + 44)), head, font=sansb(20), fill=GOLD, anchor='lm')
        x = X0 + 36
        for it in items2:
            w = d.textlength(it, font=sans(23)) / S + 40
            rbox(d, x, y + 76, x + w, y + 120, 22, outline=(80, 80, 66), width=2)
            d.text((P(x + w / 2), P(y + 98)), it, font=sans(23), fill=CREAM, anchor='mm')
            x += w + 14
    note(d, s.get('note'))


def t_scale(d, s):
    """Temperatuurschaal: points = [[van, tot, label met bereik]] tussen min en max."""
    lo, hi = s['min'], s['max']
    ax_y = BOTTOM - 120
    x0, x1 = X0 + 20, X1 - 20

    def X(v):
        return x0 + (x1 - x0) * (v - lo) / (hi - lo)

    # verloop van goud naar donker goud
    steps = 120
    for k in range(steps):
        t = k / steps
        col = tuple(int(GOLD[i] * (1 - t) + RED[i] * t) for i in range(3))
        d.rectangle([P(x0 + (x1 - x0) * k / steps), P(ax_y - 10), P(x0 + (x1 - x0) * (k + 1) / steps + 1), P(ax_y + 10)], fill=col)
    for v in range(int(lo), int(hi) + 1, s.get('tick', 5)):
        d.line([(P(X(v)), P(ax_y + 14)), (P(X(v)), P(ax_y + 26))], fill=INK3, width=P(2))
        d.text((P(X(v)), P(ax_y + 46)), f'{v} °C' if s.get('unit', True) else str(v), font=sans(20), fill=INK3, anchor='mm')
    pts = s['points']
    lanes = s.get('lanes', 4)
    top = TOP + 20
    lane_h = (ax_y - 40 - top) / lanes
    for i, (a, b, label) in enumerate(pts):
        lane = i % lanes
        y = top + lane * lane_h + lane_h / 2
        xa, xb = X(a), X(b)
        d.line([(P((xa + xb) / 2), P(y + 18)), (P((xa + xb) / 2), P(ax_y - 16))], fill=INK3, width=P(1.5))
        if b > a:
            rbox(d, xa, ax_y - 15, xb, ax_y + 15, 8, outline=NIGHT, width=3)
        else:
            d.ellipse([P(xa - 13), P(ax_y - 13), P(xa + 13), P(ax_y + 13)], fill=NIGHT, outline=WHITE, width=P(3))
        lab = label  # de tekst bevat het bereik zelf, in de schrijfwijze van de taal
        f, _ = fit(d, lab, sansb, 23, 520, 14)
        tw = d.textlength(lab, font=f) / S
        cx = min(max((xa + xb) / 2, X0 + tw / 2 + 20), X1 - tw / 2 - 20)
        rbox(d, cx - tw / 2 - 18, y - 22, cx + tw / 2 + 18, y + 22, 22, fill=WHITE, outline=LINE)
        d.text((P(cx), P(y)), lab, font=f, fill=INK, anchor='mm')
    note(d, s.get('note'))


def t_rename(d, s):
    """Van links naar rechts: pairs = [[voor, na]], met kopjes."""
    (hl, hr), pairs = s['heads'], s['pairs']
    n = len(pairs)
    y = TOP + 30
    lw = 560
    rx = X0 + lw + 130
    d.text((P(X0), P(y)), hl, font=sansb(20), fill=INK3, anchor='lm')
    d.text((P(rx), P(y)), hr, font=sansb(20), fill=GOLD_DARK, anchor='lm')
    rh = min(120, (BOTTOM - y - 70) / n)
    for i, (a, b) in enumerate(pairs):
        yy = y + 40 + i * rh
        rbox(d, X0, yy, X0 + lw, yy + rh - 24, 16, fill=WHITE, outline=LINE)
        f, _ = fit(d, a, sans, 28, lw - 60, 15)
        d.text((P(X0 + 30), P(yy + (rh - 24) / 2)), a, font=f, fill=INK3, anchor='lm')
        arrow(d, X0 + lw + 30, yy + (rh - 24) / 2, X0 + lw + 100)
        rbox(d, rx, yy, X1, yy + rh - 24, 16, fill=NIGHT)
        f, _ = fit(d, b, serif, 32, X1 - rx - 60, 16)
        d.text((P(rx + 30), P(yy + (rh - 24) / 2)), b, font=f, fill=CREAM, anchor='lm')
    note(d, s.get('note'))


def t_hub(d, s):
    """Links losse plekken, in het midden één plek, rechts de apparaten."""
    left, mid, right = s['left'], s['mid'], s['right']
    y1, y2 = TOP + 20, BOTTOM - (44 if s.get('note') else 6)
    lw = 430
    # links
    d.text((P(X0), P(y1 + 10)), left[0], font=sansb(20), fill=INK3, anchor='lm')
    items = left[1]
    step = (y2 - y1 - 50) / len(items)
    for i, it in enumerate(items):
        yy = y1 + 40 + i * step
        rbox(d, X0, yy, X0 + lw, yy + step - 14, 14, fill=WHITE, outline=LINE)
        f, _ = fit(d, it, sans, 23, lw - 40, 14)
        d.text((P(X0 + 22), P(yy + (step - 14) / 2)), it, font=f, fill=INK2, anchor='lm')
    # midden
    mx0, mx1 = X0 + lw + 130, X1 - lw - 130
    my = (y1 + y2) / 2
    rbox(d, mx0, my - 130, mx1, my + 130, 26, fill=NIGHT)
    B.logo(d, (mx0 + mx1) / 2 - 92, my - 50, 30, CREAM, GOLD)
    text_block(d, (mx0 + mx1) / 2, my + 10, mid, sans, 23, mx1 - mx0 - 50, 3, CREAM, 1.3, anchor='ma', minsize=15)
    for i in range(len(items)):
        yy = y1 + 40 + i * step + (step - 14) / 2
        d.line([(P(X0 + lw + 6), P(yy)), (P(mx0 - 6), P(my))], fill=LINE, width=P(2))
    # rechts
    rx = X1 - lw
    d.text((P(rx), P(y1 + 10)), right[0], font=sansb(20), fill=GOLD_DARK, anchor='lm')
    ritems = right[1]
    step2 = (y2 - y1 - 50) / len(ritems)
    for i, (ic, it) in enumerate(ritems):
        yy = y1 + 40 + i * step2
        rbox(d, rx, yy, X1, yy + step2 - 14, 14, fill=WHITE, outline=LINE)
        B.icon(d, ic, rx + 46, yy + (step2 - 14) / 2, 22, GOLD_DARK)
        f, _ = fit(d, it, sans, 23, lw - 110, 14)
        d.text((P(rx + 86), P(yy + (step2 - 14) / 2)), it, font=f, fill=INK, anchor='lm')
        arrow(d, mx1 + 6, my, rx - 8) if i == 0 else d.line([(P(mx1 + 6), P(my)), (P(rx - 8), P(yy + (step2 - 14) / 2))], fill=LINE, width=P(2))
    note(d, s.get('note'))


def t_page(d, s):
    """Een geprinte pagina of receptkaart met genummerde aanwijzingen ernaast."""
    rows, notes = s['rows'], s['notes']
    px0, py0 = X0 + 40, TOP - 20
    pw, ph = 470, BOTTOM - py0 + 20
    rbox(d, px0 + 10, py0 + 12, px0 + pw + 10, py0 + ph + 12, 8, fill=(226, 219, 205))
    rbox(d, px0, py0, px0 + pw, py0 + ph, 8, fill=WHITE, outline=LINE)
    marks = []
    y = py0 + 36
    for kind, txt, mark in rows:
        if kind == 'logo':
            rbox(d, px0 + 30, y - 6, px0 + 104, y + 40, 8, fill=NIGHT)
            d.text((P(px0 + 67), P(y + 17)), 'LOGO', font=sansb(14), fill=GOLD, anchor='mm')
            f, _ = fit(d, txt, serif, 22, pw - 220, 12)
            d.text((P(px0 + pw / 2), P(y + 17)), txt, font=f, fill=INK, anchor='mm')
            d.line([(P(px0 + 30), P(y + 58)), (P(px0 + pw - 30), P(y + 58))], fill=LINE, width=P(1.5))
            marks.append((mark, y + 17))
            y += 82
        elif kind == 'title':
            f, _ = fit(d, txt, serif, 32, pw - 60, 16)
            d.text((P(px0 + 30), P(y)), txt, font=f, fill=INK, anchor='la')
            marks.append((mark, y + 18))
            y += 54
        elif kind == 'meta':
            d.text((P(px0 + 30), P(y)), txt, font=sansb(17), fill=GOLD_DARK, anchor='la')
            marks.append((mark, y + 10))
            y += 40
        elif kind == 'head':
            d.text((P(px0 + 30), P(y)), txt, font=sansb(16), fill=INK3, anchor='la')
            marks.append((mark, y + 10))
            y += 32
        elif kind == 'line':
            f, _ = fit(d, txt, sans, 17, pw - 60, 11)
            d.text((P(px0 + 30), P(y)), txt, font=f, fill=INK2, anchor='la')
            marks.append((mark, y + 10))
            y += 30
        elif kind == 'gap':
            y += int(txt or 14)
        elif kind == 'foot':
            fy = py0 + ph - 40
            d.line([(P(px0 + 30), P(fy - 18)), (P(px0 + pw - 30), P(fy - 18))], fill=LINE, width=P(1.5))
            f, _ = fit(d, txt, sans, 15, pw - 60, 10)
            d.text((P(px0 + 30), P(fy)), txt, font=f, fill=INK3, anchor='lm')
            marks.append((mark, fy))
    # aanwijzingen rechts
    nx = px0 + pw + 140
    nstep = (BOTTOM - TOP) / max(len(notes), 1)
    used = {}
    for k, (head, txt) in enumerate(notes):
        ny = TOP + 10 + k * nstep
        used[k + 1] = ny + 22
        d.ellipse([P(nx - 22), P(ny), P(nx + 22), P(ny + 44)], fill=GOLD_DARK)
        d.text((P(nx), P(ny + 22)), str(k + 1), font=sansb(22), fill=WHITE, anchor='mm')
        d.text((P(nx + 40), P(ny + 22)), head, font=serif(30), fill=INK, anchor='lm')
        text_block(d, nx + 40, ny + 48, txt, sans, 21, X1 - nx - 40, 2, INK2, 1.3, minsize=15)
    for mark, my in marks:
        if mark and mark in used:
            d.ellipse([P(px0 + pw - 22), P(my - 13), P(px0 + pw + 4), P(my + 13)], fill=GOLD_DARK)
            d.text((P(px0 + pw - 9), P(my)), str(mark), font=sansb(15), fill=WHITE, anchor='mm')
            d.line([(P(px0 + pw + 6), P(my)), (P(nx - 28), P(used[mark]))], fill=LINE, width=P(2))


TEMPLATES = {
    'flow': t_flow, 'versus': t_versus, 'hbars': t_hbars, 'stack': t_stack, 'table': t_table, 'calc': t_calc,
    'cards': t_cards, 'tiles': t_tiles, 'folders': t_folders, 'quad': t_quad, 'chips': t_chips, 'scale': t_scale,
    'rename': t_rename, 'hub': t_hub, 'page': t_page,
}


def render(key, img, lang):
    li = LANGS.index(lang)
    s = tr(img, li)
    im, d = base(s['title'], s.get('sub', ''))
    TEMPLATES[s['type']](d, s)
    out_dir = os.path.join(ROOT, 'assets', 'blog', key)
    os.makedirs(out_dir, exist_ok=True)
    im = im.resize((W, H), Image.LANCZOS).quantize(colors=96, method=Image.Quantize.MEDIANCUT)
    im.save(os.path.join(out_dir, f"{img['name']}-{lang}.png"), optimize=True)


if __name__ == '__main__':
    folder = os.path.join(HERE, 'blog-beelden')
    only = sys.argv[1:]
    n = 0
    for fn in sorted(os.listdir(folder)):
        key = fn[:-5]
        if not fn.endswith('.json') or (only and key not in only):
            continue
        imgs = json.load(open(os.path.join(folder, fn), encoding='utf-8'))
        for img in imgs:
            for lang in LANGS:
                render(key, img, lang)
                n += 1
    print(f'{n} afbeeldingen')
