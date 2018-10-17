import { translations } from './english';

type Language = 'english';

interface TranslationParams {
  [ name: string ]: string;
}

export interface TranslationDictionary {
  [ name: string ]: TranslationDictionary | string;
}

export function translate(language: Language, name: string, params: TranslationParams) {
  switch (language) {
    case 'english':
      return translations[name];
  }
}
