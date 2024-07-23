import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'uk'],
        fallbackLng: 'en',
        detection: {
            order: ['queryString', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage', 'cookie']
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json'
        },
        react: {
            useSuspense: false,
        }
    });

export default i18n;
