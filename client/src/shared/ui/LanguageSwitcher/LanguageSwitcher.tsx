import { useLanguage } from '@/shared/i18n/useLanguage';

export const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <>
      <button disabled={language === 'ru'} onClick={() => changeLanguage('ru')}>
        RU
      </button>

      <button disabled={language === 'en'} onClick={() => changeLanguage('en')}>
        EN
      </button>
    </>
  );
};
