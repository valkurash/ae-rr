import i18next from 'i18next';

export const translate = (key: string | string[], module = 'Common', options?: any) => i18next.t(`${module}:${key}`, options);

export const translationExists = (key: string | string[], module = 'Common', options?: any) => i18next.exists(`${module}:${key}`, options);
