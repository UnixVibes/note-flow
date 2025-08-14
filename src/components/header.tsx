import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { AISettingsModal } from "./ai-settings-modal";
import { AnimatedLogo } from "./animated-logo";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSelector } from "./language-selector";

interface HeaderProps {
  onSettingsChange?: () => void;
}

export function Header({ onSettingsChange }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <AnimatedLogo />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {t("app.title")}{" "}
              <sub className="text-sm sm:text-base text-muted-foreground">
                {__APP_VERSION__}
              </sub>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("app.description")}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-3">
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <AISettingsModal onSettingsChange={onSettingsChange} />
          </div>

          <div className="flex flex-col sm:items-end gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>{t("footer.builtBy")} </span>
              <a
                href="https://linkedin.com/in/alitorki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ali Master
              </a>
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
                <span>{t("footer.viewOnGithub")}</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
