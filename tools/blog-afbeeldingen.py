#!/usr/bin/env python3
# Afbeeldingen voor het blog, in de huisstijl van Savour (donker met goud, Playfair Display en DM Sans uit
# assets/fonts) en altijd met het SAVOUR-logo onderin.
#
#   1. Een coverafbeelding (1200 x 630) per blogartikel en per taal: assets/blog/covers/<nl-adres>-<taal>.jpg.
#      De titel komt uit de gebouwde pagina's in site/, dus eerst `node tools/build-seo.mjs`, dan dit script,
#      dan nog een keer `node tools/build-seo.mjs` (die zet de covers op de pagina's, in het overzicht en als
#      deelafbeelding). Onderwerp en pictogram per artikel staan in ONDERWERP hieronder; een nieuw artikel zonder
#      regel daar geeft een foutmelding.
#   2. De rekenvoorbeelden bij "Foodcost berekenen" (1600 x 900): assets/blog/foodcost-berekenen/<naam>-<taal>.png.
#      De bedragen horen bij het voorbeeld in tools/site-blog-foodcost-berekenen.mjs.
#
# Draaien: python3 tools/blog-afbeeldingen.py   (nodig: Python 3 met Pillow)
import html
import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, 'assets', 'fonts')
LANGS = ['nl', 'en', 'de', 'es', 'fr']
S = 2  # alles op dubbele grootte tekenen en daarna verkleinen: strakke randen

NIGHT = (21, 25, 23)
DEEP = (5, 9, 9)
DEEP2 = (11, 18, 19)
CREAM = (238, 232, 220)
MUTED = (185, 190, 183)
GOLD = (232, 202, 141)
GOLD_DARK = (143, 111, 51)
PAPER = (246, 242, 234)
PAPER2 = (239, 232, 219)
INK = (29, 32, 30)
INK2 = (79, 83, 77)
INK3 = (123, 125, 117)
LINE = (221, 212, 195)
LINE_DARK = (36, 48, 49)


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), int(size * S))


def serif(size):
    return font('playfair-700.ttf', size)


def sans(size):
    return font('dmsans-400.ttf', size)


def sansb(size):
    return font('dmsans-700.ttf', size)


def spaced(d, xy, text, fnt, fill, spacing, anchor='lm'):
    """Tekst met extra letterafstand (zoals het logo op de site). Geeft de breedte terug."""
    x, y = xy
    start = x
    for ch in text:
        d.text((x, y), ch, font=fnt, fill=fill, anchor=anchor)
        x += d.textlength(ch, font=fnt) + spacing
    return x - spacing - start


def logo(d, x, cy, size, color, under):
    """SAVOUR-woordmerk met het gouden streepje eronder, zoals op savour.page."""
    spaced(d, (x * S, cy * S), 'SAVOUR', serif(size), color, 0.34 * size * S)
    d.rectangle([x * S, (cy + size * 0.85) * S, (x + size * 1.7) * S, (cy + size * 0.85 + 3) * S], fill=under)


def wrap(d, text, fnt, width):
    words, lines, line = text.split(), [], ''
    for w in words:
        test = (line + ' ' + w).strip()
        if d.textlength(test, font=fnt) <= width * S:
            line = test
        else:
            if line:
                lines.append(line)
            line = w
    if line:
        lines.append(line)
    return lines


# ---------------------------------------------------------------- pictogrammen (lijnen in goud, vak van 200 x 200)
def icon(d, kind, cx, cy, r, col):
    """Tekent pictogram `kind` gecentreerd op (cx, cy) met halve breedte r (in schermpunten)."""
    u = r / 100.0
    w = max(2, int(6 * u)) * S

    def P(x, y):
        return ((cx + (x - 100) * u) * S, (cy + (y - 100) * u) * S)

    def line(*pts):
        d.line([P(*p) for p in pts], fill=col, width=w, joint='curve')

    def rect(x1, y1, x2, y2, rad=8):
        d.rounded_rectangle([P(x1, y1), P(x2, y2)], radius=rad * u * S, outline=col, width=w)

    def circ(x, y, rr, fill=None):
        d.ellipse([P(x - rr, y - rr), P(x + rr, y + rr)], outline=col, width=w, fill=fill)

    def arc(x, y, rr, a, b):
        d.arc([P(x - rr, y - rr), P(x + rr, y + rr)], a, b, fill=col, width=w)

    def dot(x, y, rr=5):
        d.ellipse([P(x - rr, y - rr), P(x + rr, y + rr)], fill=col)

    if kind == 'spark':  # AI
        for (x, y, s) in [(90, 105, 55), (150, 55, 22), (150, 150, 16)]:
            line((x, y - s), (x + s * 0.25, y - s * 0.25), (x + s, y), (x + s * 0.25, y + s * 0.25), (x, y + s),
                 (x - s * 0.25, y + s * 0.25), (x - s, y), (x - s * 0.25, y - s * 0.25), (x, y - s))
    elif kind == 'shield':
        line((100, 30), (160, 52), (160, 100), (100, 172), (40, 100), (40, 52), (100, 30))
        line((72, 98), (93, 120), (130, 80))
    elif kind == 'allergen':  # graanhalm
        line((100, 175), (100, 40))
        for y in (55, 85, 115):
            d.ellipse([P(72, y - 4), P(98, y + 22)], outline=col, width=w)
            d.ellipse([P(102, y - 4), P(128, y + 22)], outline=col, width=w)
        d.ellipse([P(88, 22), P(112, 52)], outline=col, width=w)
    elif kind == 'calc':
        rect(50, 25, 150, 175, 12)
        rect(65, 42, 135, 75, 4)
        for i in range(3):
            for j in range(3):
                dot(75 + j * 25, 100 + i * 25, 6)
    elif kind == 'euro':
        arc(110, 100, 60, 40, 320)
        line((40, 85), (120, 85))
        line((40, 115), (120, 115))
    elif kind == 'coins':
        for i, y in enumerate((150, 125, 100)):
            d.ellipse([P(45, y - 14), P(125, y + 14)], outline=col, width=w)
        circ(140, 70, 35)
        circ(140, 70, 18)
    elif kind == 'team':
        for x, y, s in [(65, 75, 20), (135, 75, 20), (100, 65, 26)]:
            circ(x, y, s)
        arc(65, 150, 38, 200, 340)
        arc(135, 150, 38, 200, 340)
        arc(100, 155, 48, 200, 340)
    elif kind == 'folders':
        line((35, 70), (35, 160), (165, 160), (165, 80), (95, 80), (82, 65), (35, 65), (35, 70))
        line((50, 55), (50, 45), (90, 45), (102, 58), (150, 58), (150, 70))
    elif kind == 'chart':
        line((35, 165), (170, 165))
        for x, h in [(50, 45), (85, 75), (120, 60), (155, 110)]:
            rect(x - 12, 165 - h, x + 12, 165, 3)
    elif kind == 'thermo':
        circ(100, 145, 26)
        line((86, 125), (86, 45))
        line((114, 125), (114, 45))
        arc(100, 45, 14, 180, 360)
        dot(100, 145, 14)
        line((100, 140), (100, 75))
        for y in (60, 80, 100):
            line((125, y), (140, y))
    elif kind == 'hat':
        arc(70, 85, 28, 105, 275)
        arc(100, 62, 34, 195, 345)
        arc(130, 85, 28, 265, 75)
        line((62, 112), (62, 140))
        line((138, 112), (138, 140))
        rect(56, 140, 144, 165, 4)
    elif kind == 'note':
        rect(45, 30, 145, 170, 6)
        for y in (65, 95, 125):
            line((65, y), (125, y))
        line((150, 150), (175, 60))
        line((175, 60), (185, 64))
        line((185, 64), (160, 154))
    elif kind == 'book':
        line((100, 55), (100, 165))
        d.arc([P(30, 30), P(100, 80)], 180, 360, fill=col, width=w)
        d.arc([P(100, 30), P(170, 80)], 180, 360, fill=col, width=w)
        d.arc([P(30, 140), P(100, 190)], 180, 360, fill=col, width=w)
        d.arc([P(100, 140), P(170, 190)], 180, 360, fill=col, width=w)
        line((30, 55), (30, 165))
        line((170, 55), (170, 165))
    elif kind == 'phone':
        rect(62, 25, 138, 175, 14)
        line((88, 40), (112, 40))
        for y in (70, 95, 120):
            line((80, y), (120, y))
        dot(100, 155, 6)
    elif kind == 'share':
        circ(55, 100, 20)
        circ(145, 50, 20)
        circ(145, 150, 20)
        line((73, 90), (127, 60))
        line((73, 110), (127, 140))
    elif kind == 'scale':
        line((100, 40), (100, 165))
        line((60, 165), (140, 165))
        line((40, 60), (160, 60))
        line((40, 60), (20, 115))
        line((40, 60), (60, 115))
        arc(40, 115, 20, 0, 180)
        line((20, 115), (60, 115))
        line((160, 60), (140, 115))
        line((160, 60), (180, 115))
        arc(160, 115, 20, 0, 180)
        line((140, 115), (180, 115))
    elif kind == 'grid':
        for x in (40, 110):
            for y in (40, 110):
                rect(x, y, x + 50, y + 50, 8)
    elif kind == 'wifioff':
        for rr in (85, 58, 31):
            arc(100, 150, rr, 225, 315)
        dot(100, 150, 9)
        line((40, 40), (160, 160))
    elif kind == 'print':
        rect(55, 30, 145, 75, 3)
        rect(30, 75, 170, 140, 10)
        rect(55, 115, 145, 175, 3)
        line((70, 135), (130, 135))
        line((70, 155), (115, 155))
    elif kind == 'cloud':
        arc(62, 118, 30, 90, 270)
        arc(100, 92, 40, 190, 350)
        arc(140, 118, 30, 270, 90)
        line((62, 148), (140, 148))
    elif kind == 'transfer':
        rect(25, 55, 80, 130, 6)
        rect(120, 70, 175, 145, 6)
        line((90, 85), (110, 85))
        line((102, 77), (110, 85), (102, 93))
        line((110, 115), (90, 115))
        line((98, 107), (90, 115), (98, 123))
    elif kind == 'route':
        circ(50, 150, 14)
        circ(150, 50, 14)
        line((50, 136), (50, 110), (150, 110), (150, 90), (100, 90), (100, 65), (136, 65))
        dot(150, 50, 6)
    elif kind == 'sort':
        for i, (y, l) in enumerate([(55, 110), (90, 85), (125, 60), (160, 35)]):
            line((40, y), (40 + l, y))
        line((165, 40), (165, 160))
        line((150, 145), (165, 160), (180, 145))
    elif kind == 'chat':
        rect(25, 35, 125, 105, 16)
        line((50, 105), (45, 125), (70, 105))
        rect(80, 90, 175, 155, 16)
        line((150, 155), (155, 172), (135, 155))
    elif kind == 'compare':
        rect(25, 45, 90, 160, 8)
        rect(110, 45, 175, 160, 8)
        line((40, 75), (75, 75))
        line((40, 100), (70, 100))
        line((125, 75), (160, 75))
        line((125, 100), (155, 100))
        line((128, 130), (140, 142), (160, 118))
    elif kind == 'wave':  # sous-vide: bak met water en thermometer
        line((30, 70), (30, 165), (170, 165), (170, 70))
        for y in (95, 125):
            d.line([P(x, y + (8 if (x // 20) % 2 else -8)) for x in range(35, 116, 20)], fill=col, width=w, joint='curve')
        line((145, 25), (145, 128))
        circ(145, 140, 12)
    elif kind == 'check':
        rect(40, 25, 160, 175, 10)
        for y in (65, 105, 145):
            line((58, y), (68, y + 10), (85, y - 10))
            line((100, y), (140, y))
    elif kind == 'doc':
        line((30, 40), (75, 40), (90, 55), (90, 150), (30, 150), (30, 40))
        line((45, 80), (75, 80))
        line((45, 105), (75, 105))
        line((100, 100), (120, 100))
        line((113, 92), (121, 100), (113, 108))
        line((150, 60), (150, 165))
        line((150, 60), (130, 55), (125, 160), (150, 165))
        line((150, 60), (170, 55), (175, 160), (150, 165))
    else:
        raise SystemExit(f'Onbekend pictogram: {kind}')


# ---------------------------------------------------------------- covers
# nl-adres -> (pictogram, onderwerp per taal: nl, en, de, es, fr)
ONDERWERP = {
    'foodcost-berekenen': ('euro', ['Foodcost', 'Food cost', 'Wareneinsatz', 'Food cost', 'Food cost']),
    'foodcost-calculator': ('calc', ['Binnenkort', 'Coming soon', 'Demnächst', 'Próximamente', 'Bientôt']),
    'ai-in-de-horeca': ('spark', ['AI', 'AI', 'KI', 'IA', 'IA']),
    'ai-mag-je-recept-niet-verzinnen': ('shield', ['Betrouwbaar', 'Reliability', 'Verlässlichkeit', 'Fiabilidad', 'Fiabilité']),
    'allergenen-in-savour': ('allergen', ['Allergenen', 'Allergens', 'Allergene', 'Alérgenos', 'Allergènes']),
    'gedeeld-receptenboek-keukenteam': ('team', ['Keukenteam', 'Kitchen team', 'Küchenteam', 'Equipo de cocina', 'Équipe de cuisine']),
    'gedeelde-mappen-uitgelegd': ('folders', ['Gedeelde mappen', 'Shared folders', 'Geteilte Ordner', 'Carpetas compartidas', 'Dossiers partagés']),
    'horeca-in-cijfers': ('chart', ['Cijfers', 'Numbers', 'Zahlen', 'Cifras', 'Chiffres']),
    'kerntemperaturen-vlees-vis-schaaldieren': ('thermo', ['Temperaturen', 'Temperatures', 'Temperaturen', 'Temperaturas', 'Températures']),
    'kosten-en-marges-restaurant': ('coins', ['Kosten', 'Costs', 'Kosten', 'Costes', 'Coûts']),
    'nieuwe-kok-inwerken': ('hat', ['Inwerken', 'Onboarding', 'Einarbeitung', 'Incorporación', 'Intégration']),
    'oude-kladjes-digitaliseren': ('note', ['Digitaliseren', 'Digitising', 'Digitalisieren', 'Digitalizar', 'Numériser']),
    'receptbeheer-in-de-horeca': ('book', ['Receptbeheer', 'Recipe management', 'Rezeptverwaltung', 'Gestión de recetas', 'Gestion des recettes']),
    'recepten-app-kiezen-restaurant': ('phone', ['Recepten-app', 'Recipe app', 'Rezept-App', 'App de recetas', 'App de recettes']),
    'recepten-delen-met-je-team': ('share', ['Delen', 'Sharing', 'Teilen', 'Compartir', 'Partager']),
    'recepten-opschalen-zonder-fouten': ('scale', ['Opschalen', 'Scaling', 'Skalieren', 'Escalar', 'Adapter les quantités']),
    'recepten-organiseren-in-de-keuken': ('grid', ['Organiseren', 'Organising', 'Organisieren', 'Organizar', 'Organiser']),
    'recepten-zonder-wifi': ('wifioff', ['Offline', 'Offline', 'Offline', 'Sin conexión', 'Hors ligne']),
    'receptenboek-met-eigen-logo': ('print', ['Printen', 'Printing', 'Drucken', 'Imprimir', 'Imprimer']),
    'receptendatabase-in-de-cloud': ('cloud', ['Cloud', 'Cloud', 'Cloud', 'Nube', 'Cloud']),
    'receptenmap-laten-overzetten': ('transfer', ['Import service', 'Import service', 'Import-Service', 'Servicio de importación', 'Service d’import']),
    'receptenmappen-indelen-voorbeelden': ('folders', ['Mappen indelen', 'Folder structure', 'Ordnerstruktur', 'Organizar carpetas', 'Organiser ses dossiers']),
    'roadmap': ('route', ['Roadmap', 'Roadmap', 'Roadmap', 'Hoja de ruta', 'Feuille de route']),
    'rommelige-receptenmap-ordenen': ('sort', ['Ordenen', 'Tidying up', 'Aufräumen', 'Ordenar', 'Ranger']),
    'savour-community': ('chat', ['Community', 'Community', 'Community', 'Comunidad', 'Communauté']),
    'savour-paprika-meez-galley-vergelijken': ('compare', ['Vergelijking', 'Comparison', 'Vergleich', 'Comparativa', 'Comparatif']),
    'sous-vide-temperaturen-en-tijden': ('wave', ['Sous-vide', 'Sous vide', 'Sous-vide', 'Sous vide', 'Sous vide']),
    'standaardrecepturen-in-de-keuken': ('check', ['Standaardrecepturen', 'Standard recipes', 'Standardrezepturen', 'Fichas técnicas', 'Fiches techniques']),
    'van-word-naar-receptenboek': ('doc', ['Importeren', 'Importing', 'Importieren', 'Importar', 'Importer']),
}


def built_posts():
    """Alle blogartikelen uit site/: {nl-adres: {taal: titel}}."""
    out = {}
    base = os.path.join(ROOT, 'site', 'blog')
    for key in sorted(os.listdir(base)):
        page = os.path.join(base, key, 'index.html')
        if key.startswith('pagina-') or not os.path.isfile(page):
            continue
        src = open(page, encoding='utf-8').read()
        if '"@type":"Article"' not in src:
            continue
        titles = {}
        for lang in LANGS:
            if lang == 'nl':
                path = page
            else:
                m = re.search(r'hreflang="%s" href="https://savour\.page/([^"]+)"' % lang, src)
                if not m:
                    raise SystemExit(f'Geen {lang}-versie van {key}')
                path = os.path.join(ROOT, 'site', m.group(1), 'index.html')
            h1 = re.search(r'<h1>(.*?)</h1>', open(path, encoding='utf-8').read())
            titles[lang] = html.unescape(h1.group(1))
        out[key] = titles
    return out


_BG = {}


def cover_background(W, H):
    """Verloop van boven naar beneden met een warme gloed achter het pictogram (zoals de deelafbeelding van de site)."""
    if (W, H) not in _BG:
        im = Image.new('RGB', (W * S, H * S), DEEP)
        px = im.load()
        gx, gy, gr = 905 * S, 270 * S, 420 * S
        for y in range(H * S):
            t = y / (H * S)
            base = tuple(int(DEEP2[i] * (1 - t) + DEEP[i] * t) for i in range(3))
            for x in range(W * S):
                dd = ((x - gx) ** 2 + (y - gy) ** 2) ** 0.5 / gr
                g = max(0.0, 1 - dd) ** 2 * 0.16
                px[x, y] = tuple(int(base[i] * (1 - g) + GOLD[i] * g) for i in range(3))
        _BG[(W, H)] = im
    return _BG[(W, H)]


def cover(key, lang, title):
    W, H = 1200, 630
    if key not in ONDERWERP:
        raise SystemExit(f'Geen onderwerp voor blog {key}: voeg een regel toe in ONDERWERP')
    kind, labels = ONDERWERP[key]
    label = labels[LANGS.index(lang)]
    im = cover_background(W, H).copy()
    d = ImageDraw.Draw(im)
    # onderwerp en titel links
    spaced(d, (72 * S, 92 * S), label.upper(), sansb(17), GOLD, 3.2 * S)
    d.rectangle([72 * S, 112 * S, 120 * S, 115 * S], fill=GOLD)
    for size in (60, 56, 52, 48, 44, 40, 36, 33):
        fnt = serif(size)
        lines = wrap(d, title, fnt, 610)
        if len(lines) <= (3 if size > 44 else 4):
            break
    lh = size * 1.2
    top = 318 - len(lines) * lh / 2  # midden tussen onderwerp en de lijn onderin
    for i, l in enumerate(lines):
        d.text((72 * S, (top + i * lh) * S), l, font=fnt, fill=CREAM, anchor='la')
    # pictogram rechts in een ring
    cx, cy = 905, 270
    d.ellipse([(cx - 150) * S, (cy - 150) * S, (cx + 150) * S, (cy + 150) * S], outline=(60, 62, 52), width=2 * S)
    d.ellipse([(cx - 118) * S, (cy - 118) * S, (cx + 118) * S, (cy + 118) * S], fill=(14, 20, 20), outline=GOLD_DARK, width=2 * S)
    icon(d, kind, cx, cy, 70, GOLD)
    # logo onderin
    d.line([72 * S, 528 * S, (W - 72) * S, 528 * S], fill=LINE_DARK, width=2 * S)
    logo(d, 72, 572, 26, CREAM, GOLD)
    d.text(((W - 72) * S, 572 * S), 'savour.page', font=sans(21), fill=GOLD, anchor='rm')
    out = os.path.join(ROOT, 'assets', 'blog', 'covers', f'{key}-{lang}.jpg')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.resize((W, H), Image.LANCZOS).save(out, quality=86, optimize=True, progressive=True)


# ---------------------------------------------------------------- rekenvoorbeelden "Foodcost berekenen"
def money(v, lang, dec=True):
    s = f'{v:,.2f}' if dec else f'{v:,.0f}'
    if lang == 'en':
        return '€ ' + s
    s = s.replace(',', 'X').replace('.', ',').replace('X', ' ' if lang == 'fr' else '.')
    return ('€ ' + s) if lang == 'nl' else (s + ' €')


def pct(v, lang, dec=1):
    s = f'{v:.{dec}f}' if dec else f'{v:.0f}'
    if lang != 'en':
        s = s.replace('.', ',')
    return s + ('%' if lang in ('nl', 'en') else ' %')


def num(s, lang):
    return s if lang == 'en' else s.replace('.', ',')


T = {
    'title1': ['Foodcostpercentage berekenen', 'Calculating food cost percentage', 'Wareneinsatz in Prozent berechnen', 'Calcular el porcentaje de food cost', 'Calculer le pourcentage de food cost'],
    'sub1': ['Hoeveel van elke euro omzet gaat naar ingrediënten?', 'How much of every euro of revenue goes to ingredients?', 'Wie viel von jedem Euro Umsatz geht in Zutaten?', '¿Cuánto de cada euro facturado va a ingredientes?', 'Quelle part de chaque euro de chiffre d’affaires va aux ingrédients ?'],
    'cost': ['€ kosten', '€ cost', '€ Kosten', '€ coste', '€ coût'],
    'costl': ['Foodcost', 'Food cost', 'Wareneinsatz', 'Food cost', 'Food cost'],
    'rev': ['€ omzet', '€ revenue', '€ Umsatz', '€ ventas', '€ CA'],
    'revl': ['Omzet zonder btw', 'Revenue excl. VAT', 'Umsatz ohne MwSt.', 'Ventas sin IVA', 'CA hors TVA'],
    'pctl': ['Foodcost %', 'Food cost %', 'Wareneinsatz %', 'Food cost %', 'Food cost %'],
    'ex': ['VOORBEELD: RISOTTO MET PADDENSTOELEN', 'EXAMPLE: MUSHROOM RISOTTO', 'BEISPIEL: PILZRISOTTO', 'EJEMPLO: RISOTTO DE SETAS', 'EXEMPLE : RISOTTO AUX CHAMPIGNONS'],
    'exnote': ['Verkoopprijs {p} op de kaart, {q} zonder 9% btw', 'Menu price {p}, {q} without 9% VAT', 'Preis auf der Karte {p}, {q} ohne 9 % MwSt.', 'Precio en carta {p}, {q} sin 9 % de IVA', 'Prix sur la carte {p}, {q} sans 9 % de TVA'],
    'title2': ['Wat kost één bord risotto?', 'What does one plate of risotto cost?', 'Was kostet ein Teller Risotto?', '¿Cuánto cuesta un plato de risotto?', 'Combien coûte une assiette de risotto ?'],
    'sub2': ['Kostprijs per portie, ingrediënt voor ingrediënt', 'Cost per portion, ingredient by ingredient', 'Kosten pro Portion, Zutat für Zutat', 'Coste por ración, ingrediente a ingrediente', 'Coût par portion, ingrédient par ingrédient'],
    'items': [
        ['Paddenstoelenmix (opbrengst 85%)', 'Parmezaan', 'Kippenbouillon', 'Arborio-rijst', 'Witte wijn', 'Sjalot, knoflook, kruiden', 'Boter'],
        ['Mixed mushrooms (85% yield)', 'Parmesan', 'Chicken stock', 'Arborio rice', 'White wine', 'Shallot, garlic, herbs', 'Butter'],
        ['Pilzmischung (85 % Ausbeute)', 'Parmesan', 'Hühnerbrühe', 'Arborio-Reis', 'Weißwein', 'Schalotte, Knoblauch, Kräuter', 'Butter'],
        ['Mezcla de setas (85 % rendimiento)', 'Parmesano', 'Caldo de pollo', 'Arroz arborio', 'Vino blanco', 'Chalota, ajo, hierbas', 'Mantequilla'],
        ['Champignons (rendement 85 %)', 'Parmesan', 'Bouillon de volaille', 'Riz arborio', 'Vin blanc', 'Échalote, ail, herbes', 'Beurre'],
    ],
    'total': ['Totaal per portie', 'Total per portion', 'Summe pro Portion', 'Total por ración', 'Total par portion'],
    'fc': ['foodcost', 'food cost', 'Wareneinsatz', 'food cost', 'food cost'],
    'at': ['bij {p}', 'at {p}', 'bei {p}', 'a {p}', 'à {p}'],
    'menu': ['op de kaart', 'on the menu', 'auf der Karte', 'en la carta', 'sur la carte'],
    'title3': ['Je werkelijke foodcost over een maand', 'Your actual food cost over a month', 'Dein tatsächlicher Wareneinsatz im Monat', 'Tu food cost real de un mes', 'Ton food cost réel sur un mois'],
    'sub3': ['Wat je keuken in oktober echt heeft verbruikt', 'What your kitchen really used in October', 'Was deine Küche im Oktober wirklich verbraucht hat', 'Lo que tu cocina consumió de verdad en octubre', 'Ce que ta cuisine a vraiment consommé en octobre'],
    'begin': ['Beginvoorraad', 'Opening stock', 'Anfangsbestand', 'Existencias iniciales', 'Stock initial'],
    'buy': ['Inkoop', 'Purchases', 'Einkauf', 'Compras', 'Achats'],
    'end': ['Eindvoorraad', 'Closing stock', 'Endbestand', 'Existencias finales', 'Stock final'],
    'real': ['Werkelijke foodcost', 'Actual food cost', 'Tatsächlicher Wareneinsatz', 'Food cost real', 'Food cost réel'],
    'aspct': ['EN ALS PERCENTAGE', 'AND AS A PERCENTAGE', 'UND IN PROZENT', 'Y EN PORCENTAJE', 'ET EN POURCENTAGE'],
    'omzet': ['omzet', 'revenue', 'Umsatz', 'ventas', 'de CA'],
    'tip3': ['Tel je voorraad elke keer op dezelfde dag en hetzelfde tijdstip', 'Count your stock on the same day and at the same time every time', 'Zähle deinen Bestand immer am selben Tag zur selben Uhrzeit', 'Haz el inventario siempre el mismo día y a la misma hora', 'Fais ton inventaire toujours le même jour, à la même heure'],
    'title4': ['Theorie tegenover werkelijkheid', 'Theory versus reality', 'Theorie und Wirklichkeit', 'Teoría frente a realidad', 'Théorie et réalité'],
    'sub4': ['Het verschil is geld dat ongemerkt verdwijnt', 'The gap is money that disappears unnoticed', 'Die Lücke ist Geld, das unbemerkt verschwindet', 'La diferencia es dinero que desaparece sin que se note', 'L’écart, c’est de l’argent qui disparaît sans bruit'],
    'theo': ['Theoretisch', 'Theoretical', 'Theoretisch', 'Teórico', 'Théorique'],
    'werk': ['Werkelijk', 'Actual', 'Tatsächlich', 'Real', 'Réel'],
    'var': ['VARIANTIE', 'VARIANCE', 'ABWEICHUNG', 'DESVIACIÓN', 'VARIANCE'],
    'pp': ['3 procentpunt', '3 percentage points', '3 Prozentpunkte', '3 puntos', '3 points'],
    'month': ['= {m} per maand', '= {m} a month', '= {m} pro Monat', '= {m} al mes', '= {m} par mois'],
    'atrev': ['bij {m} omzet', 'on {m} revenue', 'bei {m} Umsatz', 'con {m} de ventas', 'pour {m} de CA'],
}


def infographics(lang):
    W, H, FOOT = 1600, 900, 120
    li = LANGS.index(lang)
    t = {k: v[li] for k, v in T.items()}
    out_dir = os.path.join(ROOT, 'assets', 'blog', 'foodcost-berekenen')
    os.makedirs(out_dir, exist_ok=True)

    def base(title, sub):
        im = Image.new('RGB', (W * S, H * S), PAPER)
        d = ImageDraw.Draw(im)
        size = 54
        while d.textlength(title, font=serif(size)) > (W - 180) * S:
            size -= 2
        d.text((90 * S, 70 * S), title, font=serif(size), fill=INK)
        d.rectangle([90 * S, 150 * S, 170 * S, 155 * S], fill=GOLD_DARK)
        d.text((90 * S, 175 * S), sub, font=sans(26), fill=INK2)
        y0 = (H - FOOT) * S
        d.rectangle([0, y0, W * S, H * S], fill=NIGHT)
        cy = H - FOOT / 2
        logo(d, 90, cy - 4, 34, CREAM, GOLD)
        d.text(((W - 90) * S, cy * S), 'savour.page', font=sans(24), fill=GOLD, anchor='rm')
        return im, d

    def box(d, x, y, w, h, label, value, dark=False):
        fill, vcol, lcol, ol = (NIGHT, GOLD, CREAM, NIGHT) if dark else ((255, 255, 255), INK, INK3, LINE)
        d.rounded_rectangle([x * S, y * S, (x + w) * S, (y + h) * S], radius=18 * S, fill=fill, outline=ol, width=2 * S)
        vs = 44
        while d.textlength(value, font=serif(vs)) > (w - 30) * S:
            vs -= 2
        d.text(((x + w / 2) * S, (y + h * 0.38) * S), value, font=serif(vs), fill=vcol, anchor='mm')
        ls = 22
        while label and d.textlength(label, font=sans(ls)) > (w - 24) * S:
            ls -= 1
        d.text(((x + w / 2) * S, (y + h * 0.74) * S), label, font=sans(ls), fill=lcol, anchor='mm')

    def op(d, x, y, s):
        d.text((x * S, y * S), s, font=serif(54), fill=GOLD_DARK, anchor='mm')

    def panel(d, head, formula, note):
        d.rounded_rectangle([90 * S, 500 * S, (W - 90) * S, 690 * S], radius=18 * S, fill=PAPER2)
        d.text((130 * S, 540 * S), head, font=sansb(20), fill=GOLD_DARK)
        fs = 46
        while d.textlength(formula, font=serif(fs)) > (W - 260) * S:
            fs -= 2
        d.text((130 * S, 580 * S), formula, font=serif(fs), fill=INK)
        d.text((130 * S, 650 * S), note, font=sans(22), fill=INK2)

    def save(im, name):
        im = im.resize((W, H), Image.LANCZOS).quantize(colors=96, method=Image.Quantize.MEDIANCUT)
        im.save(os.path.join(out_dir, f'{name}-{lang}.png'), optimize=True)

    # 1. de formule
    im, d = base(t['title1'], t['sub1'])
    y, bw, bh = 270, 330, 170
    box(d, 90, y, bw, bh, t['costl'], t['cost'])
    op(d, 90 + bw + 50, y + bh / 2, '÷')
    box(d, 90 + bw + 100, y, bw, bh, t['revl'], t['rev'])
    op(d, 90 + 2 * bw + 150, y + bh / 2, '×')
    box(d, 90 + 2 * bw + 200, y, 160, bh, '', '100')
    op(d, 90 + 2 * bw + 410, y + bh / 2, '=')
    box(d, 90 + 2 * bw + 460, y, 280, bh, t['pctl'], '%', dark=True)
    panel(d, t['ex'], f"{money(4.10, lang)}  ÷  {money(17.89, lang)}  ×  100  =  {pct(22.9, lang)}",
          t['exnote'].format(p=money(19.50, lang), q=money(17.89, lang)))
    save(im, 'foodcostpercentage')

    # 2. kostprijs risotto
    vals = [1.98, 0.60, 0.42, 0.38, 0.30, 0.25, 0.18]
    im, d = base(t['title2'], t['sub2'])
    x0, lw, maxw, y, rh = 90, 440, 600, 250, 50
    bx = x0 + lw
    for name, v in zip(t['items'], vals):
        ns = 24
        while d.textlength(name, font=sans(ns)) > (lw - 20) * S:
            ns -= 1
        d.text((x0 * S, (y + rh / 2) * S), name, font=sans(ns), fill=INK, anchor='lm')
        w = maxw * v / 2.0
        d.rounded_rectangle([bx * S, (y + 10) * S, (bx + w) * S, (y + rh - 10) * S], radius=8 * S, fill=GOLD_DARK if v == max(vals) else GOLD)
        d.text(((bx + w + 16) * S, (y + rh / 2) * S), money(v, lang), font=sansb(24), fill=INK, anchor='lm')
        y += rh
    d.line([x0 * S, (y + 8) * S, (bx + maxw) * S, (y + 8) * S], fill=LINE, width=2 * S)
    d.text((x0 * S, (y + 40) * S), t['total'], font=sansb(26), fill=INK, anchor='lm')
    d.text((bx * S, (y + 40) * S), money(4.10, lang), font=serif(36), fill=INK, anchor='lm')
    cx = 1250
    d.rounded_rectangle([cx * S, 260 * S, (W - 90) * S, 620 * S], radius=22 * S, fill=NIGHT)
    mx = (cx + W - 90) / 2
    d.text((mx * S, 360 * S), pct(22.9, lang), font=serif(70), fill=GOLD, anchor='mm')
    d.text((mx * S, 440 * S), t['fc'], font=sans(26), fill=CREAM, anchor='mm')
    d.text((mx * S, 520 * S), t['at'].format(p=money(19.50, lang)), font=sans(22), fill=MUTED, anchor='mm')
    d.text((mx * S, 555 * S), t['menu'], font=sans(22), fill=MUTED, anchor='mm')
    save(im, 'risotto-kostprijs')

    # 3. werkelijke foodcost
    im, d = base(t['title3'], t['sub3'])
    y, bw, bh, x = 270, 270, 170, 90
    box(d, x, y, bw, bh, t['begin'], money(8500, lang, False)); op(d, x + bw + 40, y + bh / 2, '+')
    x += bw + 80; box(d, x, y, bw, bh, t['buy'], money(12000, lang, False)); op(d, x + bw + 40, y + bh / 2, '−')
    x += bw + 80; box(d, x, y, bw, bh, t['end'], money(7900, lang, False)); op(d, x + bw + 40, y + bh / 2, '=')
    x += bw + 80; box(d, x, y, W - 90 - x, bh, t['real'], money(12600, lang, False), dark=True)
    panel(d, t['aspct'], f"{money(12600, lang, False)}  ÷  {money(42000, lang, False)} {t['omzet']}  ×  100  =  {pct(30, lang, 0)}", t['tip3'])
    save(im, 'werkelijke-foodcost')

    # 4. variantie
    im, d = base(t['title4'], t['sub4'])
    base_y, scale, bx, bw = 690, 13, 200, 220
    for i, (lab, v, c) in enumerate([(t['theo'], 27, GOLD), (t['werk'], 30, GOLD_DARK)]):
        x = bx + i * (bw + 90)
        h = v * scale
        d.rounded_rectangle([x * S, (base_y - h) * S, (x + bw) * S, base_y * S], radius=10 * S, fill=c)
        d.text(((x + bw / 2) * S, (base_y - h - 40) * S), pct(v, lang, 0), font=serif(48), fill=INK, anchor='mm')
        d.text(((x + bw / 2) * S, (base_y + 30) * S), lab, font=sans(24), fill=INK2, anchor='mm')
    gx = bx + 2 * bw + 90 + 30
    top, mid = base_y - 30 * scale, base_y - 27 * scale
    for xx in list(range(bx + bw, bx + bw + 90, 20)) + list(range(bx + 2 * bw + 90, gx, 20)):
        d.line([xx * S, mid * S, (xx + 10) * S, mid * S], fill=INK3, width=2 * S)
    d.line([gx * S, top * S, gx * S, mid * S], fill=INK, width=3 * S)
    for yy in (top, mid):
        d.line([(gx - 10) * S, yy * S, (gx + 10) * S, yy * S], fill=INK, width=3 * S)
    cx = 980
    d.rounded_rectangle([cx * S, 280 * S, (W - 90) * S, 620 * S], radius=22 * S, fill=NIGHT)
    mx = (cx + W - 90) / 2
    d.text((mx * S, 350 * S), t['var'], font=sansb(20), fill=GOLD, anchor='mm')
    ps = 52
    while d.textlength(t['pp'], font=serif(ps)) > 480 * S:
        ps -= 2
    d.text((mx * S, 425 * S), t['pp'], font=serif(ps), fill=CREAM, anchor='mm')
    ms = 36
    mtxt = t['month'].format(m=money(1260, lang, False))
    while d.textlength(mtxt, font=serif(ms)) > 480 * S:
        ms -= 2
    d.text((mx * S, 500 * S), mtxt, font=serif(ms), fill=GOLD, anchor='mm')
    d.text((mx * S, 565 * S), t['atrev'].format(m=money(42000, lang, False)), font=sans(22), fill=MUTED, anchor='mm')
    save(im, 'variantie')


if __name__ == '__main__':
    only = sys.argv[1:]
    for lang in LANGS:
        infographics(lang)
    posts = built_posts()
    missing = [k for k in posts if k not in ONDERWERP]
    if missing:
        raise SystemExit('Geen onderwerp voor: ' + ', '.join(missing))
    for key, titles in posts.items():
        if only and key not in only:
            continue
        for lang in LANGS:
            cover(key, lang, titles[lang])
    print(f'{len(posts)} artikelen x {len(LANGS)} talen')
