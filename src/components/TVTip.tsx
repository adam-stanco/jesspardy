// Dismissible tip banner explaining how to eliminate black bars on TV

"use client";

import { useState } from "react";

export default function TVTip({ onOpenTVWindow }: { onOpenTVWindow: () => void }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto max-w-lg w-full bg-surface-deep/95 backdrop-blur-md border border-lilac/30 rounded-xl p-3 shadow-2xl">
        <div className="flex items-start gap-2.5">
          <span className="text-lg leading-none mt-0.5">📺</span>
          <div className="flex-1 min-w-0">
            <p className="text-snow text-xs font-semibold mb-1">
              Seeing black bars on your TV?
            </p>
            <p className="text-snow/70 text-[0.68rem] leading-relaxed mb-2">
              Your MacBook screen is 16:10 but your TV is 16:9, so macOS adds
              black bars when mirroring. To fix:{" "}
              <strong className="text-lavender">System Settings → Displays → </strong>
              click your TV → change from{" "}
              <em>&ldquo;Mirror&rdquo;</em> to{" "}
              <strong className="text-lavender">&ldquo;Extended display&rdquo;</strong>, then
              drag this browser window to the TV and press the fullscreen button again.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenTVWindow}
                className="px-3 py-1.5 rounded-lg bg-lavender/90 hover:bg-lavender text-surface-deep font-semibold text-[0.68rem] transition-colors cursor-pointer"
              >
                Open TV Window
              </button>
              <span className="text-snow/40 text-[0.62rem]">
                Opens a separate window you can drag to the TV
              </span>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-snow/50 hover:text-snow text-sm leading-none cursor-pointer p-1"
            aria-label="Dismiss tip"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
