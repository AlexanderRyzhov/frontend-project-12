import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

const initI18next = (language) => {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: language,
      lng: language,
      interpolation: {
        escapeValue: false,
      },
    });
};

export default initI18next;
