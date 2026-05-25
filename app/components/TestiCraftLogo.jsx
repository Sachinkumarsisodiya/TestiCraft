/**
 * TestiCraftLogo — Reusable Logo Component
 *
 * Uses the official TestiCraft brand logo image.
 * Supports multiple size variants and icon-only mode.
 *
 * Usage:
 *   <TestiCraftLogo />                  → default (height: 40px)
 *   <TestiCraftLogo height={28} />      → compact for headers
 *   <TestiCraftLogo height={56} />      → large for hero sections
 *   <TestiCraftLogo iconOnly />         → square icon only (for mobile/collapsed)
 */

// Logo is served from /public — Vite serves this as static assets
const LOGO_URL = "/logo.png";

export function TestiCraftLogo({
  height = 40,
  iconOnly = false,
  style = {},
}) {
  const maxWidth = iconOnly ? height : height * 5.5; // preserve aspect ratio

  return (
    <img
      src={LOGO_URL}
      alt="TestiCraft"
      width="auto"
      style={{
        height: `${height}px`,
        width: "auto",
        maxWidth: `${maxWidth}px`,
        objectFit: "contain",
        display: "block",
        flexShrink: 0,
        imageRendering: "crisp-edges",
        WebkitFontSmoothing: "antialiased",
        ...style,
      }}
      draggable={false}
    />
  );
}

export default TestiCraftLogo;
