"""Static site integrity checks. Python standard library only."""
import json,re,sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote,urlsplit

root=Path(__file__).resolve().parents[1]
errors=[]
class References(HTMLParser):
    def __init__(self):super().__init__();self.links=[];self.ids=[]
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs:self.ids.append(attrs['id'])
        if tag in ('script','img','iframe','source') and attrs.get('src'):self.links.append(attrs['src'])
        if tag in ('link','a') and attrs.get('href'):self.links.append(attrs['href'])
        if tag=='img' and ('alt' not in attrs or 'width' not in attrs or 'height' not in attrs):errors.append('Image missing alt or dimensions')
for page in root.rglob('*.html'):
    parser=References();parser.feed(page.read_text(encoding='utf-8'))
    if len(parser.ids)!=len(set(parser.ids)):errors.append(f'{page.relative_to(root)}: duplicate element IDs')
    for link in parser.links:
        url=urlsplit(link)
        if url.scheme or url.netloc:continue
        target=(page.parent/unquote(url.path)).resolve() if url.path else page
        if target.is_dir():target=target/'index.html'
        if not target.is_relative_to(root):errors.append(f'{page.name}: path leaves project: {link}')
        elif not target.is_file():errors.append(f'{page.relative_to(root)}: broken local reference: {link}')
        elif url.fragment and target.suffix=='.html':
            p=References();p.feed(target.read_text(encoding='utf-8'))
            if unquote(url.fragment) not in p.ids:errors.append(f'{page.name}: missing anchor: {link}')
for css in (root/'assets').glob('*.css'):
    for value in re.findall(r'url\([\"\']?([^\)\"\']+)',css.read_text(encoding='utf-8')):
        if not urlsplit(value).scheme and not (css.parent/value).is_file():errors.append(f'{css.name}: missing asset {value}')
for path in root.rglob('*'):
    if '.git' in path.parts or not path.is_file():continue
    if path.stat().st_size>=100*1024*1024:errors.append(f'{path.name}: exceeds ordinary GitHub file limit')
    if path.suffix.lower() in ('.jpg','.jpeg','.webp','.heic'):errors.append(f'Unexpected photo asset: {path.relative_to(root)}')
    if path.name in ('model_3D','model3d-audit.json','portrait-female.json','portrait-woman.json','portrait-getty.json','portrait-fei.json'):errors.append(f'Unexpected user-photo dataset: {path.name}')
provenance=json.loads((root/'docs/demo-provenance.json').read_text())
if provenance.get('source')!='https://github.com/keijiro/InfiniteScan':errors.append('Demo provenance missing')
if provenance.get('controlPoints')!=128:errors.append('Unexpected control-point count')
if errors:
    print('\n'.join(errors));sys.exit(1)
print('PASS: local links, anchors, fonts, file sizes, 128 controls, reference provenance, and no photo datasets.')
