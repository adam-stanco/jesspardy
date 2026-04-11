"use client";

import Image from "next/image";
import { Question } from "@/lib/questions";
import { Team } from "@/lib/useGameState";

type Props = {
  question: Question;
  showAnswer: boolean;
  teams: Team[];
  selectingTeamIndex: number | null;
  onReveal: () => void;
  onAward: (teamIndex: number, points: number) => void;
  onClose: () => void;
  onReset: () => void;
};

export default function ClueModal({
  question,
  showAnswer,
  teams,
  selectingTeamIndex,
  onReveal,
  onAward,
  onClose,
  onReset,
}: Props) {
  const isJessChallenge = question.isJessChallenge;
  const doublePoints = question.points * 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-surface to-surface-deep rounded-2xl shadow-2xl border border-lilac/20 max-w-2xl w-full p-8 relative backdrop-blur-md">
        {/* Category & Points badge */}
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-surface-deep/70 px-3 py-1 rounded-full text-xs font-semibold text-snow uppercase tracking-wider">
            {question.category}
          </span>
          <span className="bg-amber-500/20 px-3 py-1 rounded-full text-xs font-bold text-amber-300">
            ${question.points}
          </span>
          {isJessChallenge && (
            <span className="bg-pink-500/20 px-3 py-1 rounded-full text-xs font-bold text-pink-300 animate-pulse">
              JESS CHALLENGE
            </span>
          )}
        </div>

        {/* Clue */}
        <div className="flex items-start gap-4 mb-8">
          <Image
            src="/jess-avatar.png"
            alt="Jess"
            width={56}
            height={56}
            className="rounded-full border-2 border-lilac/60 shrink-0 mt-1"
          />
          <p className="text-xl md:text-2xl text-snow leading-relaxed font-medium">
            {question.clue}
          </p>
        </div>

        {/* Jess Challenge info */}
        {isJessChallenge && !showAnswer && (
          <div className="mb-6 bg-pink-500/10 border border-pink-400/20 rounded-lg p-4">
            <p className="text-pink-200 text-sm">
              <strong>Jess Challenge rules:</strong> Only the selecting team
              plays. Win = <strong className="text-amber-300">${doublePoints}</strong> (double points).
              Lose = no deduction.
            </p>
          </div>
        )}

        {!showAnswer ? (
          <div className="space-y-3">
            <button
              onClick={onReveal}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-lavender to-lilac text-snow font-bold text-lg transition-all cursor-pointer hover:shadow-lg hover:shadow-lavender/40"
            >
              Reveal Answer
            </button>
            <button
              onClick={onReset}
              className="w-full py-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 font-semibold transition-colors cursor-pointer border border-amber-300/30"
            >
              Reset This Question
            </button>
          </div>
        ) : (
          <div>
            {/* Answer */}
            <div className="mb-6 bg-surface-deep/50 border border-lilac/20 rounded-xl p-5">
              <p className="text-sm text-lavender uppercase tracking-wider mb-1">
                Answer
              </p>
              <p className="text-2xl font-bold text-amber-300">
                {question.answer}
              </p>
              {question.link && (
                <a
                  href={question.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-lilac hover:text-lavender underline mt-2 inline-block"
                >
                  Reference link
                </a>
              )}
            </div>

            {/* Scoring buttons */}
            {isJessChallenge ? (
              <div className="space-y-3">
                <p className="text-snow text-sm text-center mb-2">
                  Did{" "}
                  {selectingTeamIndex !== null
                    ? teams[selectingTeamIndex]?.name
                    : "the team"}{" "}
                  win the challenge?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      selectingTeamIndex !== null &&
                      onAward(selectingTeamIndex, doublePoints)
                    }
                    className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors cursor-pointer"
                  >
                    They Won! (+${doublePoints})
                  </button>
                  <button
                    onClick={onClose}
                    className="py-3 rounded-xl bg-rose-700/70 hover:bg-rose-600 text-white font-bold transition-colors cursor-pointer"
                  >
                    They Lost (no deduction)
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-snow text-sm text-center mb-2">
                  Who answered correctly?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {teams.map((team, i) => (
                    <button
                      key={i}
                      onClick={() => onAward(i, question.points)}
                      className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cursor-pointer truncate"
                    >
                      {team.name} (+${question.points})
                    </button>
                  ))}
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-surface-deep/50 hover:bg-surface-deep/70 text-snow font-semibold transition-colors cursor-pointer"
                >
                  No one got it
                </button>
                <button
                  onClick={onReset}
                  className="w-full py-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 font-semibold transition-colors cursor-pointer border border-amber-300/30"
                >
                  Reset This Question
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
