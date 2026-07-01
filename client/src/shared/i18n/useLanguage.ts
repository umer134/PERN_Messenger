import { useTranslation } from 'react-i18next';

import { Language } from './language.service';

export function useLanguage() {
  const { i18n } = useTranslation();

  return {
    language: i18n.language as Language,

    changeLanguage(language: Language) {
      return i18n.changeLanguage(language);
    },
  };
}
