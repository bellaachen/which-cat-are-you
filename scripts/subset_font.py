"""Subset Noto Sans TC (variable) to the characters the app uses.
Usage: python3 scripts/subset_font.py path/to/NotoSansTC[wght].ttf
Run `npm run charset` first; needs fonttools and brotli."""
import sys
from fontTools import subset
from fontTools.ttLib import TTFont

chars = open('scripts/charset.txt', encoding='utf8').read()
chars += ''.join(chr(c) for c in range(32, 127)) + '，。、！？：；「」（）《》…—–～'
options = subset.Options()
options.layout_features = ['*']
font = TTFont(sys.argv[1])
subsetter = subset.Subsetter(options)
subsetter.populate(text=chars)
subsetter.subset(font)
font.flavor = 'woff2'
font.save('src/fonts/NotoSansTC-subset.woff2')
