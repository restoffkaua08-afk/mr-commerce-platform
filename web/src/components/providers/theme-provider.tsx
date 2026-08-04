"use client";

import type { ComponentProps } from "react";
import {
  ThemeProvider as NextThemesProvider,
} from "next-themes";

type ThemeProviderProps = ComponentProps<
  typeof NextThemesProvider
>;

export function ThemeProvider({
  children,
  ...properties
}: ThemeProviderProps) {
  return (
    <NextThemesProvider {...properties}>
      {children}
    </NextThemesProvider>
  );
}
