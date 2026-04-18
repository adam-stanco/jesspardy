"use client";

import { useState } from "react";
import Image from "next/image";
import { useGameState } from "@/lib/useGameState";
import { useFullscreen } from "@/lib/useFullscreen";
import Board from "@/components/Board";
import ClueModal from "@/components/ClueModal";
import GameRules from "@/components/GameRules";
import TeamBar from "@/components/TeamBar";
import FinalJeopardy from "@/components/FinalJeopardy";

export default function Home() {
  const game = useGameState();
  const { state, hydrated } = game;
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen();
  const [selectingTeam, setSelectingTeam] = useState<number | null>(null);
  const [resetMode, setResetMode] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<{
    category: string;
    points: number;
  } | null>(null);

  if (!hydrated) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-dusty text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  const handleCellClick = (category: string, points: number) => {
    if (state.teams.length === 0) return;
    setResetMode(false);
    setPendingQuestion({ category, points });
    setSelectingTeam(null);
  };

  const handleQuestionReset = (category: string, points: number) => {
    game.resetQuestion(category, points);
    setPendingQuestion(null);
    setSelectingTeam(null);
    setResetMode(false);
  };

  const handleCurrentQuestionReset = () => {
    if (!state.currentQuestion) return;
    handleQuestionReset(state.currentQuestion.category, state.currentQuestion.points);
  };

  const confirmTeamAndOpen = () => {
    if (pendingQuestion && selectingTeam !== null) {
      game.selectQuestion(
        pendingQuestion.category,
        pendingQuestion.points,
        selectingTeam
      );
      setPendingQuestion(null);
      setSelectingTeam(null);
    }
  };

  const isSetup = state.phase === "setup";
  const isBoard = state.phase === "board";
  const showClue = state.phase === "clue" || state.phase === "answer";
  const isPlayPhase = isBoard || showClue;
  const isFinal =
    state.phase === "finalWager" ||
    state.phase === "finalClue" ||
    state.phase === "finalReveal" ||
    state.phase === "winner";

  return (
    <div
      className={`flex-1 flex flex-col relative z-10 ${
        isFullscreen && isPlayPhase
          ? "fullscreen-board px-3 py-2 gap-1.5"
          : isPlayPhase
            ? "px-3 py-3 md:px-4 md:py-4 gap-3 md:gap-4"
            : "p-4 md:p-6 gap-6"
      }`}
    >
      {/* Fullscreen toggle */}
      {isPlayPhase && (
        <button
          onClick={toggleFullscreen}
          className="fixed top-3 right-3 z-50 w-9 h-9 rounded-lg bg-surface-deep/70 hover:bg-surface-deep/90 border border-lilac/30 text-snow/80 hover:text-snow flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
          aria-label={isFullscreen ? "Exit full screen" : "Enter full screen for TV"}
          title={isFullscreen ? "Exit full screen (F11)" : "Full screen for TV (F11)"}
        >
          {isFullscreen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18-5h-3a2 2 0 0 0-2 2v3m0 8v3a2 2 0 0 0 2 2h3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          )}
        </button>
      )}

      {/* Header — hidden in fullscreen play mode to save space */}
      {!(isFullscreen && isPlayPhase) && (
        <header className="text-center">
          <div
            className={`flex items-center justify-center mb-2 ${
              isPlayPhase ? "gap-3" : "gap-4"
            }`}
          >
            <span className="text-dusty/60 text-2xl animate-float">☽</span>
            <Image
              src="/jess-avatar.png"
              alt="Jess"
              width={isPlayPhase ? 56 : 72}
              height={isPlayPhase ? 56 : 72}
              className="rounded-full border-3 border-lilac shadow-lg shadow-lavender/30"
            />
            <span className="text-dusty/60 text-xl animate-float" style={{ animationDelay: "0.5s" }}>
              ✦
            </span>
          </div>
          <h1
            className={`font-extrabold bg-gradient-to-r from-surface-deep via-glow-pink to-surface-deep bg-clip-text text-transparent animate-shimmer ${
              isPlayPhase ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"
            }`}
          >
            Jess-pardy!
          </h1>
          <p className={`text-dusty mt-1 ${isPlayPhase ? "text-xs" : "text-sm"}`}>
            Happy Birthday, Jess! 🎂
          </p>
        </header>
      )}

      {!(isFullscreen && isPlayPhase) && <GameRules compact={isPlayPhase} />}

      {/* Team bar */}
      <TeamBar
        teams={state.teams}
        onAdd={game.addTeam}
        onRemove={game.removeTeam}
        onAdjust={game.adjustScore}
        isSetup={isSetup}
        compact={isPlayPhase}
        fullscreen={isFullscreen && isPlayPhase}
      />

      {/* Setup screen */}
      {isSetup && (
        <div className="text-center">
          <p className="text-ink mb-4">
            Add at least 2 teams to begin!
          </p>
          <button
            onClick={game.startGame}
            disabled={state.teams.length < 2}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all cursor-pointer ${
              state.teams.length >= 2
                ? "bg-gradient-to-r from-lavender to-lilac text-snow shadow-lg shadow-lavender/30 hover:shadow-xl hover:shadow-lavender/50"
                : "bg-dusty/20 text-dusty/50 cursor-not-allowed"
            }`}
          >
            Start Game
          </button>
        </div>
      )}

      {/* Board */}
      {(isBoard || showClue) && (
        <div className={`flex flex-col min-h-0 justify-start ${isFullscreen ? "flex-1 gap-1" : "flex-1 gap-3"}`}>
          <Board
            answeredQuestions={state.answeredQuestions}
            resetMode={resetMode}
            compact
            fullscreen={isFullscreen}
            onSelect={handleCellClick}
            onReset={handleQuestionReset}
          />

          {/* Action bar below board */}
          <div className="flex flex-col items-center gap-3">
            {resetMode && (
              <p className="text-xs md:text-sm text-dusty italic text-center">
                Tap any played question to put it back on the board. Scores can
                still be adjusted above if needed.
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
              <button
                onClick={() => setResetMode((enabled) => !enabled)}
                className={`px-4 py-2 md:px-5 rounded-xl font-semibold text-xs md:text-sm transition-colors cursor-pointer border ${
                  resetMode
                    ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-amber-300/40"
                    : "bg-amber-100/60 hover:bg-amber-100/80 text-amber-900 border-amber-200/60"
                }`}
              >
                {resetMode ? "Done Resetting Questions" : "Reset One Question"}
              </button>
              <button
                onClick={game.startFinalJeopardy}
                className="px-4 py-2 md:px-5 rounded-xl bg-lavender/40 hover:bg-lavender/60 text-surface-deep font-semibold text-xs md:text-sm transition-all cursor-pointer border border-lavender/50"
              >
                Final Jess-pardy
              </button>
              <button
                onClick={game.resetGame}
                className="px-4 py-2 md:px-5 rounded-xl bg-rose-200/50 hover:bg-rose-200/70 text-rose-700 font-semibold text-xs md:text-sm transition-colors cursor-pointer border border-rose-300/40"
              >
                Reset Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team picker modal */}
      {pendingQuestion && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-surface to-surface-deep rounded-2xl shadow-2xl border border-lilac/20 max-w-md w-full p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold text-snow text-center mb-1">
              {pendingQuestion.category} for ${pendingQuestion.points}
            </h3>
            <p className="text-lavender text-sm text-center mb-4">
              Which team is selecting this question?
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {state.teams.map((team, i) => (
                <button
                  key={i}
                  onClick={() => setSelectingTeam(i)}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all cursor-pointer truncate ${
                    selectingTeam === i
                      ? "bg-lavender text-surface-deep shadow-md shadow-lavender/30"
                      : "bg-surface-deep/60 text-snow hover:bg-surface-deep/80"
                  }`}
                >
                  {team.name}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setPendingQuestion(null)}
                className="flex-1 py-2 rounded-xl bg-surface-deep/50 text-snow font-semibold transition-colors cursor-pointer hover:bg-surface-deep/70"
              >
                Cancel
              </button>
              <button
                onClick={confirmTeamAndOpen}
                disabled={selectingTeam === null}
                className={`flex-1 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  selectingTeam !== null
                    ? "bg-lavender hover:bg-lavender/80 text-surface-deep shadow-md shadow-lavender/20"
                    : "bg-dusty/20 text-dusty/50 cursor-not-allowed"
                }`}
              >
                Open Clue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clue modal */}
      {showClue && state.currentQuestion && (
        <ClueModal
          question={state.currentQuestion}
          showAnswer={state.showAnswer}
          teams={state.teams}
          selectingTeamIndex={state.selectingTeamIndex}
          onReveal={game.revealAnswer}
          onAward={game.awardPoints}
          onClose={game.closeQuestion}
          onReset={handleCurrentQuestionReset}
        />
      )}

      {/* Final Jeopardy */}
      {isFinal && (
        <FinalJeopardy
          phase={state.phase}
          teams={state.teams}
          data={game.finalJeopardyData}
          wagers={state.finalWagers}
          locked={state.finalLocked}
          correct={state.finalCorrect}
          onSetWager={game.setFinalWager}
          onLockWager={game.lockFinalWager}
          onRevealClue={game.revealFinalClue}
          onCancel={game.cancelFinalJeopardy}
          onSetCorrect={game.setFinalCorrect}
          onScore={game.scoreFinalJeopardy}
          onShowWinner={game.showWinner}
          onReset={game.resetGame}
        />
      )}
    </div>
  );
}
