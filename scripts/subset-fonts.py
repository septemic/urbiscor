"""Regenerate the small Romanian supplements to Fontsource's Latin fonts.

Run after pnpm install with Python dependencies fonttools[woff]==4.61.1:
    python scripts/subset-fonts.py
The generated fonts are committed; production builds do not need Python.
"""

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'src/assets/fonts'
# Romanian letters, including legacy cedillas used in some names. Latin,
# punctuation and â/î already come from the original Latin font files.
UNICODES = [0x0102, 0x0103, 0x015E, 0x015F, 0x0162, 0x0163, 0x0218, 0x0219, 0x021A, 0x021B]

OUTPUT.mkdir(parents=True, exist_ok=True)
for family in ('inter', 'manrope'):
    source = ROOT / f'node_modules/@fontsource-variable/{family}/files/{family}-latin-ext-wght-normal.woff2'
    font = TTFont(source, recalcTimestamp=False)
    options = subset.Options()
    options.name_IDs = ['*']  # Preserve attribution and license metadata.
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=UNICODES)
    subsetter.subset(font)
    target = OUTPUT / f'{family}-romanian-wght-normal.woff2'
    font.save(target)
    print(f'{target.relative_to(ROOT)}: {source.stat().st_size:,} → {target.stat().st_size:,} bytes')
