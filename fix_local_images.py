from pathlib import Path
import re
import shutil

root = Path(r'c:\Users\guto.rsxavier\Documents\GitHub\metalborracha')
img_dir = root / 'img'
img_dir.mkdir(exist_ok=True)

source_dir = root / 'assets' / 'js'
for item in source_dir.iterdir():
    if item.is_file() and item.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp', '.svg'}:
        target = img_dir / item.name
        if not target.exists():
            shutil.copy2(item, target)

for html in root.glob('*.html'):
    text = html.read_text(encoding='utf-8')
    text = re.sub(
        r'https://assets\.zyrosite\.com/cdn-cgi/image/[^"\']*?/([^"\'\s]+\.(?:png|jpg|jpeg|webp|svg))',
        r'img/\1',
        text,
    )
    text = re.sub(
        r'https://www\.google\.com/maps[^"\'\s]*',
        'img/placeholder-map.jpg',
        text,
    )
    html.write_text(text, encoding='utf-8')

print('OK: local image folder created and HTML image URLs rewritten to local img paths')
