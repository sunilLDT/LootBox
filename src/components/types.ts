export const CountryCodeList = [
  'BH',
  'KW',
  'SB',
  'QA',
  'AE',
  'OM'
  ] as const
  
  export type CountryCode = typeof CountryCodeList[number]
  
  export type CallingCode = string
  
  export type CurrencyCode = string
  
  export type TranslationLanguageCodeMap = {
    [key in TranslationLanguageCode]: string
  }
  export interface Country {
    region: Region
    subregion: Subregion
    currency: CurrencyCode[]
    callingCode: CallingCode[]
    flag: string
    name: TranslationLanguageCodeMap | string
    cca2: CountryCode
  }
  export const RegionList = [
    'Africa',
  ] as const
  export type Region = typeof RegionList[number]
  
  export const SubregionList = [
    'Southern Asia',
    'Southern Europe',
    'Northern Africa',
    'Middle Africa',
    'Western Africa',
    'Southern Africa',
    'Eastern Africa',
  ] as const
  export type Subregion = typeof SubregionList[number]
  
  export const TranslationLanguageCodeList = [
    'common',
    'cym',
    'deu',
    'fra',
    'hrv',
    'ita',
    'jpn',
    'nld',
    'por',
    'rus',
    'spa',
    'svk',
    'fin',
    'zho',
    'isr'
  ] as const
  export type TranslationLanguageCode = typeof TranslationLanguageCodeList[number]
  
  export enum FlagType {
    FLAT = 'flat',
    EMOJI = 'emoji'
  }
  
  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
  
  // type guards
  export function isCountryCode(str: string): str is CountryCode {
    return CountryCodeList.some((code) => code === str);
  }