/**
 * Builds the "racing pixels" mask for the services rows: an SVG a bit over twice
 * the row's width, opaque on the left, empty on the right, with a dithered band of
 * pixels in between. Sliding it across reveals the fill as pixels running to the end.
 */
export function pixelMask(cols = 92, rows = 8, band = 26, seed = 11) {
  let s = seed;
  const rand = () => ((s = (s * 1664525 + 1013904223) % 4294967296), s / 4294967296);
  // Layout, in pixel columns: [opaque: cols][dithered band: band][empty: cols].
  // Each end state of the slide shows only the solid or only the empty part.
  const total = cols * 2 + band;
  const rects: string[] = [`<rect width="${cols}" height="${rows}"/>`];
  for (let c = 0; c < band; c++) {
    for (let r = 0; r < rows; r++) {
      // Density falls off across the band; a little noise keeps the edge ragged.
      const p = 1 - (c + 0.5) / band;
      if (rand() < p * p + 0.08 * (rand() - 0.5)) rects.push(`<rect x="${cols + c}" y="${r}" width="1" height="1"/>`);
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${rows}" preserveAspectRatio="none" shape-rendering="crispEdges" fill="#000">${rects.join("")}</svg>`;
  return {
    "--px": `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    "--px-size": `${((total / cols) * 100).toFixed(3)}% 100%`,
  };
}
