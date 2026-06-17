"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { EMOJIS, PALETTES } from "@/lib/constants";
import { TEXT } from "@/lib/translations";
import { getAvatar, applyPalette, shareLink } from "@/lib/utils";
import { playDrumRoll, playVictorySound } from "@/lib/audio";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Tag from "./Tag";
import SlotDisplay from "./SlotDisplay";
import HeaderActions from "./HeaderActions";
import LegalModal from "./LegalModal";
import confetti from "canvas-confetti";

function launchConfetti(paletteKey: string) {
  const pal = PALETTES.find((p) => p.key === paletteKey) || PALETTES[0];
  const colors = [
    pal.vars.primary,
    pal.vars.mid,
    pal.vars.accent,
    pal.vars.extra,
    "#fbbf24",
    "#34d399",
  ];
  const opts = { particleCount: 120, spread: 80, origin: { y: 0.6 }, colors };
  confetti({ ...opts, angle: 60, origin: { x: 0, y: 0.7 } });
  setTimeout(
    () => confetti({ ...opts, angle: 120, origin: { x: 1, y: 0.7 } }),
    200,
  );
  setTimeout(
    () => confetti({ ...opts, particleCount: 60, origin: { x: 0.5, y: 0.5 } }),
    400,
  );
}

type Phase = "idle" | "rolling" | "winner";
type ModalType = "mentions" | "privacy" | "cgu" | null;

export default function App() {
  const [input, setInput] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentName, setCurrentName] = useState("");
  const [winner, setWinner] = useState("");
  const [sharing, setSharing] = useState(false);
  const [history, setHistory] = useState<
    { name: string; time: string; emoji: string }[]
  >([]);
  const [showHistory, setShowHistory] = useState(false);
  const [shake, setShake] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);

  const [soundEnabled, setSoundEnabled] = useLocalStorage(
    "qui-paye-sound",
    true,
  );
  const [lang, setLang] = useLocalStorage("qui-paye-lang", "FR");
  const systemTheme =
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  const [theme, setTheme] = useLocalStorage("qui-paye-theme", systemTheme);
  const [palette, setPalette] = useLocalStorage("qui-paye-palette", "violet");

  const inputRef = useRef<HTMLInputElement>(null);
  const rollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const t = TEXT[lang] || TEXT["FR"];
  const isArabic = lang === "AR";

  // Sync body class & html attrs
  useEffect(() => {
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(
      theme === "dark" ? "theme-dark" : "theme-light",
    );
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    (window as { updateCCLang?: (l: string) => void }).updateCCLang?.(lang);
  }, [lang, isArabic]);

  // Apply palette on mount
  useEffect(() => {
    applyPalette(palette);
  }, [palette]);

  const notifyShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const normalizedNames = useMemo(
    () => names.map((n) => n.toLowerCase()),
    [names],
  );

  const addName = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (normalizedNames.includes(trimmed.toLowerCase())) {
      notifyShake();
      return;
    }
    setNames((prev) => [...prev, trimmed]);
    setInput("");
    inputRef.current?.focus();
  }, [input, normalizedNames]);

  const removeName = useCallback(
    (name: string) => {
      setNames((prev) => prev.filter((n) => n !== name));
      if (winner === name) {
        setWinner("");
        setPhase("idle");
      }
    },
    [winner],
  );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addName();
  };

  const draw = useCallback(() => {
    if (names.length < 2) {
      notifyShake();
      return;
    }
    setPhase("rolling");
    setWinner("");
    const picked = names[Math.floor(Math.random() * names.length)];
    if (soundEnabled) {
      try {
        playDrumRoll(2800);
      } catch {}
    }
    let elapsed = 0;
    const totalDuration = 2800;
    const interval = 80;
    rollRef.current = setInterval(() => {
      elapsed += interval;
      setCurrentName(names[Math.floor(Math.random() * names.length)]);
      if (elapsed >= totalDuration) {
        clearInterval(rollRef.current!);
        setCurrentName(picked);
        setWinner(picked);
        setPhase("winner");
        setShowHistory(true);
        setHistory((prev) => [
          {
            name: picked,
            time: new Date().toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }),
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          },
          ...prev.slice(0, 9),
        ]);
        setTimeout(() => launchConfetti(palette), 100);
        if (soundEnabled) {
          try {
            playVictorySound();
          } catch {}
        }
      }
    }, interval);
  }, [names, palette, soundEnabled]);

  useEffect(
    () => () => {
      if (rollRef.current) clearInterval(rollRef.current);
    },
    [],
  );

  useEffect(() => {
    const id = setInterval(() => fetch("/api/ping").catch(() => {}), 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const handleShare = async () => {
    setSharing(true);
    await shareLink(t.shareText, t.shareFallback);
    setSharing(false);
  };

  const handleApplyPalette = (key: string) => {
    applyPalette(key);
    setPalette(key);
  };

  const year = new Date().getFullYear();

  return (
    <>
      <div
        className="w-full flex flex-col gap-5 relative"
        style={{
          maxWidth: "430px",
          minHeight: "100dvh",
          padding: "2rem 1.25rem 96px",
          boxSizing: "border-box",
        }}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3" dir="ltr">
          <div className="header-title">
            <h1
              className={`font-black plain-text tracking-tight ${lang === "ES" || lang === "TZM" ? "text-2xl mt-[7px]" : "text-3xl"} whitespace-nowrap`}
              style={{ lineHeight: 1.1 }}
            >
              {t.title}
            </h1>
            <p className="muted text-xs mt-0.5">{t.subtitle}</p>
          </div>
          <div dir="ltr">
            <HeaderActions
              t={t}
              lang={lang}
              setLang={setLang}
              theme={theme}
              setTheme={setTheme}
              isArabic={isArabic}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              palette={palette}
              setPalette={setPalette}
              onApplyPalette={handleApplyPalette}
            />
          </div>
        </div>

        {/* Add friends card */}
        <div className="glass glass-card rounded-[20px] p-5 flex flex-col gap-4">
          <p className="title-soft text-[11px] font-bold uppercase tracking-widest pb-1 border-b border-white/5">
            {t.addFriends}
          </p>
          <div className={`flex gap-2 ${shake ? "shake" : ""}`} dir="ltr">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t.placeholder}
              className="input-field flex-1 px-4 py-3 rounded-xl text-sm font-medium"
              style={{
                textAlign: isArabic ? "right" : "left",
                direction: isArabic ? "rtl" : "ltr",
              }}
            />
            <button
              onClick={addName}
              className="btn-primary w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg"
              aria-label={t.addFriends}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <line x1="12" y1="1" x2="12" y2="5" strokeLinecap="round" />
                <line x1="10" y1="3" x2="14" y2="3" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {names.length > 0 && (
            <div className={`flex flex-wrap gap-2 pt-1 ${isArabic ? "justify-end" : ""}`}>
              {names.map((n) => (
                <Tag key={n} name={n} onRemove={removeName} />
              ))}
            </div>
          )}
          {names.length < 2 && (
            <p className="muted text-xs text-center py-1">{t.helper}</p>
          )}
        </div>

        {/* Slot */}
        <SlotDisplay
          phase={phase}
          currentName={currentName}
          winner={winner}
          t={t}
          isArabic={isArabic}
        />

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={draw}
            disabled={phase === "rolling"}
            className="cta-btn btn-primary w-full py-4 rounded-2xl text-white font-black text-lg tracking-wide shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {phase === "rolling" ? (
              <>
                <span className="animate-spin text-xl">🎲</span>
                <span>{t.drawing}</span>
              </>
            ) : (
              <span>{t.cta}</span>
            )}
          </button>
          <div className={`flex gap-2 ${isArabic ? "flex-row-reverse" : ""}`}>
            <button
              onClick={() => window.open("QRcode.pdf", "_blank")}
              className="qr-share-btn flex-1 py-3 rounded-[16px] title-soft font-semibold text-sm glass hover:opacity-80 transition-all flex items-center justify-center gap-2"
            >
              <span>📱</span>
              <span>{t.qrcode}</span>
            </button>
            <button
              onClick={handleShare}
              disabled={sharing}
              className="qr-share-btn flex-1 py-3 rounded-[16px] title-soft font-semibold text-sm glass hover:opacity-80 transition-all flex items-center justify-center gap-2"
            >
              {sharing ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <span>🔗</span>
              )}
              <span>{t.share}</span>
            </button>
          </div>
        </div>

        {/* History */}
        {showHistory && history.length > 0 && (
          <div className="glass glass-card rounded-[20px] p-5 flex flex-col gap-4">
            <p className="title-soft text-[11px] font-bold uppercase tracking-widest pb-1 border-b border-white/5">
              {t.history}
            </p>
            <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1">
              {history.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl subtle-bg"
                >
                  <span className="plain-text font-semibold text-sm">{h.name}</span>
                  <span className="muted text-xs">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {winner && <span className="sr-only">{t.resultLabel(winner)}</span>}
      </div>

      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 998,
          padding: "8px 12px 10px",
          textAlign: "center",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop:
            theme === "dark"
              ? "1px solid rgba(168,85,247,0.2)"
              : "1px solid rgba(124,58,237,0.15)",
          background:
            theme === "dark"
              ? "rgba(8,8,18,0.88)"
              : "rgba(240,235,255,0.92)",
        }}
        dir="ltr"
      >
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {(
            [
              { label: t.footerMentions, key: "mentions" },
              { label: t.footerPrivacy, key: "privacy" },
              { label: t.footerCgu, key: "cgu" },
            ] as const
          ).map(({ label, key }) => (
            <button
              key={key}
              onClick={() => setModal(key)}
              className="hover:underline"
              style={{
                fontSize: "11px",
                whiteSpace: "nowrap",
                color:
                  theme === "dark"
                    ? "rgba(196,181,253,0.8)"
                    : "rgba(91,58,170,0.85)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {label}
            </button>
          ))}
          <span
            style={{
              fontSize: "11px",
              color:
                theme === "dark"
                  ? "rgba(196,181,253,0.4)"
                  : "rgba(91,58,170,0.4)",
            }}
          >
            ·
          </span>
          <button
            onClick={() =>
              (
                window as unknown as { CookieConsent?: { showPreferences: () => void } }
              ).CookieConsent?.showPreferences()
            }
            className="hover:underline"
            style={{
              fontSize: "11px",
              whiteSpace: "nowrap",
              color:
                theme === "dark"
                  ? "rgba(196,181,253,0.8)"
                  : "rgba(91,58,170,0.85)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {t.footerCookies}
          </button>
        </div>
        <p
          style={{
            fontSize: "10px",
            marginTop: "3px",
            color:
              theme === "dark"
                ? "rgba(196,181,253,0.45)"
                : "rgba(91,58,170,0.5)",
          }}
        >
          © {year} SahelMahel — {t.footerRights}{" · "} by&nbsp;
          <a
            href="mailto:slimanelami@proton.me"
            style={{
              color: theme === "dark" ? "rgba(196,181,253,0.6)" : "rgba(91,58,170,0.65)",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            SL
          </a>
        </p>
      </div>

      {/* Modal */}
      <LegalModal
        type={modal}
        onClose={() => setModal(null)}
        theme={theme}
        lang={lang}
        t={t}
      />
    </>
  );
}
