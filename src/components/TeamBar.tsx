"use client";

import { useState } from "react";
import { Team } from "@/lib/useGameState";

type Props = {
  teams: Team[];
  onAdd: (name: string) => void;
  onRemove: (index: number) => void;
  onAdjust: (index: number, delta: number) => void;
  isSetup: boolean;
  compact?: boolean;
  fullscreen?: boolean;
};

export default function TeamBar({
  teams,
  onAdd,
  onRemove,
  onAdjust,
  isSetup,
  compact = false,
  fullscreen = false,
}: Props) {
  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    if (newName.trim()) {
      onAdd(newName);
      setNewName("");
    }
  };

  return (
    <div className={`w-full ${fullscreen ? "max-w-[95vw]" : "max-w-5xl"} mx-auto ${compact ? "overflow-x-auto pt-1 pb-1" : ""}`}>
      <div
        className={`items-end ${
          fullscreen
            ? "flex w-full flex-nowrap justify-center gap-2 px-1"
            : compact
              ? "flex w-max min-w-full flex-nowrap justify-center gap-2.5 px-1"
              : "flex flex-wrap justify-center gap-4"
        }`}
      >
        {teams.map((team, i) => (
          <div
            key={i}
            className={`board-card rounded-xl text-center relative group transition-transform duration-200 hover:-translate-y-1 ${
              fullscreen
                ? "p-1.5 min-w-[110px] flex-1 max-w-[180px]"
                : compact
                  ? "p-2 min-w-[138px]"
                  : "p-3 min-w-[170px]"
            }`}
          >
            {isSetup && (
              <button
                onClick={() => onRemove(i)}
                className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white/85 text-surface-deep text-sm font-bold opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md hover:bg-rose-100"
              >
                ×
              </button>
            )}
            <div
              className={`board-header rounded-lg ${
                fullscreen ? "px-1.5 py-1 mb-1" : compact ? "px-2 py-1.5 mb-2" : "px-3 py-2 mb-3"
              }`}
            >
              <p className={`block-text-header truncate ${fullscreen ? "text-[0.6rem]" : compact ? "text-[0.65rem]" : "text-xs"}`}>
                {team.name}
              </p>
            </div>
            <p
              className={`${fullscreen ? "text-xl md:text-2xl" : compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"} font-extrabold ${
                team.score < 0 ? "team-score-negative" : "block-text-value"
              }`}
            >
              ${team.score.toLocaleString()}
            </p>
            {!isSetup && (
              <div className={`flex items-center justify-center gap-2 ${fullscreen ? "mt-1" : compact ? "mt-2" : "mt-3"}`}>
                <button
                  onClick={() => onAdjust(i, -100)}
                  className={`${fullscreen ? "w-6 h-6 text-sm" : compact ? "w-7 h-7 text-base" : "w-8 h-8 text-lg"} rounded-full bg-rose-500/50 hover:bg-rose-500/80 text-white font-bold transition-colors cursor-pointer`}
                >
                  −
                </button>
                <button
                  onClick={() => onAdjust(i, 100)}
                  className={`${fullscreen ? "w-6 h-6 text-sm" : compact ? "w-7 h-7 text-base" : "w-8 h-8 text-lg"} rounded-full bg-emerald-500/50 hover:bg-emerald-500/80 text-white font-bold transition-colors cursor-pointer`}
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}

        {isSetup && teams.length < 8 && (
          <div className="flex items-end gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Team name..."
              className="bg-card/60 border border-lavender/30 rounded-lg px-4 py-2 text-snow placeholder-lilac/60 focus:outline-none focus:border-lavender focus:ring-1 focus:ring-lavender/30 w-40"
            />
            <button
              onClick={handleAdd}
              className="bg-lavender hover:bg-lavender/80 text-surface-deep font-bold px-4 py-2 rounded-lg transition-all cursor-pointer shadow-md shadow-lavender/20"
            >
              + Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
