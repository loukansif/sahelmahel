"use client";
import { useState, useRef, useEffect } from "react";
import { LANG_OPTIONS, PALETTES } from "@/lib/constants";
import { FLAG_MAP } from "./Flags";
import { Translation } from "@/lib/translations";

interface HeaderActionsProps {
  t: Translation;
  lang: string; setLang: (l: string) => void;
  theme: string; setTheme: (t: string) => void;
  isArabic: boolean;
  soundEnabled: boolean; setSoundEnabled: (v: boolean) => void;
  palette: string; setPalette: (p: string) => void;
  onApplyPalette: (key: string) => void;
}

export default function HeaderActions({
  t, lang, setLang, theme, setTheme, isArabic,
  soundEnabled, setSoundEnabled, palette, setPalette, onApplyPalette,
}: HeaderActionsProps) {
  const [openLang, setOpenLang] = useState(false);
  const [openPalette, setOpenPalette] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

  const currentLang = LANG_OPTIONS.find((l) => l.key === lang) || LANG_OPTIONS[0];
  const CurrentFlag = FLAG_MAP[currentLang.key];
  const currentPalette = PALETTES.find((p) => p.key === palette) || PALETTES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setOpenLang(false);
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) setOpenPalette(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-2 items-center" dir="ltr">
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="icon-btn glass plain-text hover:bg-white/10 text-lg"
        title={soundEnabled ? "Son activé" : "Son désactivé"}
        aria-label={soundEnabled ? "Désactiver le son" : "Activer le son"}>
        <span aria-hidden="true">{soundEnabled ? "🔊" : "🔇"}</span>
      </button>

      <div className="relative" ref={paletteRef}>
        <button
          onClick={() => setOpenPalette((v) => !v)}
          className="icon-btn glass plain-text hover:bg-white/10"
          title={t.paletteTitle}
          aria-label={t.paletteTitle}
          style={{ padding: "8px" }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: currentPalette.dot, border: "2px solid rgba(255,255,255,0.25)", flexShrink: 0 }} />
        </button>
        {openPalette && (
          <div className="palette-menu" dir="ltr">
            {PALETTES.map((p) => (
              <button key={p.key} onClick={() => { onApplyPalette(p.key); setPalette(p.key); setOpenPalette(false); }}
                className={`palette-option ${palette === p.key ? "active" : ""} plain-text`}>
                <div className="palette-dot" style={{ background: p.dot }} />
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="icon-btn glass plain-text hover:bg-white/10 text-lg"
        title={t.themeTitle}
        aria-label={t.themeTitle}>
        <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
      </button>

      <div className="relative" ref={langRef}>
        <button
          onClick={() => setOpenLang((v) => !v)}
          className="icon-btn glass plain-text hover:bg-white/10"
          title={t.languageTitle}
          aria-label={t.languageTitle}
          style={{ padding: "6px" }}>
          <CurrentFlag size={20} />
        </button>
        {openLang && (
          <div className="lang-menu" dir="ltr">
            {LANG_OPTIONS.map((option) => {
              const Flag = FLAG_MAP[option.key];
              return (
                <button key={option.key}
                  onClick={() => { setLang(option.key); setOpenLang(false); }}
                  title={option.label}
                  aria-label={option.label}
                  className={`lang-option ${lang === option.key ? "active" : ""} plain-text`}
                  style={{ justifyContent: "center", padding: "10px 8px" }}>
                  <Flag size={20} />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}