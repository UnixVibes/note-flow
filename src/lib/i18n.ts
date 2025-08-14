import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "../locales/en.json";
import faTranslation from "../locales/fa.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  fa: {
    translation: faTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  })
  .then(() => {
    // Set initial document direction based on language
    const dir = i18n.language === "fa" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", i18n.language);

    // update metadata for SEO
    document.title = i18n.t("app.title");
    // Update Open Graph locale meta tag
    const metaLocale = document.querySelector('meta[property="og:locale"]');
    if (metaLocale) {
      metaLocale.setAttribute(
        "content",
        i18n.language === "fa" ? "fa_IR" : "en_US",
      );
    }
  });

export default i18n;

// Helper function to check if current language is RTL
export const isRTL = () => {
  try {
    return i18n.language === "fa";
  } catch {
    // Fallback during initialization
    return false;
  }
};
