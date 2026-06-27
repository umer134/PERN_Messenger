import ruCommon from './locales/ru/common.json';
import ruChat from './locales/ru/chat.json';
import ruSettings from './locales/ru/settings.json';
import ruProfile from './locales/ru/profile.json';
import ruValidation from './locales/ru/validation.json';
import ruAuth from './locales/ru/auth.json';

import enCommon from './locales/en/common.json';
import enChat from './locales/en/chat.json';
import enSettings from './locales/en/settings.json';
import enProfile from './locales/en/profile.json';
import enValidation from './locales/en/validation.json';
import enAuth from './locales/en/auth.json';

export const resources = {
  ru: {
    common: ruCommon,
    chat: ruChat,
    settings: ruSettings,
    profile: ruProfile,
    validation: ruValidation,
    auth: ruAuth,
  },

  en: {
    common: enCommon,
    chat: enChat,
    settings: enSettings,
    profile: enProfile,
    validation: enValidation,
    auth: enAuth,
  },
} as const;
