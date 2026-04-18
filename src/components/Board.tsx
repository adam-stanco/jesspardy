"use client";

import { CATEGORIES, POINT_VALUES, questionKey } from "@/lib/questions";

type Props = {
  answeredQuestions: string[];
  resetMode: boolean;
  compact?: boolean;
  fullscreen?: boolean;
  onSelect: (category: string, points: number) => void;
  onReset: (category: string, points: number) => void;
};

export default function Board({
  answeredQuestions,
  resetMode,
  compact = false,
  fullscreen = false,
  onSelect,
  onReset,
}: Props) {
  return (
    <div
      className={`w-full mx-auto ${
        fullscreen
          ? "max-w-[95vw] flex-1"
          : compact
            ? "max-w-[42rem] md:max-w-[44rem] xl:max-w-[48rem]"
            : "max-w-5xl"
      }`}
    >
      <div
        className={`board-grid grid grid-cols-5 ${
          fullscreen
            ? "gap-1 md:gap-1.5 fullscreen-grid"
            : compact
              ? "gap-1.5 md:gap-2.5"
              : "gap-2.5 md:gap-3.5"
        }`}
      >
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            className={`board-header rounded-xl text-center flex items-center justify-center ${
              fullscreen
                ? "px-2 py-2 min-h-[2.25rem]"
                : compact
                  ? "px-1.5 py-2.5 md:px-2.5 md:py-3 min-h-[2.75rem]"
                  : "px-2 py-3 md:px-3 md:py-3.5 min-h-[3.25rem]"
            }`}
          >
            <span
              className={`leading-tight block-text-header ${
                fullscreen
                  ? "text-xs sm:text-sm md:text-base"
                  : compact
                    ? "text-[0.6rem] sm:text-[0.65rem] md:text-xs"
                    : "text-[0.68rem] sm:text-xs md:text-sm"
              }`}
            >
              {cat}
            </span>
          </div>
        ))}

        {POINT_VALUES.map((pts) =>
          CATEGORIES.map((cat) => {
            const key = questionKey(cat, pts);
            const answered = answeredQuestions.includes(key);
            const canClick = !answered || resetMode;

            return (
              <button
                key={key}
                type="button"
                disabled={!canClick}
                aria-label={
                  answered && resetMode
                    ? `Reset ${cat} ${pts} dollars question`
                    : answered
                      ? `${cat} ${pts} dollars, already played`
                      : `${cat} for ${pts} dollars`
                }
                onClick={() =>
                  answered && resetMode ? onReset(cat, pts) : onSelect(cat, pts)
                }
                className={`
                  rounded-xl ${fullscreen ? "text-2xl md:text-3xl lg:text-4xl" : compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"}
                  ${fullscreen ? "" : "aspect-[4/3]"}
                  transition-all duration-200 ease-out cursor-pointer
                  flex items-center justify-center
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/90 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                  ${
                    answered && !resetMode
                      ? "board-card-answered cursor-default"
                      : answered
                        ? "bg-amber-500/20 border border-amber-300/40 text-amber-200 hover:-translate-y-1 active:translate-y-0 active:scale-[0.99]"
                      : "board-card hover:-translate-y-1 active:translate-y-0 active:scale-[0.99]"
                  }
                `}
              >
                {answered && !resetMode ? (
                  <span className="board-cell-taken" aria-hidden>
                    answered
                  </span>
                ) : answered ? (
                  <span
                    className={`font-bold uppercase tracking-wide text-center px-2 ${
                      fullscreen ? "text-sm md:text-base" : compact ? "text-xs md:text-sm" : "text-sm md:text-base"
                    }`}
                  >
                    Reset
                  </span>
                ) : (
                  <span className="block-text-value tabular-nums">${pts}</span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
