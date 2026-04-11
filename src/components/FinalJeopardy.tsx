"use client";

import Image from "next/image";
import { Team, GamePhase } from "@/lib/useGameState";
import { FinalJeopardyData } from "@/lib/questions";

type Props = {
  phase: GamePhase;
  teams: Team[];
  data: FinalJeopardyData;
  wagers: Record<number, number>;
  locked: Record<number, boolean>;
  correct: Record<number, boolean | null>;
  onSetWager: (teamIndex: number, wager: number) => void;
  onLockWager: (teamIndex: number) => void;
  onRevealClue: () => void;
  onCancel: () => void;
  onSetCorrect: (teamIndex: number, correct: boolean) => void;
  onScore: () => void;
  onShowWinner: () => void;
  onReset: () => void;
};

export default function FinalJeopardy({
  phase,
  teams,
  data,
  wagers,
  locked,
  correct,
  onSetWager,
  onLockWager,
  onRevealClue,
  onCancel,
  onSetCorrect,
  onScore,
  onShowWinner,
  onReset,
}: Props) {
  const allLocked = teams.every((_, i) => locked[i]);
  const allJudged = teams.every((_, i) => correct[i] !== null);

  if (phase === "winner") {
    const maxScore = Math.max(...teams.map((t) => t.score));
    const winners = teams.filter((t) => t.score === maxScore);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-gradient-to-br from-lavender to-surface rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center border border-lilac/30">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-extrabold text-snow mb-2">
            {winners.length === 1 ? "Winner!" : "It's a Tie!"}
          </h2>
          <p className="text-4xl font-extrabold text-amber-300 mb-2">
            {winners.map((w) => w.name).join(" & ")}
          </p>
          <p className="text-xl text-snow/80">
            with ${maxScore.toLocaleString()}
          </p>
          <button
            onClick={onReset}
            className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-lavender to-lilac text-snow font-bold text-lg transition-all cursor-pointer hover:shadow-lg hover:shadow-lavender/40"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-surface to-surface-deep rounded-2xl shadow-2xl border border-lilac/20 max-w-3xl w-full p-8 backdrop-blur-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image
            src="/jess-avatar.png"
            alt="Jess"
            width={48}
            height={48}
            className="rounded-full border-2 border-lilac/60"
          />
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-300">
            Final Jess-pardy!
          </h2>
        </div>

        {/* Wager phase */}
        {phase === "finalWager" && (
          <>
            <p className="text-snow text-center mb-6">
              Each team: enter your secret wager (up to your current score),
              then lock it in.
            </p>
            <div className="space-y-4">
              {teams.map((team, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-surface-deep/40 rounded-xl p-4"
                >
                  <div className="flex-1">
                    <p className="text-snow font-semibold">{team.name}</p>
                    <p className="text-lavender text-sm">
                      Score: ${team.score.toLocaleString()}
                    </p>
                  </div>
                  {locked[i] ? (
                    <span className="text-emerald-400 font-bold text-sm">
                      Locked In ✓
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={Math.max(team.score, 0)}
                        value={wagers[i] ?? 0}
                        onChange={(e) =>
                          onSetWager(
                            i,
                            Math.min(
                              Math.max(0, Number(e.target.value)),
                              Math.max(team.score, 0)
                            )
                          )
                        }
                        className="bg-surface-deep/60 border border-lilac/30 rounded-lg px-3 py-2 text-snow w-28 text-right focus:outline-none focus:border-lavender"
                      />
                      <button
                        onClick={() => onLockWager(i)}
                        className="bg-lavender hover:bg-lavender/80 text-surface-deep font-bold px-4 py-2 rounded-lg transition-all cursor-pointer"
                      >
                        Lock
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                onClick={onCancel}
                className="sm:w-48 py-3 rounded-xl bg-surface-deep/60 border border-lilac/20 text-snow font-semibold transition-colors cursor-pointer hover:bg-surface-deep/80"
              >
                Back to Board
              </button>
              <button
                onClick={onRevealClue}
                disabled={!allLocked}
                className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all cursor-pointer ${
                  allLocked
                    ? "bg-gradient-to-r from-lavender to-lilac text-snow hover:shadow-lg hover:shadow-lavender/40"
                    : "bg-dusty/20 text-dusty/50 cursor-not-allowed"
                }`}
              >
                {allLocked ? "Reveal Final Clue" : "Waiting for all teams to lock in..."}
              </button>
            </div>
          </>
        )}

        {/* Clue revealed — judge */}
        {phase === "finalClue" && (
          <>
            <div className="mb-6 bg-surface-deep/50 border border-lilac/20 rounded-xl p-6 text-center">
              <p className="text-sm text-lavender uppercase tracking-wider mb-2">
                Final Clue
              </p>
              <p className="text-xl md:text-2xl text-snow font-bold">
                {data.clue}
              </p>
            </div>

            <div className="mb-6 bg-amber-500/10 border border-amber-400/30 rounded-xl p-4 text-center">
              <p className="text-sm text-amber-300/80 uppercase tracking-wider mb-1">
                Answer
              </p>
              <p className="text-lg text-amber-300 font-bold">{data.answer}</p>
            </div>

            <p className="text-snow text-center mb-4 text-sm">
              Judge each team: did they get it right?
            </p>
            <div className="space-y-3">
              {teams.map((team, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-surface-deep/40 rounded-xl p-4"
                >
                  <div className="flex-1">
                    <p className="text-snow font-semibold">
                      {team.name}{" "}
                      <span className="text-lavender text-sm">
                        (wagered ${(wagers[i] ?? 0).toLocaleString()})
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSetCorrect(i, true)}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors cursor-pointer ${
                        correct[i] === true
                          ? "bg-emerald-500 text-white"
                          : "bg-surface-deep/50 text-snow hover:bg-emerald-600/70"
                      }`}
                    >
                      Correct
                    </button>
                    <button
                      onClick={() => onSetCorrect(i, false)}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors cursor-pointer ${
                        correct[i] === false
                          ? "bg-rose-500 text-white"
                          : "bg-surface-deep/50 text-snow hover:bg-rose-600/70"
                      }`}
                    >
                      Wrong
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                onClick={onCancel}
                className="sm:w-48 py-3 rounded-xl bg-surface-deep/60 border border-lilac/20 text-snow font-semibold transition-colors cursor-pointer hover:bg-surface-deep/80"
              >
                Cancel Final
              </button>
              <button
                onClick={onScore}
                disabled={!allJudged}
                className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all cursor-pointer ${
                  allJudged
                    ? "bg-gradient-to-r from-lavender to-lilac text-snow hover:shadow-lg hover:shadow-lavender/40"
                    : "bg-dusty/20 text-dusty/50 cursor-not-allowed"
                }`}
              >
                {allJudged ? "Apply Scores" : "Judge all teams first..."}
              </button>
            </div>
          </>
        )}

        {/* Final scores revealed */}
        {phase === "finalReveal" && (
          <>
            <p className="text-snow text-center mb-6 text-lg">
              Final Scores:
            </p>
            <div className="space-y-3 mb-6">
              {teams
                .slice()
                .sort((a, b) => b.score - a.score)
                .map((team, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-surface-deep/40 rounded-xl p-4"
                  >
                    <span className="text-snow font-semibold">
                      {i + 1}. {team.name}
                    </span>
                    <span
                      className={`text-2xl font-extrabold ${
                        team.score < 0 ? "text-rose-400" : "text-amber-300"
                      }`}
                    >
                      ${team.score.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
            <button
              onClick={onShowWinner}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-lavender to-lilac text-snow font-bold text-lg transition-all cursor-pointer hover:shadow-lg hover:shadow-lavender/40"
            >
              Show Winner!
            </button>
          </>
        )}
      </div>
    </div>
  );
}
