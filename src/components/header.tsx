import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { t } from "../lib/translations";
import { AISettingsModal } from "./ai-settings-modal";
import { AnimatedLogo } from "./animated-logo";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  onSettingsChange?: () => void;
}

export function Header({ onSettingsChange }: HeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <AnimatedLogo />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {t("appTitle")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("appDescription")}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-3">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AISettingsModal onSettingsChange={onSettingsChange} />
          </div>

          <div className="flex flex-col sm:items-end gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>{t("builtBy")} Ali Master</span>
            </div>
            <Button
              variant="link"
              size="sm"
              asChild
              className="h-auto p-0 text-sm"
            >
              <a
                href="https://github.com/ali-master/note-transformer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                <span>{t("githubRepo")}</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
