import LocalizedStrings from 'react-native-localization';
import english from './en';
import arabic from './it';

const strings = new LocalizedStrings({
    en: english,
    it: arabic,
   });

export const changeLaguage = (languageKey) => {
strings.setLanguage(languageKey)
}

export default strings;