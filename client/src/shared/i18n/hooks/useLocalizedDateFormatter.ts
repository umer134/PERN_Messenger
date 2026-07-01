import { useTranslation } from 'react-i18next';

import { NAMESPACE } from '../namespaces';
import { getIntlLocale } from '../locale';

import { formatDate } from '@/shared/lib/format/formatDate';

export function useLocalizedDateFormatter() {
  const { t, i18n } = useTranslation(NAMESPACE.COMMON);

  return (
    input: string | number | Date,
    options?: Omit<Parameters<typeof formatDate>[1], 'locale' | 'translations'>,
  ) =>
    formatDate(input, {
      ...options,

      locale: getIntlLocale(i18n.language),

      translations: {
        today: t('date.today'),
        yesterday: t('date.yesterday'),
      },
    });
}
