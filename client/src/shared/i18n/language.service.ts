import i18n from './config';

export type Language = 'ru' | 'en';

export class LanguageService {
  static getCurrent(): Language {
    return i18n.language as Language;
  }

  static async change(language: Language) {
    await i18n.changeLanguage(language);
  }
}
