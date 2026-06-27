export function getIntlLocale(language: string) {
  switch (language) {
    case 'ru':
      return 'ru-RU';

    case 'en':
      return 'en-US';

    default:
      return 'en-US';
  }
}
