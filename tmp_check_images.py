import os, re
root = r'D:\GitHub\metalborracha'
pat = re.compile(r'src=["\']([^"\']+)["\']', re.I)
missing = []
for dirpath, _, filenames in os.walk(root):
    for fn in filenames:
        if fn.endswith('.html'):
            p = os.path.join(dirpath, fn)
            text = open(p, 'r', encoding='utf-8', errors='ignore').read()
            for src in pat.findall(text):
                if src.startswith(('http', 'data:', '#')):
                    continue
                if src.startswith('assets/'):
                    rel = os.path.join(root, *src.split('/'))
                    if not os.path.exists(rel):
                        missing.append((os.path.relpath(p, root), src))
print('MISSING', len(missing))
for p, src in missing:
    print(f'{p} -> {src}')
