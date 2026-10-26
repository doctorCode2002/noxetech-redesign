import re, sys, pathlib
root = pathlib.Path(sys.argv[1])
spacing = r'(?:-?(?:m|mx|my|mt|mb|ml|mr|p|px|py|pt|pb|pl|pr|gap|gap-x|gap-y|space-x|space-y|inset|inset-x|inset-y|top|bottom|left|right|scroll-px|scroll-mt))'
pat = re.compile(r'(?<![\w-])(?:[a-z0-9:\[\]&_.-]*:)?(' + spacing + r')-(\d+(?:\.\d+)?|\[[^\]]+\])(?![\w.])')
bad = []
for f in root.rglob('*.tsx'):
    for n, line in enumerate(f.read_text().splitlines(), 1):
        for m in pat.finditer(line):
            v = m.group(2)
            px = None
            if v.startswith('['):
                mm = re.fullmatch(r'\[(-?[\d.]+)(px|rem)\]', v)
                if mm: px = float(mm.group(1)) * (16 if mm.group(2) == 'rem' else 1)
                else: continue  # calc()/em/% etc reviewed by hand
            else:
                px = float(v) * 4
            if px % 4: bad.append(f"{f.relative_to(root)}:{n}  {m.group(0)}  ({px:g}px)")
print("\n".join(bad)); print(len(bad), "off-grid spacing classes")
