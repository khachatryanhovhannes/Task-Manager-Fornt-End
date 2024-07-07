import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationHY from './locales/hy/translation.json';

const resources = {
    en: {
        translation: translationEN,
    },
    hy: {
        translation: translationHY,
    },
};

i18n
    .use(detector)
    .init({
        resources,
        fallbackLng: 'en',
        compatibilityJSON: 'v3'
    });

initReactI18next.init(i18n); 
export default i18n;
