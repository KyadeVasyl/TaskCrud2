import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { LANG_DEFAULT, SUPPORTED_LANGS } from "./constant";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: LANG_DEFAULT.uk,
    supportedLngs: [SUPPORTED_LANGS.en, SUPPORTED_LANGS.uk],
    ns: [
      "translation",
      "product-create",
      "validation",
      "alert",
      "common",
      "product-list",
      "product-update",
    ],

    detection: {
      order: [
        "queryString",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"],
    },

    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json`, // Adjust this path
    },
  });

export default i18n;
