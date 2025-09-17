"use client"

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { isRTL } from "../lib/i18n";
import { useTransition } from "react";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "./ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const rtl = isRTL();
  const [isPending, startTransition] = useTransition();

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    startTransition(() => {
      setTheme(newTheme);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={isPending}>
          <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ${isPending ? 'animate-pulse' : ''}`} />
          <Moon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ${isPending ? 'animate-pulse' : ''}`} />
          <span className="sr-only">{t("theme.toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={rtl ? "start" : "end"}>
        <DropdownMenuItem
          onClick={() => handleThemeChange("light")}
          className="flex items-center gap-2"
        >
          <Sun className="h-4 w-4" />
          {t("theme.light")}
          {theme === "light" && (
            <span className={rtl ? "mr-auto" : "ml-auto"}>✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("dark")}
          className="flex items-center gap-2"
        >
          <Moon className="h-4 w-4" />
          {t("theme.dark")}
          {theme === "dark" && (
            <span className={rtl ? "mr-auto" : "ml-auto"}>✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("system")}
          className="flex items-center gap-2"
        >
          <Monitor className="h-4 w-4" />
          {t("theme.system")}
          {theme === "system" && (
            <span className={rtl ? "mr-auto" : "ml-auto"}>✓</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
