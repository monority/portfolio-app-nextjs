"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Icon } from "@/components/ui/icon";
import Button from "@/components/ui/button";

interface DarkModeToggleProps {
  className?: string;
  ariaLabel?: string;
}

export default function DarkModeToggle({ className, ariaLabel }: DarkModeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <Button
      variant="primary"
      onClick={toggleTheme}
      className={`theme-toggle ${className || ""}`}
      aria-label={ariaLabel || "Toggle dark mode"}
    >
      <Icon
        name={resolvedTheme === "dark" ? "lightMode" : "darkMode"}
        title={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="minimal-header__icon icon-sm"
      />
    </Button>
  );
}
