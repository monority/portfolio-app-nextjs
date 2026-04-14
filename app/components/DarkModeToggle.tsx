"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Icon } from "@/components/ui/icon";
import Button from "./ui/button";

interface DarkModeToggleProps {
  className?: string;
}

export default function DarkModeToggle({ className }: DarkModeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      className={`theme-toggle ${className || ""}`}
      aria-label="Toggle dark mode"
    >
      <Icon
        name={resolvedTheme === "dark" ? "lightMode" : "darkMode"}
        title={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="minimal-header__icon icon-md"
      />
    </Button>
  );
}