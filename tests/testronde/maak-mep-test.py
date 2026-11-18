# Maakt de MEP-testbestanden voor de testronde (zelf verzonnen gerechten, nooit lijsten van gebruikers):
#   9-mep-garde.xlsx   Excel zoals een keukenlijst: titel, gerechten vet, banqueting als eigen kolom, opmerking ernaast
#   10-mep-patisserie.txt  tekst om te plakken
# Zonder extra bibliotheken: een .xlsx is een zip met XML.
# Draaien: py -3 tests/testronde/maak-mep-test.py
import os, zipfile
from xml.sax.saxutils import escape

HERE = os.path.dirname(os.path.abspath(__file__))

# (cel, tekst, vet)
CELLS = [
    ('B1', 'MEP Garde', True),
    ('B2', 'Voor 1', True), ('B3', 'Bietentartaar', True),
    ('B4', 'biet tartaar 60 gram'), ('C4', 'met sjalot en kappertjes'),
    ('B5', 'mierikswortel crème'),
    ('B6', 'rogge krokant 2x'),
    ('B7', 'zuring geplukt'),
    ('B9', 'Voor 2 · Makreel', True),
    ('B10', 'makreel gebrand 40 gr'),
    ('B11', 'komkommer gel'),
    ('B12', 'dille olie'),
    ('B13', 'radijs 3'),
    ('B14', 'Brood uit vriezer', True),
    ('B15', 'Hoofd', True),
    ('B16', 'Lamsrug 120gr'),
    ('B17', 'lamsjus'),
    ('B18', 'aubergine +- 80 gram'),
    ('E2', 'banqueting', True),
    ('F3', 'Voor · Zalm', True),
    ('F4', 'zalm gemarineerd 50 gram'),
    ('F5', 'mosterd dille saus'),
    ('F7', 'Hoofd · Kip', True),
    ('F8', 'kippendij 1 stuk pp'),
    ('F9', 'pommes fondant 2x'),
]

EXPECT = """Verwacht na importeren (controlescherm):
- naam "MEP Garde"; 2 kaarten: "À la carte" (door Savour toegevoegd) en "banqueting"
- kopjes: "Voor 1 · Bietentartaar", "Voor 2 · Makreel", "Hoofd", "Voor · Zalm", "Hoofd · Kip"
- biet tartaar 60 g met opmerking "met sjalot en kappertjes"; rogge krokant 2 st; makreel gebrand 40 g
- "radijs 3" geel (getal zonder eenheid); "aubergine" 80 g geel (ongeveer)
- "Brood uit vriezer" onderdeel van Voor 2, geel (kopje of onderdeel?)
- Lamsrug 120 g; kippendij 1 stuk; pommes fondant 2 st; 5 kopjes, 16 onderdelen, 4 om na te kijken
"""

def col_num(ref):
    letters = ''.join(c for c in ref if c.isalpha())
    n = 0
    for ch in letters:
        n = n * 26 + ord(ch) - 64
    return n, int(''.join(c for c in ref if c.isdigit()))

def make_xlsx(path):
    strings = []
    rows = {}
    for cell in CELLS:
        ref, text = cell[0], cell[1]
        bold = len(cell) > 2 and cell[2]
        strings.append(text)
        c, r = col_num(ref)
        rows.setdefault(r, []).append((c, ref, len(strings) - 1, bold))
    sheet_rows = []
    for r in sorted(rows):
        cells = ''.join(
            f'<c r="{ref}" t="s" s="{1 if bold else 0}"><v>{i}</v></c>' for c, ref, i, bold in sorted(rows[r])
        )
        sheet_rows.append(f'<row r="{r}">{cells}</row>')
    ns = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'
    files = {
        '[Content_Types].xml': '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/></Types>',
        '_rels/.rels': '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
        'xl/workbook.xml': f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="{ns}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Blad1" sheetId="1" r:id="rId1"/></sheets></workbook>',
        'xl/_rels/workbook.xml.rels': '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/></Relationships>',
        'xl/styles.xml': f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="{ns}"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="1"><fill><patternFill patternType="none"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs></styleSheet>',
        'xl/sharedStrings.xml': f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><sst xmlns="{ns}" count="{len(strings)}" uniqueCount="{len(strings)}">'
        + ''.join(f'<si><t xml:space="preserve">{escape(s)}</t></si>' for s in strings)
        + '</sst>',
        'xl/worksheets/sheet1.xml': f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="{ns}"><sheetData>{"".join(sheet_rows)}</sheetData></worksheet>',
    }
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
        for name, data in files.items():
            z.writestr(name, data)

TEXT = """MEP Patisserie

Dessert 1 · Appel
appel tarte tatin 1 stuk pp
vanille ijs 50 gram
calvados saus (warm houden)

Friandises
macaron 2x
truffel

Banqueting

Dessert
chocolade bavarois 70 gr
rood fruit
"""

if __name__ == '__main__':
    make_xlsx(os.path.join(HERE, '9-mep-garde.xlsx'))
    with open(os.path.join(HERE, '10-mep-patisserie.txt'), 'w', encoding='utf-8', newline='\n') as f:
        f.write(TEXT)
    print('Gemaakt: 9-mep-garde.xlsx, 10-mep-patisserie.txt')
    print(EXPECT)
