// Central game state hook with localStorage persistence (shared across tabs/windows)
"use client";

import { useState, useEffect, useCallback } from "react";
import { Question, getQuestion, questionKey, FINAL_JEOPARDY } from "./questions";

export type Team = {
  name: string;
  score: number;
};

export type GamePhase =
  | "setup"
  | "board"
  | "clue"
  | "answer"
  | "finalWager"
  | "finalClue"
  | "finalReveal"
  | "winner";

export type GameState = {
  teams: Team[];
  answeredQuestions: string[];
  currentQuestion: Question | null;
  showAnswer: boolean;
  selectingTeamIndex: number | null;
  phase: GamePhase;
  finalWagers: Record<number, number>;
  finalLocked: Record<number, boolean>;
  finalCorrect: Record<number, boolean | null>;
};

const STORAGE_KEY = "jesspardy-state";

const initialState: GameState = {
  teams: [],
  answeredQuestions: [],
  currentQuestion: null,
  showAnswer: false,
  selectingTeamIndex: null,
  phase: "setup",
  finalWagers: {},
  finalLocked: {},
  finalCorrect: {},
};

function loadState(): GameState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as GameState;
  } catch {
    /* corrupted — start fresh */
  }
  return initialState;
}

export function useGameState() {
  const [state, setState] = useState<GameState>(loadState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, hydrated]);

  // Sync state across browser tabs/windows via storage events
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setState(JSON.parse(e.newValue) as GameState);
        } catch { /* ignore parse errors */ }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // --- Team management ---

  const addTeam = useCallback((name: string) => {
    setState((s) => ({
      ...s,
      teams: [...s.teams, { name: name.trim(), score: 0 }],
    }));
  }, []);

  const removeTeam = useCallback((index: number) => {
    setState((s) => ({
      ...s,
      teams: s.teams.filter((_, i) => i !== index),
    }));
  }, []);

  const adjustScore = useCallback((teamIndex: number, delta: number) => {
    setState((s) => ({
      ...s,
      teams: s.teams.map((t, i) =>
        i === teamIndex ? { ...t, score: t.score + delta } : t
      ),
    }));
  }, []);

  const startGame = useCallback(() => {
    setState((s) => ({ ...s, phase: "board" }));
  }, []);

  // --- Question flow ---

  const selectQuestion = useCallback(
    (category: string, points: number, teamIndex: number | null) => {
      const q = getQuestion(category, points);
      if (!q) return;
      setState((s) => ({
        ...s,
        currentQuestion: q,
        showAnswer: false,
        selectingTeamIndex: teamIndex,
        phase: "clue",
      }));
    },
    []
  );

  const revealAnswer = useCallback(() => {
    setState((s) => ({ ...s, showAnswer: true, phase: "answer" }));
  }, []);

  const awardPoints = useCallback(
    (teamIndex: number, points: number) => {
      setState((s) => {
        const q = s.currentQuestion;
        if (!q) return s;
        const key = questionKey(q.category, q.points);
        return {
          ...s,
          teams: s.teams.map((t, i) =>
            i === teamIndex ? { ...t, score: t.score + points } : t
          ),
          answeredQuestions: s.answeredQuestions.includes(key)
            ? s.answeredQuestions
            : [...s.answeredQuestions, key],
          currentQuestion: null,
          showAnswer: false,
          selectingTeamIndex: null,
          phase: "board",
        };
      });
    },
    []
  );

  const closeQuestion = useCallback(() => {
    setState((s) => {
      const q = s.currentQuestion;
      if (!q) return { ...s, phase: "board" };
      const key = questionKey(q.category, q.points);
      return {
        ...s,
        answeredQuestions: s.answeredQuestions.includes(key)
          ? s.answeredQuestions
          : [...s.answeredQuestions, key],
        currentQuestion: null,
        showAnswer: false,
        selectingTeamIndex: null,
        phase: "board",
      };
    });
  }, []);

  const resetQuestion = useCallback((category: string, points: number) => {
    const key = questionKey(category, points);

    setState((s) => {
      const isCurrentQuestion =
        s.currentQuestion?.category === category &&
        s.currentQuestion?.points === points;

      return {
        ...s,
        answeredQuestions: s.answeredQuestions.filter(
          (answeredKey) => answeredKey !== key
        ),
        currentQuestion: isCurrentQuestion ? null : s.currentQuestion,
        showAnswer: isCurrentQuestion ? false : s.showAnswer,
        selectingTeamIndex: isCurrentQuestion ? null : s.selectingTeamIndex,
        phase: isCurrentQuestion ? "board" : s.phase,
      };
    });
  }, []);

  // --- Final Jeopardy ---

  const startFinalJeopardy = useCallback(() => {
    setState((s) => ({
      ...s,
      currentQuestion: null,
      phase: "finalWager",
      finalWagers: Object.fromEntries(s.teams.map((_, i) => [i, 0])),
      finalLocked: Object.fromEntries(s.teams.map((_, i) => [i, false])),
      finalCorrect: Object.fromEntries(s.teams.map((_, i) => [i, null])),
    }));
  }, []);

  const setFinalWager = useCallback((teamIndex: number, wager: number) => {
    setState((s) => ({
      ...s,
      finalWagers: { ...s.finalWagers, [teamIndex]: wager },
    }));
  }, []);

  const lockFinalWager = useCallback((teamIndex: number) => {
    setState((s) => ({
      ...s,
      finalLocked: { ...s.finalLocked, [teamIndex]: true },
    }));
  }, []);

  const revealFinalClue = useCallback(() => {
    setState((s) => ({ ...s, phase: "finalClue" }));
  }, []);

  const cancelFinalJeopardy = useCallback(() => {
    setState((s) => ({
      ...s,
      currentQuestion: null,
      showAnswer: false,
      selectingTeamIndex: null,
      phase: "board",
      finalWagers: {},
      finalLocked: {},
      finalCorrect: {},
    }));
  }, []);

  const setFinalCorrect = useCallback(
    (teamIndex: number, correct: boolean) => {
      setState((s) => ({
        ...s,
        finalCorrect: { ...s.finalCorrect, [teamIndex]: correct },
      }));
    },
    []
  );

  const scoreFinalJeopardy = useCallback(() => {
    setState((s) => {
      const newTeams = s.teams.map((t, i) => {
        const correct = s.finalCorrect[i];
        const wager = s.finalWagers[i] ?? 0;
        if (correct === true) return { ...t, score: t.score + wager };
        if (correct === false) return { ...t, score: t.score - wager };
        return t;
      });
      return { ...s, teams: newTeams, phase: "finalReveal" };
    });
  }, []);

  const showWinner = useCallback(() => {
    setState((s) => ({ ...s, phase: "winner" }));
  }, []);

  // --- Reset ---

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  }, []);

  return {
    state,
    hydrated,
    addTeam,
    removeTeam,
    adjustScore,
    startGame,
    selectQuestion,
    revealAnswer,
    awardPoints,
    closeQuestion,
    resetQuestion,
    startFinalJeopardy,
    setFinalWager,
    lockFinalWager,
    revealFinalClue,
    cancelFinalJeopardy,
    setFinalCorrect,
    scoreFinalJeopardy,
    showWinner,
    resetGame,
    finalJeopardyData: FINAL_JEOPARDY,
  };
}
