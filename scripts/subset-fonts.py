"""Regenerate Latin and Romanian fonts for the site's 400–800 weight range.

Run after pnpm install with Python dependencies fonttools[woff]==4.61.1:
    python scripts/subset-fonts.py
The generated fonts are committed; production builds do not need Python.
"""

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'src/assets/fonts'
# Romanian letters, including legacy cedillas used in some names. Latin,
# punctuation and â/î come from the separate Latin subset.
UNICODES = [0x0102, 0x0103, 0x015E, 0x015F, 0x0162, 0x0163, 0x0218, 0x0219, 0x021A, 0x021B]

OUTPUT.mkdir(parents=True, exist_ok=True)
for family in ('inter', 'manrope'):
    for language in ('latin', 'romanian'):
        upstream = 'latin' if language == 'latin' else 'latin-ext'
        source = ROOT / f'node_modules/@fontsource-variable/{family}/files/{family}-{upstream}-wght-normal.woff2'
        font = TTFont(source, recalcTimestamp=False)
        options = subset.Options()
        options.name_IDs = ['*']  # Preserve attribution and license metadata.
        options.layout_features = ['*']  # Keep shaping, kerning and number features.
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(unicodes=list(font.getBestCmap()) if language == 'latin' else UNICODES)
        subsetter.subset(font)
        # Every current text style uses 400, 500, 600, 700 or 800. Keep variable
        # interpolation within that range, removing unused lighter/heavier masters.
        instantiateVariableFont(font, {'wght': (400, 800)}, inplace=True)
        target = OUTPUT / f'{family}-{language}-wght-normal.woff2'
        font.save(target)
        print(f'{target.relative_to(ROOT)}: {source.stat().st_size:,} → {target.stat().st_size:,} bytes')
