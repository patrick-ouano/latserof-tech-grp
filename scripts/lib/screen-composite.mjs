/**
 * Composite an image onto the projection screen in a room photo.
 *
 * The screen in `hero-cinema-theater.webp` is a blank white rectangle seen at
 * an angle, so putting content on it is a perspective warp, not a paste. This
 * module solves the homography from the content rectangle to the four screen
 * corners, inverse-maps every destination pixel through it, and then blends
 * the result so it reads as *projected* rather than pasted:
 *
 *   - the screen's own luminance falloff is carried through as a multiply, so
 *     the projector hotspot and the dim upper-left corner survive;
 *   - the edges are supersampled, because a hard-clipped quad on a photo is
 *     the single most obvious tell that something was composited in.
 *
 * Corners are measured in the coordinate space of the *exported* hero
 * (2400x1350), not the camera original — the export is a pure downscale of a
 * 16:9 source, so there is no crop to account for, and measuring against the
 * shipped file is the thing anyone can re-check.
 */

/**
 * Solve the 8 unknowns of a homography mapping four `from` points to four
 * `to` points. Straight DLT: two rows per correspondence, then Gaussian
 * elimination with partial pivoting.
 *
 * Returns [h0..h7] where
 *   x' = (h0*x + h1*y + h2) / (h6*x + h7*y + 1)
 *   y' = (h3*x + h4*y + h5) / (h6*x + h7*y + 1)
 */
export function homography(from, to) {
  const A = [];
  const b = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = from[i];
    const [X, Y] = to[i];
    A.push([x, y, 1, 0, 0, 0, -x * X, -y * X]);
    b.push(X);
    A.push([0, 0, 0, x, y, 1, -x * Y, -y * Y]);
    b.push(Y);
  }

  const n = 8;
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(A[r][col]) > Math.abs(A[pivot][col])) pivot = r;
    }
    if (Math.abs(A[pivot][col]) < 1e-12) {
      throw new Error("degenerate quad: corners are collinear or coincident");
    }
    [A[col], A[pivot]] = [A[pivot], A[col]];
    [b[col], b[pivot]] = [b[pivot], b[col]];

    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = A[r][col] / A[col][col];
      if (f === 0) continue;
      for (let c = col; c < n; c++) A[r][c] -= f * A[col][c];
      b[r] -= f * b[col];
    }
  }

  return b.map((v, i) => v / A[i][i]);
}

const apply = (h, x, y) => {
  const d = h[6] * x + h[7] * y + 1;
  return [(h[0] * x + h[1] * y + h[2]) / d, (h[3] * x + h[4] * y + h[5]) / d];
};

/** Signed area of the triangle abc; sign tells which side of ab that c is. */
const cross = (ax, ay, bx, by, cx, cy) =>
  (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);

/**
 * Is (x, y) inside the convex quad? The quad is given in TL, TR, BR, BL
 * order, so every edge cross-product must share a sign.
 */
function insideQuad(quad, x, y) {
  let neg = false;
  let pos = false;
  for (let i = 0; i < 4; i++) {
    const [ax, ay] = quad[i];
    const [bx, by] = quad[(i + 1) % 4];
    const c = cross(ax, ay, bx, by, x, y);
    if (c < 0) neg = true;
    else if (c > 0) pos = true;
    if (neg && pos) return false;
  }
  return true;
}

/** Bilinear sample of an RGB raw buffer. Clamps at the edges. */
function sample(buf, w, h, ch, u, v, out) {
  const x = Math.min(Math.max(u, 0), w - 1.001);
  const y = Math.min(Math.max(v, 0), h - 1.001);
  const x0 = x | 0;
  const y0 = y | 0;
  const fx = x - x0;
  const fy = y - y0;
  const i00 = (y0 * w + x0) * ch;
  const i10 = i00 + ch;
  const i01 = i00 + w * ch;
  const i11 = i01 + ch;
  for (let c = 0; c < 3; c++) {
    const top = buf[i00 + c] * (1 - fx) + buf[i10 + c] * fx;
    const bot = buf[i01 + c] * (1 - fx) + buf[i11 + c] * fx;
    out[c] = top * (1 - fy) + bot * fy;
  }
}

/**
 * Warp `content` onto `quad` inside a `baseW` x `baseH` canvas.
 *
 * @param content  { data, width, height, channels } raw RGB(A) of the image
 *                 to show on the screen
 * @param quad     [TL, TR, BR, BL] in base-image pixel coordinates
 * @param base     { data, width, height, channels } raw RGB(A) of the room
 *                 photo, read for the screen's own luminance
 * @param opts.supersample   samples per axis per pixel (edge AA + downscale)
 * @param opts.lightFloor    how much of the screen's falloff to keep. 1 keeps
 *                           none (flat, pasted-looking); 0 keeps all (crushes
 *                           the dim corner to black).
 * @param opts.opacity       overall strength of the composite
 *
 * @returns { data, width, height } an RGBA overlay to composite at 0,0
 */
export function warpOntoQuad(content, quad, base, opts = {}) {
  const { supersample = 3, lightFloor = 0.55, opacity = 1 } = opts;

  const cw = content.width;
  const chh = content.height;
  const cch = content.channels;
  const bch = base.channels;

  // Destination -> content, so we can inverse-map and avoid holes.
  const inv = homography(quad, [
    [0, 0],
    [cw, 0],
    [cw, chh],
    [0, chh],
  ]);

  const xs = quad.map((p) => p[0]);
  const ys = quad.map((p) => p[1]);
  const bx0 = Math.max(0, Math.floor(Math.min(...xs)) - 2);
  const bx1 = Math.min(base.width - 1, Math.ceil(Math.max(...xs)) + 2);
  const by0 = Math.max(0, Math.floor(Math.min(...ys)) - 2);
  const by1 = Math.min(base.height - 1, Math.ceil(Math.max(...ys)) + 2);

  // Reference white for the screen: the bright end of what is actually there,
  // so the multiply normalises against the lit screen rather than 255.
  const lums = [];
  for (let y = by0; y <= by1; y += 2) {
    for (let x = bx0; x <= bx1; x += 2) {
      if (!insideQuad(quad, x + 0.5, y + 0.5)) continue;
      const i = (y * base.width + x) * bch;
      lums.push(
        0.2126 * base.data[i] + 0.7152 * base.data[i + 1] + 0.0722 * base.data[i + 2],
      );
    }
  }
  lums.sort((a, b) => a - b);
  const white = Math.max(1, lums[Math.floor(lums.length * 0.97)] || 255);

  const out = new Uint8ClampedArray(base.width * base.height * 4); // zeroed = transparent
  const step = 1 / supersample;
  const offset = step / 2;
  const rgb = [0, 0, 0];

  for (let y = by0; y <= by1; y++) {
    for (let x = bx0; x <= bx1; x++) {
      let r = 0,
        g = 0,
        b = 0,
        hits = 0;

      for (let sy = 0; sy < supersample; sy++) {
        for (let sx = 0; sx < supersample; sx++) {
          const px = x + offset + sx * step;
          const py = y + offset + sy * step;
          if (!insideQuad(quad, px, py)) continue;
          const [u, v] = apply(inv, px, py);
          sample(content.data, cw, chh, cch, u, v, rgb);
          r += rgb[0];
          g += rgb[1];
          b += rgb[2];
          hits++;
        }
      }

      if (!hits) continue;
      const total = supersample * supersample;
      r /= hits;
      g /= hits;
      b /= hits;

      // Carry the screen's own lighting through, so the projected image
      // inherits the hotspot and the falloff instead of looking flat.
      const i = (y * base.width + x) * bch;
      const lum =
        0.2126 * base.data[i] + 0.7152 * base.data[i + 1] + 0.0722 * base.data[i + 2];
      const shade = lightFloor + (1 - lightFloor) * Math.min(1, lum / white);

      const o = (y * base.width + x) * 4;
      out[o] = r * shade;
      out[o + 1] = g * shade;
      out[o + 2] = b * shade;
      // Partial coverage at the quad edge is the anti-aliasing.
      out[o + 3] = (hits / total) * 255 * opacity;
    }
  }

  return { data: Buffer.from(out.buffer), width: base.width, height: base.height };
}
