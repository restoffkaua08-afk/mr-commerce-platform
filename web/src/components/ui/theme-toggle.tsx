"use client";

import {
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const themes = ["system", "light", "dark"] as const;

const emptySubscribe = () => {
  return () => undefined;
};

function useIsHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const {
    theme = "system",
    setTheme,
  } = useTheme();

  const hydrated = useIsHydrated();

  const currentTheme = themes.includes(
    theme as (typeof themes)[number],
  )
    ? (theme as (typeof themes)[number])
    : "system";

  const currentIndex = themes.indexOf(currentTheme);
  const nextTheme =
    themes[(currentIndex + 1) % themes.length] ?? "system";

  const label = hydrated
    ? `Tema atual: ${currentTheme}. Alterar para ${nextTheme}.`
    : "Alterar tema.";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      disabled={!hydrated}
      onClick={() => {
        setTheme(nextTheme);
      }}
    >
      <span aria-hidden="true">
        {!hydrated || currentTheme === "system" ? (
          <Monitor size={19} strokeWidth={1.8} />
        ) : currentTheme === "dark" ? (
          <Moon size={19} strokeWidth={1.8} />
        ) : (
          <Sun size={19} strokeWidth={1.8} />
        )}
      </span>

      <span className="sr-only">
        {label}
      </span>
    </button>
  );
}
