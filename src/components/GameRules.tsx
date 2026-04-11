"use client";

// Quick reference for the host and teams during play.
const RULES = [
  {
    title: "Starting",
    body: "Rock-Paper-Scissors decides who picks the first category.",
  },
  {
    title: "Gameplay",
    body: "All teams can answer. Correct answers add points. Incorrect answers subtract points.",
  },
  {
    title: "Turn Control",
    body: "The team with the last correct answer picks next. If nobody got it right, the team with the highest score picks.",
  },
  {
    title: "Jess Challenges",
    body: "Only the selecting team plays. A success earns double points, and there is no penalty for failing.",
  },
  {
    title: "Final Jeopardy",
    body: "Each team can wager any amount up to its current total score.",
  },
];

type Props = {
  compact?: boolean;
};

export default function GameRules({ compact = false }: Props) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <details
        className={`board-card rounded-2xl ${
          compact ? "p-3 md:p-3.5" : "p-4 md:p-5"
        }`}
      >
        <summary className="cursor-pointer list-none select-none">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className={`uppercase tracking-[0.3em] text-lavender/80 ${
                  compact ? "text-[0.65rem]" : "text-xs"
                }`}
              >
                Quick Reference
              </p>
              <h2
                className={`font-bold text-snow ${
                  compact ? "text-base md:text-lg" : "text-lg md:text-xl"
                }`}
              >
                Game Rules
              </h2>
            </div>
            <span
              className={`font-semibold text-lavender ${
                compact ? "text-xs md:text-sm" : "text-sm"
              }`}
            >
              Expand
            </span>
          </div>
        </summary>

        <div className={`grid gap-3 md:grid-cols-2 ${compact ? "mt-3" : "mt-4"}`}>
          {RULES.map((rule) => (
            <div
              key={rule.title}
              className={`rounded-xl border border-lilac/20 bg-surface-deep/40 ${
                compact ? "p-3" : "p-4"
              }`}
            >
              <h3 className="text-sm font-bold uppercase tracking-wide text-amber-300">
                {rule.title}
              </h3>
              <p
                className={`text-snow/90 ${
                  compact ? "mt-1.5 text-xs leading-5" : "mt-2 text-sm leading-6"
                }`}
              >
                {rule.body}
              </p>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
