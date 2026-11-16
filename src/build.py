# Assemble content.js + shell.html (+ polices, image d'accueil, mot de passe) en index.html.
# Usage : python build.py   (dans le dossier src) ; écrit src/index.html ET ../index.html
# Mot de passe : première ligne de acces.txt (dans src). Fichier absent ou vide = pas de mot de passe.
import base64, hashlib, os
here = os.path.dirname(os.path.abspath(__file__))
rd = lambda n: open(os.path.join(here, n), encoding='utf-8').read()
b64 = lambda p: base64.b64encode(open(os.path.join(here, p), 'rb').read()).decode()
s, c = rd('shell.html'), rd('content.js')
for k in ('/*__CONTENT__*/', '/*__IMG__*/', '/*__ACCES__*/', '/*__FONTS__*/'):
    assert k in s, k
FONTS = [('Barlow Condensed', 'italic', 700, 'barlow-condensed-latin-700-italic.woff2'),
         ('Barlow Condensed', 'italic', 800, 'barlow-condensed-latin-800-italic.woff2'),
         ('Barlow', 'normal', 400, 'barlow-latin-400-normal.woff2'),
         ('Barlow', 'normal', 600, 'barlow-latin-600-normal.woff2')]
fonts = ''.join("@font-face{font-family:'%s';font-style:%s;font-weight:%d;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2')}\n" % (f, st, w, b64('fonts/' + fn)) for f, st, w, fn in FONTS)
pw = ''
try: pw = rd('acces.txt').splitlines()[0].strip()
except (OSError, IndexError): pass
acces = ''
if pw:
    salt = 'gk99'
    acces = salt + ':' + hashlib.sha256((salt + ':' + pw).encode('utf-8')).hexdigest()
out = s.replace('/*__FONTS__*/', fonts).replace('/*__IMG__*/', b64('accueil.jpg')).replace('/*__ACCES__*/', acces).replace('/*__CONTENT__*/', c)
for d in (here, os.path.dirname(here)):
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(out)
print('index.html écrit —', 'mot de passe activé' if acces else 'SANS mot de passe')
