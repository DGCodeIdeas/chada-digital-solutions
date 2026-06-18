## Plan: Simplified "C." favicon

Replace the current favicon (full Chada mark) with a minimal mark consisting of just the letter **C** and the brand dot. At small sizes (16–32px), the current mark loses detail and looks muddy — a single bold "C" with the accent dot reads clearly even at 16px.

### Steps

1. **Generate a new square favicon source** (`public/favicon-source.png`, 512×512):
   - Bold "C" in the brand typeface (Outfit/Playfair, matching the wordmark)
   - Brand-accent dot positioned to the lower right of the C
   - Transparent background, generous padding so it doesn't look cramped
   - Brand color for both glyphs (matching existing logo color)

2. **Regenerate favicon files** from the new source using imagemagick:
   - `public/favicon.ico` (multi-size: 16, 32, 48)
   - `public/favicon-32.png` (32×32)
   - `public/apple-touch-icon.png` (180×180, on solid brand background for iOS — iOS masks transparency)

3. **Bump cache-bust query** in `src/routes/__root.tsx` from `?v=3` → `?v=4` on all three favicon `<link>` tags so browsers fetch the new files.

4. **Verify** by viewing the generated PNG/ICO files to confirm the C + dot reads cleanly at 32px.

### Open question

Should the dot sit **inside the C's opening** (compact, modern) or **outside to the lower-right** (classic wordmark style, matches the existing "Chada." logo)? Default: outside lower-right to match the existing brand mark.
