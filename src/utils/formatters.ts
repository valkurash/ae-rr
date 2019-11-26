import forEach from 'lodash/forEach';
import isObject from 'lodash/isObject';

/**
 * Format phone to digits.
 *
 * @param phone Phone to format.
 * @return Formatted phone in digits .
 */
export const toDigits = (phone: string): string => {
    let formatted = (phone || '').trim();
    if (formatted) {
        formatted = formatted.replace(/\D/g, '');
    }
    return formatted;
};

/**
 * Format string to uppercase.
 *
 * @param str String to format.
 * @return Formatted string.
 */
export const toUppercase = (str: string = ''): string => {
    let formatted = '';
    if (str) {
        formatted = str.toUpperCase();
    }
    return formatted;
};

/**
 * Format plain object to flatten paths.
 *
 * @param object Object to format.
 * @return Array of paths.
 */
export const getFlattenPaths = (object: any) => {
    const result: any = [];

    const flatten = (obj: any, prefix: string = ''): void => {
        forEach(obj, (value, key) => {
            if (isObject(value)) {
                flatten(value, `${prefix}${key}.`);
            } else {
                result.push(`${prefix}${key}`);
            }
        });
    };

    flatten(object);

    return result;
};

/**
 * Format bytes to specific
 * @param bytes {number} Bytes.
 * @param decimals {number} Decimal digits.
 */
export const formatBytes = (bytes: number, decimals: number = 2) => {
    if (bytes === 0) {
        return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
