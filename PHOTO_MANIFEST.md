# Photo manifest — Latserof Tech Grp source photos

Raw folder: `Latserof Tech Grp/` (19 files). Fill in the **Category** and **Use** columns with Thomas before importing into the site. Category options: `hero`, `residential`, `commercial`, `surveillance`, `skip`.

| # | Filename | Dimensions | Orientation | Notes | Category | Use |
|---|----------|-----------|-------------|-------|----------|-----|
| 1 | 20120907_135926.jpg | 2048×1536 | Landscape | Decent res | | |
| 2 | 20121201_161605.jpg | 2048×1536 | Landscape | Decent res | | |
| 3 | 20121204_131102.jpg | 3264×2448 | Landscape | High-res | | |
| 4 | 20130829_115446.jpg | 1151×2048 | Portrait | Lower width | | |
| 5 | 20160525_162737.jpg | 1944×2592 | Portrait | Good res | | |
| 6 | 20170128_192202.jpg | 1458×2592 | Portrait | Good res | | |
| 7 | 20170509_170045.jpg | 2592×1944 | Landscape | Good res | | |
| 8 | 20170922_150131.jpg | 1440×2560 | Portrait | Good res | | |
| 9 | 20180906_134352.jpg | 1440×2560 | Portrait | Good res | | |
| 10 | 20191011_175946.jpg | 1960×4032 | Tall portrait | Needs cropping for web use | | |
| 11 | 4922FD94-...JPG | 2560×1184 | Wide banner crop | Part of a matching set of 5 | | |
| 12 | 6F2599DD-...JPG | 2560×1184 | Wide banner crop | Part of a matching set of 5 | | |
| 13 | C453024D-...JPG | 2560×1184 | Wide banner crop | Part of a matching set of 5 | | |
| 14 | DFDE9183-...JPG | 2560×1184 | Wide banner crop | Part of a matching set of 5 | | |
| 15 | F4B53491-...JPG | 2560×1184 | Wide banner crop | Part of a matching set of 5 | | |
| 16 | Foerstal 676.JPG | 480×320 | Landscape | **Too low-res for hero/cards — thumbnail only or skip** | | skip (recommended) |
| 17 | IMG_4002.heic | 4032×2268 (converted) | Landscape | **Was HEIC — converted copy provided as IMG_4002-converted.jpg** | | |
| 18 | Samsung photos 1069.jpg | 1024×768 | Landscape | Low-res, thumbnail only | | |
| 19 | Samsung photos 1295.jpg | 1024×768 | Landscape | Low-res, thumbnail only | | |

## What the homepage actually needs (per design handoff)
- **1 hero image** — landscape, dark/moody works best (spec applies `brightness(.86)` filter), min-height 600px at 1280px canvas. Candidates: #3, #7, #17 (all high-res landscape).
- **3 project cards** — one each: Residential (Windermere great-room cinema), Commercial (Orlando boardroom AV), Surveillance (Kissimmee 16-camera retail). The five wide-crop files (#11–15) are natural fits if they show the right subjects.

## Before importing to the repo
1. Confirm categories above with Thomas.
2. Re-export selected images as WebP/AVIF at reasonable widths (hero ~1600px wide, cards ~800px wide) — don't ship 4000px+ originals to a browser.
3. Rename descriptively: `hero-cinema-room.webp`, `project-residential-windermere.webp`, etc. Claude Code (and future-you) will thank you.
