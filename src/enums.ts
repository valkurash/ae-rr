/** Apps. */
export enum EApp {
    MAIN = 'main',
    LOGIN = 'login',
}

/**
 * Error levels.
 */
export enum ECheckErrorLevel {
    /** Error. */
    ERROR = 'ERROR',

    /** Warning. */
    WARNING = 'WARNING',
}

/**
 * API processing statuses.
 */
export enum EProcessStatus {
    /** Request canceled. */
    CANCELED = 'CANCELED',

    /** Request fall via errors. */
    ERROR = 'ERROR',

    /** Initial state. */
    IDLE = 'IDLE',

    /** Request pending. */
    PENDING = 'PENDING',

    /** Request resolved successfully. */
    SUCCESS = 'SUCCESS',
}

/**
 * Currencies.
 */
export enum ECurrencyCode {
    USD = 'USD',
    EUR = 'EUR',
    RUB = 'RUB',
}

/**
 * Languages.
 */
export enum ELanguage {
    EN = 'en',
    RU = 'ru',
}

/**
 * Gender.
 */
export enum EGender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

/** User roles. */
export enum EUserRole {
    ADMIN = 'ROLE_ADMIN',
    USER = 'ROLE_USER',
}
