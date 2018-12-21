import Vue from 'vue';
import VueI18n, { LocaleMessages } from 'vue-i18n';
import { startCase } from '@/utils/method';

Vue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: LocaleMessages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
  missing: (locale, key) => {
    const segments = key.split('.');
    const nameIndex = segments.indexOf('title');

    if (nameIndex !== -1) {
      return startCase(segments[nameIndex - 1]);
    }
  },
});
