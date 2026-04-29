/**
 * hexToBlurDataURL
 *
 * Generates a valid base64-encoded 1×1 PNG data URL from a hex color.
 * Used as `blurDataURL` for next/image `placeholder="blur"`.
 *
 * Technique: hand-builds the minimal PNG binary (signature + IHDR + IDAT + IEND)
 * using pure TypeScript — zero dependencies, works in both Node.js (SSR) and the browser.
 *
 * Math:
 *   • CRC-32 (standard PNG chunk integrity)
 *   • Adler-32 (zlib stream checksum) — closed-form for 4 input bytes:
 *       s1 = 1 + r + g + b
 *       s2 = 4 + 3r + 2g + b
 *     Both are guaranteed < 65521, so no modulo is needed.
 *
 * References:
 *   https://www.w3.org/TR/PNG/ (section 5: chunk layout, section 10: IHDR/IDAT/IEND)
 *   https://www.zlib.net/manual.html (zlib header format)
 *   RFC 1951 (DEFLATE stored block)
 */

// ─── Helpers ────────────────────────────────────────────────────

/** Pack a 32-bit unsigned integer into 4 bytes, big-endian. */
function u32be(n: number): number[] {
    return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff]
}

/**
 * CRC-32 as required by PNG.
 * Input is a flat array of byte values (numbers 0–255).
 */
function crc32(bytes: number[]): number {
    let crc = 0xffffffff
    for (const byte of bytes) {
        crc ^= byte
        for (let k = 0; k < 8; k++) {
            crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1
        }
    }
    return (crc ^ 0xffffffff) >>> 0
}

/**
 * Build a PNG chunk:  [length | type | data | CRC32(type+data)]
 * `type` must be exactly 4 ASCII characters.
 */
function pngChunk(type: string, data: number[]): number[] {
    const t = [...type].map(c => c.charCodeAt(0))
    const crc = crc32([...t, ...data])
    return [...u32be(data.length), ...t, ...data, ...u32be(crc)]
}

// ─── Public API ─────────────────────────────────────────────────

/**
 * Returns a `data:image/png;base64,...` string containing a 1×1 pixel
 * solid-color PNG matching the given hex color.
 *
 * Falls back to a neutral dark (#111111) if the input cannot be parsed.
 *
 * @example
 * hexToBlurDataURL('#3a85ea')  // → "data:image/png;base64,..."
 */
export function hexToBlurDataURL(hex: string): string {
    // Normalise: strip leading '#', expand 3-digit shorthand
    const raw = hex.replace(/^#/, '')
    const expanded = raw.length === 3
        ? raw.split('').map(c => c + c).join('')
        : raw

    const r = parseInt(expanded.slice(0, 2), 16)
    const g = parseInt(expanded.slice(2, 4), 16)
    const b = parseInt(expanded.slice(4, 6), 16)

    // If parsing fails (NaN), fall back to a near-black neutral
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        return hexToBlurDataURL('#111111')
    }

    // ── Adler-32 of the DEFLATE raw data: [filter=0x00, r, g, b] ──────
    // Closed-form for 4 bytes (both sums < 65521, no mod needed):
    const s1 = 1 + r + g + b
    const s2 = 4 + 3 * r + 2 * g + b

    // ── Assemble PNG binary ───────────────────────────────────────────
    const png: number[] = [
        // PNG signature (always fixed)
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,

        // IHDR chunk — 1×1 pixel, 8-bit, RGB (colorType=2)
        ...pngChunk('IHDR', [
            0, 0, 0, 1,  // width  = 1
            0, 0, 0, 1,  // height = 1
            8,           // bit depth
            2,           // color type: RGB
            0, 0, 0,     // compression / filter / interlace (all 0)
        ]),

        // IDAT chunk — zlib-wrapped DEFLATE stored block (no compression)
        ...pngChunk('IDAT', [
            0x78, 0x01,        // zlib header  (CMF=0x78, FLG=0x01; check: 0x7801%31==0 ✓)
            0x01,              // DEFLATE block: BFINAL=1, BTYPE=0b00 (stored)
            0x04, 0x00,        // LEN  = 4 (little-endian)
            0xfb, 0xff,        // NLEN = ~4 = 0xFFFB (little-endian, one's complement)
            0x00, r, g, b,     // raw scanline: filter=None (0x00) + RGB pixel
            ...u32be((s2 << 16) | s1), // Adler-32 checksum (big-endian)
        ]),

        // IEND chunk — always empty, CRC is always 0xAE426082
        ...pngChunk('IEND', []),
    ]

    // btoa() is available in both Node 16+ and all modern browsers
    return 'data:image/png;base64,' + btoa(String.fromCharCode(...png))
}
