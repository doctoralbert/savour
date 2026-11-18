# Maakt de zelfverzonnen testrecepten van de vaste testronde (tests/testronde/TESTRONDE.md), geen echte recepten
# van gebruikers. Opnieuw maken (Windows, Pillow nodig): py -3 tests/testronde/maak-testrecepten.py
import os, random, zipfile
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT = os.path.dirname(os.path.abspath(__file__))
os.makedirs(OUT, exist_ok=True)
F = 'C:/Windows/Fonts/'
random.seed(7)

def paper(w, h, color=(244, 238, 222)):
    img = Image.new('RGB', (w, h), color)
    d = ImageDraw.Draw(img)
    for _ in range(4000):
        x, y = random.randrange(w), random.randrange(h)
        c = random.randint(-12, 6)
        d.point((x, y), fill=tuple(max(0, min(255, v + c)) for v in color))
    return img

# 1. Handgeschreven kladje (Ink Free), licht scheef, lijntjes.
def kladje():
    img = paper(1100, 1400)
    d = ImageDraw.Draw(img)
    for y in range(140, 1400, 62):
        d.line((40, y, 1060, y), fill=(170, 190, 215), width=2)
    hand = ImageFont.truetype(F + 'Inkfree.ttf', 46)
    big = ImageFont.truetype(F + 'Inkfree.ttf', 64)
    lines = [
        ('Pommes Duchesse', big),
        ('', hand),
        ('1 kg kruimige aardappel (geschild)', hand),
        ('60 gr boter', hand),
        ('3 eidooiers', hand),
        ('nootmuskaat, zout, peper', hand),
        ('', hand),
        ('- aardappels gaar koken, goed laten', hand),
        ('  uitdampen', hand),
        ('- door de pureeknijper', hand),
        ('- boter + dooiers erdoor, op smaak', hand),
        ('- spuiten met grote stertuit', hand),
        ('- 12 min op 200 graden', hand),
    ]
    y = 70
    for text, font in lines:
        d.text((70 + random.randint(-6, 6), y), text, font=font, fill=(25, 35, 90))
        y += 62 if font is hand else 90
    img = img.rotate(-2.5, expand=True, fillcolor=(60, 55, 50)).filter(ImageFilter.GaussianBlur(0.6))
    img.save(os.path.join(OUT, '1-kladje-handgeschreven.jpg'), quality=82)

# 2. Gedrukt recept (Georgia), gefotografeerd effect.
def gedrukt(name, title, ingredients, steps, extra_top=None):
    img = paper(1100, 1500, (250, 249, 245))
    d = ImageDraw.Draw(img)
    h1 = ImageFont.truetype(F + 'georgiab.ttf', 54)
    h2 = ImageFont.truetype(F + 'georgiab.ttf', 34)
    body = ImageFont.truetype(F + 'georgia.ttf', 30)
    y = 70
    if title:
        d.text((80, y), title, font=h1, fill=(20, 20, 20)); y += 100
    if extra_top:
        d.text((80, y), extra_top, font=body, fill=(60, 60, 60)); y += 60
    if ingredients:
        d.text((80, y), 'Ingrediënten', font=h2, fill=(20, 20, 20)); y += 60
        for i in ingredients:
            d.text((100, y), i, font=body, fill=(30, 30, 30)); y += 46
        y += 30
    if steps:
        d.text((80, y), 'Bereiding', font=h2, fill=(20, 20, 20)); y += 60
        for n, s in enumerate(steps, 1):
            for k, part in enumerate(s):
                d.text((100, y), (f'{n}. ' if k == 0 else '    ') + part, font=body, fill=(30, 30, 30)); y += 44
            y += 12
    img = img.rotate(1.2, expand=True, fillcolor=(90, 80, 70)).filter(ImageFilter.GaussianBlur(0.5))
    img.save(os.path.join(OUT, name), quality=84)

kladje()
gedrukt('2-gedrukt-recept.jpg', 'Gepocheerde peer in rode wijn',
        ['4 handperen (stevig)', '750 ml rode wijn', '150 g suiker', '1 kaneelstokje', '2 steranijs', '1 vanillestokje', 'schil van 1 sinaasappel'],
        [['Schil de peren en laat het steeltje zitten.'],
         ['Breng wijn, suiker en specerijen aan de kook.'],
         ['Pocheer de peren 25 minuten zachtjes, tot een mes', 'er zonder weerstand in gaat.'],
         ['Laat afkoelen in het vocht, het liefst een nacht.'],
         ['Kook het vocht in tot een stroperige saus.']])
# 3. Recept over twee foto's: deel 1 met titel en ingrediënten, deel 2 alleen de rest van de bereiding.
gedrukt('3a-twee-fotos-deel1.jpg', 'Kalfsjus',
        ['2 kg kalfsbotten', '2 uien', '2 wortels', '1 stengel bleekselderij', '2 el tomatenpuree', '250 ml rode port', '4 l water', '1 laurierblad', '6 takjes tijm'],
        [['Rooster de botten 45 minuten op 220 °C, tot ze diep', 'goudbruin zijn.'],
         ['Fruit de groenten in een ruime pan en voeg de', 'tomatenpuree toe; 2 minuten meebakken.']])
gedrukt('3b-twee-fotos-deel2.jpg', None, None,
        [['Blus af met de port en laat tot de helft inkoken.'],
         ['Voeg botten, water en kruiden toe en trek 6 uur', 'zachtjes, regelmatig afschuimen.'],
         ['Passeer door een fijne doek en kook in tot 500 ml.']],
        extra_top='(vervolg)')

# 4. Tekst-PDF (handgemaakt, Helvetica, WinAnsi).
def pdf(path, lines):
    content = ['BT', '/F1 13 Tf', '60 780 Td', '18 TL']
    for size, text in lines:
        t = text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')
        content.append(f'/F1 {size} Tf')
        content.append(f'({t}) Tj T*')
    content.append('ET')
    stream = '\n'.join(content).encode('cp1252')
    objs = [
        b'<< /Type /Catalog /Pages 2 0 R >>',
        b'<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
        b'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
        b'<< /Length ' + str(len(stream)).encode() + b' >>\nstream\n' + stream + b'\nendstream',
        b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    ]
    out = b'%PDF-1.4\n'
    offsets = []
    for i, o in enumerate(objs, 1):
        offsets.append(len(out))
        out += f'{i} 0 obj\n'.encode() + o + b'\nendobj\n'
    xref = len(out)
    out += f'xref\n0 {len(objs)+1}\n0000000000 65535 f \n'.encode()
    for off in offsets:
        out += f'{off:010d} 00000 n \n'.encode()
    out += f'trailer\n<< /Size {len(objs)+1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n'.encode()
    open(path, 'wb').write(out)

pdf(os.path.join(OUT, '4-recept.pdf'), [
    (20, 'Crème brûlée met tonkabonen'), (13, ''), (13, 'Voor 8 personen'), (13, ''),
    (15, 'Ingrediënten'),
    (13, '500 ml room'), (13, '125 ml volle melk'), (13, '6 eidooiers'), (13, '100 g suiker'),
    (13, '1 tonkaboon, geraspt'), (13, 'rietsuiker om te branden'), (13, ''),
    (15, 'Bereiding'),
    (13, '1. Verwarm room, melk en tonkaboon tot tegen de kook en laat 15 minuten trekken.'),
    (13, '2. Klop de dooiers met de suiker los en giet de warme room er al roerend bij.'),
    (13, '3. Zeef, verdeel over 8 schaaltjes en gaar 40 minuten au bain-marie op 100 graden.'),
    (13, '4. Laat minimaal 4 uur opstijven in de koeling.'),
    (13, '5. Bestrooi met rietsuiker en brand met de brander.'),
])

# 5. Word-bestand (handgemaakte docx) met twee recepten.
def docx(path, paras):
    def p(text, style=None):
        t = text.replace('&', '&amp;').replace('<', '&lt;')
        ppr = f'<w:pPr><w:pStyle w:val="{style}"/></w:pPr>' if style else ''
        return f'<w:p>{ppr}<w:r><w:t xml:space="preserve">{t}</w:t></w:r></w:p>'
    body = ''.join(p(t, s) for s, t in paras)
    doc = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
           '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'
           + body + '</w:body></w:document>')
    styles = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
              '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
              '<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:rPr><w:b/><w:sz w:val="36"/></w:rPr></w:style>'
              '<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:rPr><w:b/><w:sz w:val="28"/></w:rPr></w:style>'
              '</w:styles>')
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>')
        z.writestr('_rels/.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>')
        z.writestr('word/_rels/document.xml.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>')
        z.writestr('word/document.xml', doc)
        z.writestr('word/styles.xml', styles)

docx(os.path.join(OUT, '5-recepten.docx'), [
    ('Heading1', 'Sauce hollandaise'),
    ('Heading2', 'Ingrediënten'),
    (None, '3 eidooiers'), (None, '250 g geklaarde boter'), (None, '2 el water'), (None, 'sap van ½ citroen'), (None, 'zout en cayennepeper'),
    ('Heading2', 'Bereiding'),
    (None, 'Klop de dooiers met het water au bain-marie tot een luchtige sabayon.'),
    (None, 'Voeg van het vuur de warme boter in een dun straaltje toe, al kloppend.'),
    (None, 'Breng op smaak met citroensap, zout en cayennepeper.'),
    ('Heading1', 'Vinaigrette'),
    ('Heading2', 'Ingrediënten'),
    (None, '1 el dijonmosterd'), (None, '3 el witte wijnazijn'), (None, '9 el zonnebloemolie'), (None, 'zout, peper'),
    ('Heading2', 'Bereiding'),
    (None, 'Meng mosterd en azijn, klop de olie er in een straaltje door en breng op smaak.'),
])

# 6-8. Tekstbronnen om te plakken.
open(os.path.join(OUT, '6-platte-tekst.txt'), 'w', encoding='utf-8').write(
"""Risotto met paddenstoelen
4 personen

300 g risottorijst
1 sjalot
150 ml witte wijn
1,2 l kippenbouillon
250 g gemengde paddenstoelen
50 g Parmezaanse kaas
40 g koude boter

Fruit de sjalot glazig in een scheut olie. Voeg de rijst toe en roer tot hij glanst.
Blus af met de wijn en laat verdampen.
Voeg de warme bouillon met een soeplepel tegelijk toe, steeds roeren, ongeveer 18 minuten.
Bak intussen de paddenstoelen goudbruin.
Roer van het vuur de boter en kaas erdoor en schep de paddenstoelen erdoor.
""")
open(os.path.join(OUT, '7-chatgpt-markdown.txt'), 'w', encoding='utf-8').write(
"""# Bloemkoolcrème met hazelnoot

**Ingredients:** 1 bloemkool, 1 ui, 50 g boter, 500 ml groentebouillon, 200 ml room, 40 g geroosterde hazelnoten, zout, nootmuskaat

**Method**
1. Snijd de bloemkool en ui grof en stoof ze 5 minuten in de boter.
2. Voeg de bouillon toe en kook 20 minuten gaar.
3. Voeg de room toe, pureer glad en breng op smaak met zout en nootmuskaat.
4. Serveer met grof gehakte hazelnoten.

(Source: ChatGPT)
""")
open(os.path.join(OUT, '8-allergeenletters.txt'), 'w', encoding='utf-8').write(
"""Kaiserschmarrn
4 Portionen

4 Eier C
250 ml Milch G
120 g Mehl A
30 g Zucker
1 Prise Salz
40 g Butter G
50 g Rosinen
Staubzucker

Eier trennen. Dotter mit Milch, Mehl und Salz glatt rühren.
Eiweiß mit Zucker steif schlagen und unterheben.
Butter in einer Pfanne schmelzen, Teig eingießen, Rosinen darüber streuen.
Unterseite goldbraun backen, wenden, mit zwei Gabeln in Stücke reißen.
Mit Staubzucker bestreuen.
""")
print(sorted(os.listdir(OUT)))
