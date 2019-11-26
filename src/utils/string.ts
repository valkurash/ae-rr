import { translate } from './translation';

/**
 * Returns text if exists, default value otherwise.
 *
 * @param text {String} Text.
 * @param defaultStr {String} Default value. Default: Translation of No data key.
 *
 * @return {String} Text or default value.
 */
export const textOrDefault = (text: string, defaultStr: string = translate('Error.noData')): string => text || defaultStr;
