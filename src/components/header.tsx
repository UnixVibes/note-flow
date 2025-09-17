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

        </div>
      </div>
    </div>
  );
}
