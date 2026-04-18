"use client";

// Quick reference for the host and teams during play.
// Gives a short overview of the game and then lists the key rules.

const OVERVIEW = {
  title: "What Is Jess-pardy?",
  body: "Jess-pardy is a birthday-themed trivia game inspired by Jeopardy, built around facts, favorites, and inside jokes about Jess. Teams compete across five categories of Jess trivia, racking up (or losing) points on each question. The team with the most points after Final Jess-pardy wins.",
};

const HOW_IT_WORKS: { label: string; body: string }[] = [
  {
    label: "Setup",
    body: "Create at least two teams on the setup screen.",
  },
  {
    label: "First Pick",
    body: "Teams play Rock-Paper-Scissors to decide who picks first.",
  },
  {
    label: "Choose Clue",
    body: "The selecting team chooses a category and a point value from the 5x5 board.",
  },
  {
    label: "Answer",
    body: "The host reads the clue. Each team records their answer on their provided white board (Jeopardy-style, in the form of a question is encouraged but not required).",
  },
  {
    label: "Scoring",
    body: "Correct answers add points to that team. Incorrect answers subtract the same amount.",
  },
  {
    label: "Next Pick",
    body: "Whoever answered correctly picks the next clue. If multiple teams get the answer right, the team with the highest score selects the next question. If nobody got it, the team currently in the lead picks next.",
  },
  {
    label: "Jess Challenges",
    body: "Some clues are Jess Challenges — only the selecting team plays, correct answers score double, and there is no penalty for a miss.",
  },
  {
    label: "Final Jess-pardy",
    body: "After every clue is played, the game moves to Final Jess-pardy. Teams secretly wager up to their current score, then answer one final clue to settle the winner.",
  },
];

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
    title: "Final Jess-pardy",
    body: "Each team can wager any amount up to its current total score. The highest total after scoring wins.",
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
                How To Play
              </p>
              <h2
                className={`font-bold text-snow ${
                  compact ? "text-base md:text-lg" : "text-lg md:text-xl"
                }`}
              >
                Game Overview & Rules
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

        {/* Overview */}
        <div
          className={`rounded-xl border border-lilac/30 bg-lavender/10 ${
            compact ? "mt-3 p-3" : "mt-4 p-4"
          }`}
        >
          <h3 className="text-sm font-bold uppercase tracking-wide text-amber-300">
            {OVERVIEW.title}
          </h3>
          <p
            className={`text-snow/90 ${
              compact ? "mt-1.5 text-xs leading-5" : "mt-2 text-sm leading-6"
            }`}
          >
            {OVERVIEW.body}
          </p>
        </div>

        {/* How it works */}
        <div
          className={`rounded-xl border border-lilac/20 bg-surface-deep/40 ${
            compact ? "mt-3 p-3" : "mt-4 p-4"
          }`}
        >
          <h3 className="text-sm font-bold uppercase tracking-wide text-amber-300">
            How A Round Works
          </h3>
          <ol
            className={`list-decimal list-inside text-snow/90 space-y-1 ${
              compact ? "mt-1.5 text-xs leading-5" : "mt-2 text-sm leading-6"
            }`}
          >
            {HOW_IT_WORKS.map((step) => (
              <li key={step.label}>
                <span className="font-semibold text-amber-300">
                  {step.label}:
                </span>{" "}
                {step.body}
              </li>
            ))}
          </ol>
        </div>

        {/* Quick reference rules */}
        <div className={`${compact ? "mt-3" : "mt-4"}`}>
          <h3
            className={`font-bold uppercase tracking-wide text-lavender/90 ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            Quick Reference
          </h3>
          <div
            className={`grid gap-3 md:grid-cols-2 ${
              compact ? "mt-2" : "mt-3"
            }`}
          >
            {RULES.map((rule) => (
              <div
                key={rule.title}
                className={`rounded-xl border border-lilac/20 bg-surface-deep/40 ${
                  compact ? "p-3" : "p-4"
                }`}
              >
                <h4 className="text-sm font-bold uppercase tracking-wide text-amber-300">
                  {rule.title}
                </h4>
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
        </div>
      </details>
    </div>
  );
}
