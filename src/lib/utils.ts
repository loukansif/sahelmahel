import { AVATARS, PALETTES } from "./constants";

export function getAvatar(name: string): string {
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) % AVATARS.length;
  return AVATARS[hash];
}

export function applyPalette(paletteKey: string): void {
  const palette = PALETTES.find((p) => p.key === paletteKey) || PALETTES[0];
  const r = document.documentElement.style;
  r.setProperty("--pal-primary", palette.vars.primary);
  r.setProperty("--pal-mid", palette.vars.mid);
  r.setProperty("--pal-accent", palette.vars.accent);
  r.setProperty("--pal-extra", palette.vars.extra);
  r.setProperty("--pal-rgb", palette.vars.rgb);
  r.setProperty("--pal-rgb2", palette.vars.rgb2);
  r.setProperty("--pal-rgb3", palette.vars.rgb3);
}

export async function shareLink(shareText: string, fallbackMsg: string): Promise<void> {
  const url = "https://www.sahelmahel.com/";
  try {
    if (navigator.share) {
      await navigator.share({ title: "Qui paye ?", text: shareText, url });
    } else {
      await navigator.clipboard.writeText(shareText + "\n" + url);
      alert(fallbackMsg);
    }
  } catch (e: unknown) {
    if (e instanceof Error && e.name !== "AbortError") {
      await navigator.clipboard.writeText(shareText + "\n" + url);
      alert(fallbackMsg);
    }
  }
}