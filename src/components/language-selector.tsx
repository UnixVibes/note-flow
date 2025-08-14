import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect } from "react";
import { isRTL } from "../lib/i18n";

const languages = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷" },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const rtl = isRTL();

  const updateDocumentDirection = (lng: string) => {
    const dir = lng === "fa" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lng);
  };

  const changeLanguage = (lng: string) => {
    void i18n.changeLanguage(lng);
    // Update document direction
    updateDocumentDirection(lng);
  };

  // Set initial direction based on current language
  useEffect(() => {
    updateDocumentDirection(i18n.language);
  }, [i18n.language]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("language.select")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={rtl ? "start" : "end"}>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="flex items-center gap-2"
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.nativeName}</span>
            {lang.code === i18n.language && (
              <span className={rtl ? "mr-auto" : "ml-auto"}>✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
