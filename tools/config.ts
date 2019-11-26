import { ELanguage } from '../src/enums';

export const config = {
    ioDirectory: 'tools/io/',
    nls: {
        defaultLangsPriority: [ELanguage.EN, ELanguage.RU],
        io: {
            csv: {
                delimiter: '--',
                directory: 'csv',
            },
            translate: {
                delimiter: '--',
                filename: 'nls.io',
            },
        },
        keySeparator: '.',
        mark: {
            explicitCommon: false,
            quoteChar: '`',
        },
        root: 'public/nls',
        suffix: {
            marked: '**',
            notTranslated: '++',
            toDelete: '--',
        },
    },
    tabSymbol: '....'.replace(/\./g, ' '),
};
