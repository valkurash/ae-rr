/**
 * Generate user specific storage key.
 */
export const getStorageKey = (cif: string, pin: string, key: string) => `${cif}:${pin}:${key}`;
