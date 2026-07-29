"""Decode every HEIC in photos-source/ to a high-quality JPEG sibling.

    py -m pip install pillow pillow-heif
    py scripts/convert-heic.py

Why this exists: sharp's bundled libheif rejects iPhone HDR HEICs with
"Number of references in iref box (48) exceeds the security limits of 16".
pillow-heif decodes them without complaint, so we decode once here and let
export-photos.mjs work from the JPEG.

Output lands beside the original as <name>-converted.jpg inside
photos-source/, which is gitignored - nothing here enters the repo. Existing
conversions are skipped, so re-running is cheap.
"""

from pathlib import Path

from PIL import Image, ImageOps
import pillow_heif

pillow_heif.register_heif_opener()

SRC = Path(__file__).resolve().parent.parent / "photos-source"

converted = skipped = failed = 0

for heic in sorted(SRC.rglob("*.heic")) + sorted(SRC.rglob("*.HEIC")):
    out = heic.with_name(f"{heic.stem}-converted.jpg")
    if out.exists():
        skipped += 1
        continue
    try:
        im = ImageOps.exif_transpose(Image.open(heic)).convert("RGB")
        # quality 95: this is an intermediate, not a deliverable. sharp does
        # the real downscale and WebP encode afterwards.
        im.save(out, "JPEG", quality=95, subsampling=0)
        print(f"  {heic.name} -> {out.name}  ({im.width}x{im.height})")
        converted += 1
    except Exception as e:  # noqa: BLE001
        print(f"  FAILED {heic.name}: {e}")
        failed += 1

print(f"\nconverted {converted}, skipped {skipped} (already done), failed {failed}")
