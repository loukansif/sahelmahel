"use client";
import { getAvatar } from "@/lib/utils";

interface TagProps { name: string; onRemove: (name: string) => void; }

export default function Tag({ name, onRemove }: TagProps) {
  return (
    <span className="tag-in inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold subtle-bg chip-text">
      <span>{getAvatar(name)}</span>
      <span>{name}</span>
      <button
        onClick={() => onRemove(name)}
        className="ml-1 w-4 h-4 rounded-full flex items-center justify-center hover:text-white hover:bg-purple-500 transition-all text-xs font-bold"
        aria-label={`Retirer ${name}`}>
        ×
      </button>
    </span>
  );
}