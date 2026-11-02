"""Cut the 16-cat illustration sheet into transparent, label-free assets.

Run: python3 scripts/cut_sheet.py
Reads art/source/sheet.png, writes art/png/<id>.png (1200x1200 master)
and public/cats/<id>.webp + <id>-480.webp.
"""
from pathlib import Path
import cv2
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parent.parent
OUT_PNG = ROOT / 'art/png'
OUT_WEB = ROOT / 'public/cats'
OUT_PNG.mkdir(parents=True, exist_ok=True)
OUT_WEB.mkdir(parents=True, exist_ok=True)

# id: (crop box x0,y0,x1,y1 in sheet pixels, label polygon to erase)
R = lambda x0, y0, x1, y1: [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]
CELLS = {
    'british': ((15, 25, 390, 248), [(15, 10), (180, 10), (180, 50), (150, 66), (150, 76), (60, 95), (15, 98)]),
    'orange': ((420, 0, 790, 250), R(400, 15, 568, 80)),
    'siamese': ((830, 10, 1145, 245), R(780, 15, 945, 75)),
    'black': ((1215, 15, 1530, 245), R(1175, 12, 1313, 90)),
    'ragdoll': ((5, 255, 392, 500), R(10, 262, 167, 338)),
    'bengal': ((420, 255, 742, 488), [(400, 258), (548, 258), (548, 285), (512, 295), (510, 306), (415, 334), (400, 334)]),
    'maine': ((760, 245, 1155, 500), R(790, 262, 916, 322)),
    'russian': ((1180, 250, 1512, 498), R(1165, 262, 1322, 334)),
    'calico': ((20, 492, 385, 734), R(15, 516, 171, 594)),
    'tabby': ((398, 498, 715, 742), [(398, 510), (550, 510), (550, 545), (520, 560), (510, 578), (415, 590), (398, 590)]),
    'white': ((748, 505, 1112, 748), R(760, 516, 900, 584)),
    'norwegian': ((1150, 510, 1525, 745), R(1150, 514, 1298, 586)),
    'sphynx': ((12, 730, 385, 1005), R(15, 765, 171, 830)),
    'abyssinian': ((405, 730, 742, 1010), R(380, 766, 552, 838)),
    'persian': ((755, 765, 1150, 1010), R(780, 756, 926, 834)),
    'tuxedo': ((1165, 745, 1495, 1010), R(1155, 762, 1303, 832)),
}
PAPER = np.array([253, 242, 227], np.uint8)
# neighbouring cats that intrude into a crop
EXTRA_WIPES = {
    'ragdoll': [R(225, 490, 295, 502)],
    'calico': [R(20, 488, 172, 506)],
    'tabby': [R(622, 727, 668, 744)],
    'sphynx': [R(12, 726, 272, 746)],
    'abyssinian': [R(405, 726, 622, 746)],
}
# pale cats whose outlines have gaps need a wider closing radius
# only these cats have real see-through gaps worth keeping open
PAPER_HOLE = {'bengal': 3.0, 'abyssinian': 3.0}
CLOSE_RADIUS = {'white': 29, 'persian': 29}
OPEN_PASSES = {'white': 9, 'persian': 9}


def to_lab(rgb):
    return cv2.cvtColor(rgb, cv2.COLOR_RGB2LAB).astype(np.float32)


def cut(cat, box, poly, sheet):
    work = sheet.copy()
    for shape in [poly, *EXTRA_WIPES.get(cat, [])]:
        cv2.fillPoly(work, [np.array(shape, np.int32)], PAPER.tolist())
    x0, y0, x1, y1 = box
    crop = work[y0:y1, x0:x1]
    # 3x upscale so the soft alpha edge and pencil grain survive
    h, w = crop.shape[:2]
    scale = 1080 / max(w, h)
    big = cv2.resize(crop, (round(w * scale), round(h * scale)), interpolation=cv2.INTER_LANCZOS4)
    blur = cv2.GaussianBlur(big, (0, 0), 1.6)
    big = np.clip(big.astype(np.float32) * 1.45 - blur.astype(np.float32) * 0.45, 0, 255).astype(np.uint8)

    paper_lab = to_lab(PAPER.reshape(1, 1, 3))[0, 0]
    smooth = cv2.GaussianBlur(big, (0, 0), 1.2)
    dist = np.linalg.norm(to_lab(smooth) - paper_lab, axis=2) * (100 / 255)
    # distance is scaled to L*a*b*-like units: lines & fur vs paper grain
    lines = dist > 5.5
    k = CLOSE_RADIUS.get(cat, max(5, round(scale * 2.2))) | 1
    closed = cv2.morphologyEx(lines.astype(np.uint8), cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k)))
    filled = ndi.binary_fill_holes(closed)
    # keep large see-through gaps (e.g. inside a tail loop) open when they are plain paper
    holes, count = ndi.label(filled & ~closed.astype(bool))
    for i in range(1, count + 1):
        region = holes == i
        if region.sum() > 1500 and np.median(dist[region]) < PAPER_HOLE.get(cat, 0):
            filled[region] = False
    filled = ndi.binary_opening(filled, iterations=OPEN_PASSES.get(cat, 3))
    labels, n = ndi.label(filled)
    if n:
        sizes = ndi.sum(filled, labels, range(1, n + 1))
        keep = np.isin(labels, 1 + np.where(sizes > 900)[0])
    else:
        keep = filled
    soft = np.clip((dist - 2.5) / 7, 0, 1)
    solid = cv2.GaussianBlur(keep.astype(np.float32), (0, 0), 1.8)
    alpha = np.maximum(soft ** 0.8, np.clip(solid * 1.6 - 0.3, 0, 1))
    # un-mix paper from semi-transparent pixels
    a = np.maximum(alpha[..., None], 0.02)
    rgb = np.clip((big.astype(np.float32) - (1 - a) * PAPER) / a, 0, 255)
    rgba = np.dstack([rgb, alpha * 255]).astype(np.uint8)

    canvas = Image.new('RGBA', (1200, 1200), (0, 0, 0, 0))
    im = Image.fromarray(rgba, 'RGBA')
    canvas.paste(im, ((1200 - im.width) // 2, (1200 - im.height) // 2 + (1080 - im.height) // 3))
    # trim tightly so every cat fills the same box
    bbox = canvas.getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
    canvas.save(OUT_PNG / f'{cat}.png', optimize=True)
    canvas.save(OUT_WEB / f'{cat}.webp', quality=86, method=6)
    canvas.resize((480, 480), Image.LANCZOS).save(OUT_WEB / f'{cat}-480.webp', quality=82, method=6)
    return bbox


def main():
    sheet = np.array(Image.open(ROOT / 'art/source/sheet.png').convert('RGB'))
    for cat, (box, poly) in CELLS.items():
        print(cat, cut(cat, box, poly, sheet))


if __name__ == '__main__':
    main()
