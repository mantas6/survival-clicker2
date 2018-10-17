import { translations } from './english';
import { get } from 'lodash';

type Language = 'english';

interface TranslationParams {
  [ name: string ]: string;
}

export interface TranslationDictionary {
  [ name: string ]: TranslationDictionary | string;
}

export function translate(language: Language, path: string | string[], params: TranslationParams) {
  let currentTranslations: TranslationDictionary = {};

  switch (language) {
    case 'english':
      currentTranslations = translations;
  }

  const defaultValue = path instanceof Array ? path.concat('.') : path;

  return get(currentTranslations, path, defaultValue);
}
