// Hook for browser Fullscreen API with keyboard shortcut (F11 / Cmd+Shift+F)

"use client";

import { useState, useEffect, useCallback } from "react";

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen may be blocked by browser policy — silently ignore
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform?.toUpperCase().includes("MAC");
      if (
        e.key === "F11" ||
        (isMac && e.metaKey && e.shiftKey && e.key.toLowerCase() === "f")
      ) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return { isFullscreen, toggle };
}
