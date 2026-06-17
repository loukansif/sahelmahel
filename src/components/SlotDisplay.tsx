"use client";
import { getAvatar } from "@/lib/utils";
import { Translation } from "@/lib/translations";

type Phase = "idle" | "rolling" | "winner";

interface SlotDisplayProps {
  phase: Phase;
  currentName: string;
  winner: string;
  t: Translation;
  isArabic: boolean;
}

export default function SlotDisplay({ phase, currentName, winner, t, isArabic }: SlotDisplayProps) {
  if (phase === "idle") return (
    <div className="slot-display p-10 flex flex-col items-center justify-center min-h-[180px]">
      <span className="text-5xl font-black soft tracking-widest select-none">???</span>
    </div>
  );

  if (phase === "rolling") return (
    <div className="slot-display p-10 flex flex-col items-center justify-center min-h-[180px]">
      <div
        className="slot-rolling text-3xl font-black title-soft select-none overflow-hidden"
        style={{ height: "48px", lineHeight: "48px" }}>
        {currentName}
      </div>
      <p className="mt-3 muted text-sm animate-pulse">{t.drawing}</p>
    </div>
  );

  return (
    <div className="slot-display rounded-2xl p-8 flex flex-col items-center justify-center min-h-[120px] glow-pulse">
      <div className="winner-pop float text-center" dir={isArabic ? "rtl" : "ltr"}>
        <div className="text-5xl mb-2">{getAvatar(winner)}</div>
        <div className="winner-text text-4xl font-black">{winner}</div>
        <p className="mt-2 muted text-sm font-semibold">{t.winner}</p>
      </div>
    </div>
  );
}