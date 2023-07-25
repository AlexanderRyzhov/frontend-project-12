import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

i18next
  .use(initReactI18next)
  // .use(LanguageDetector) // с помощью плагина определяем язык пользователя в браузере
  .init({
    resources,
    fallbackLng: 'ru',
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
