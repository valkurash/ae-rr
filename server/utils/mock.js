const faker = require('faker');
const internetAvailable = require('internet-available');

const countries = {
    en: ['Azerbaijan', 'Russian Federation', 'Ukraine', 'USA'],
    ru: ['Азербайджан', 'Российская Федерация', 'Украина', 'Соединенные Штаты Америки'],
};
const cities = {
    en: ['Baku', 'Moscow', 'Kiev', 'Washington DC'],
    ru: ['Баку', 'Москва', 'Киев', 'Вашингтон'],
};
const genders = {
    en: ['MALE', 'FEMALE'],
    ru: ['Мужской', 'Женский'],
};
const maritalStatuses = ['SINGLE', 'MARRIED'];
const degrees = {
    en: ['Mother', 'Father', 'Brother', 'Sister'],
    ru: ['Мать', 'Отец', 'Брат', 'Сестра'],
};
const creditTargets = {
    en: ['House', 'Car', 'Other'],
    ru: ['Дом', 'Машина', 'Другие'],
};
const occupations = {
    en: ['Actor', 'Clerk', 'Social worker', 'Other'],
    ru: ['Актер', 'Клерк', 'Социальный работник', 'Другое'],
};
const customerCategories = {
    en: ['Pensioner', 'Other'],
    ru: ['Пенсионер', 'Другое'],
};

const salesCampaigns = {
    en: ['Promo 1', 'Promo2'],
    ru: [' Промоакция 1', 'Промоакция 2'],
};

const documentTypes = {
    idNew: 'ID_NEW',
    idOld: 'ID_OLD',
};
const companyStatuses = [1, 2, 3, 4];
const azPhoneFormat = '+994 (##) ###-##-##';


/**
 * Generate random Address.
 *
 * @returns {object} Random address object. Shape: {country, fullAddress, city, region, street, house, block, building, apartment, office, postCode}.
 */
const address = () => ({
    country: country(),
    fullAddress: `${faker.address.city()}, ${faker.address.zipCode()}, ${faker.address.streetAddress()}, ${faker.address.secondaryAddress()}`,
    city: faker.address.city(),
    region: country(),
    street: faker.address.streetAddress(),
    house: faker.random.number(),
    block: faker.random.number(),
    building: faker.random.number(),
    apartment: faker.address.secondaryAddress(),
    office: faker.random.number(),
    postCode: faker.address.zipCode(),
});

/**
 * Generate random Contact.
 *
 * @returns {object} Random contact object. Shape: {type, phone}.
 */
const contact = (description = null) => ({
    number: faker.phone.phoneNumber(azPhoneFormat),
    description,
});

/**
 * Generate random Country based on a locale.
 *
 * @param locale {string} Locale.
 * @returns {string} Random country.
 */
const country = (locale = 'en') => faker.helpers.randomize(countries[locale]);

/**
 * Generate random City based on a locale.
 *
 * @param locale {string} Locale.
 * @returns {string} Random city.
 */
const city = (locale = 'en') => faker.helpers.randomize(cities[locale]);

/**
 * Generate random Document based on a locale.
 *
 * @param pin {string} Document pin.
 * @returns {object} Random document object. Shape: {type, serial, pin, number, expirationDate, issuingOrganization, issuingDate, issuingCountry}.
 */
const document = (pin = '') => {
    const type = faker.random.objectElement(documentTypes);
    const documentId =
        type === documentTypes.idOld
            ? {
                prefix: faker.random.arrayElement([null, 'AZE']),
                serialNumber: faker.helpers.replaceSymbolWithNumber('#'.repeat(8)),
            }
            : {
                prefix: null,
                serialNumber: faker.helpers.replaceSymbolWithNumber('#'.repeat(9)),
            };

    return {
        type,
        pin: pin || faker.random.alphaNumeric(7),
        prefix: documentId.prefix,
        serialNumber: documentId.serialNumber,
        expirationDate: faker.date.future(10).toISOString(),
        issuingOrganization: faker.random.word(),
        issuingDate: faker.date.past(20).toISOString(),
        issuingCountry: country(),
    };
};

/**
 * Generate random Gender based on a locale.
 *
 * @param locale {string} Locale.
 * @returns {object} Random gender object. Shape: {title, numeric}.
 */
const gender = (locale = 'en') =>
    faker.helpers.randomize(
        genders[locale].map((item, index) => ({
            title: item,
            numeric: index,
        })),
    );

/**
 * Generate random Marital Status based on a locale.
 *
 * @param locale {string} Locale.
 * @returns {string} Random marital status.
 */
const maritalStatus = () => faker.helpers.randomize(maritalStatuses);

/**
 * Generate random Relative based on a locale.
 *
 * @param locale {string} Locale.
 * @returns {object} Random relative object. Shape: {name, degree, contact}.
 */
const relative = (locale = 'en') => ({
    name: faker.name.findName(),
    degree: faker.random.arrayElement(degrees[locale]),
    contact: contact(),
});

/**
 * Generate random Image.
 *
 * @returns {Promise} Random image object.
 */
const image = async () => {
    let isOnline = false;
    try {
        await internetAvailable({
            timeout: 2000,
            retries: 3,
        });
        isOnline = true;
    } catch (e) {
        isOnline = false;
    }

    return {
        avatar: (width, height) => (isOnline ? faker.image.avatar() : faker.image.dataUri(width, height)),
        abstract: (width, height) => (isOnline ? faker.image.abstract(width, height) : faker.image.dataUri(width, height)),
    };
};

/**
 * Generate random Workplace.
 *
 * @returns {object} Random workplace object. Shape: {title, industry, status, address, position}.
 */
const workplace = () => ({
    title: faker.company.companyName(),
    industry: faker.company.bs(),
    status: faker.random.arrayElement(companyStatuses),
    address: address(),
    position: faker.name.jobType(),
});

/**
 * Generate random AML Status based.
 *
 * @returns {string} Random AML status.
 */
const amlStatus = () => faker.helpers.randomize(['LOW', 'AVERAGE', 'HIGH']);

/**
 * Generate random card vendor.
 *
 * @return {string} Random card vendor.
 */
const cardVendor = () => faker.random.arrayElement(['MasterCard', 'Visa', 'Maestro', 'AmEx']);

/**
 * Generate random amount with currency code.
 *
 * @param min {string} Minimal amount.
 * @param max {string} Maximum amount.
 * @param code {string} Currency code.
 * @return {string} Random amount.
 */
const amount = (min, max, code = 'AZN') => ({
    currencyCode: code,
    value: faker.finance.amount(min, max),
});

/**
 * Randomly return null or passed value.
 *
 */
const randomlyEmpty = value => (Math.random() < 0.5 ? value : null);

/**
 * Generate array of specified length with elements from passed function.
 *
 * @param length Length of the array.
 * @param fn Function that generates elements.
 * @param params Function Params.
 * @returns {any[]} Array of specified length with elements from passed function.
 */
const generateMockedArray = (length = 0, fn = null, ...params) => Array.from({ length }, () => fn(...params));

/**
 * Generate default dictionary.
 *
 * @param arr Array of dictionary values.
 * @returns {any[]} Array of dictionary items.
 */
const dictionaryDefaultGenerator = arr => {
    let data = [];
    arr.map(value => {
        data.push({
            id: faker.random.uuid(),
            value,
        });
    });
    return data;
};

module.exports = {
    countries,
    cities,
    creditTargets,
    occupations,
    customerCategories,
    salesCampaigns,
    amount,
    amlStatus,
    address,
    cardVendor,
    contact,
    country,
    city,
    document,
    gender,
    generateMockedArray,
    maritalStatus,
    relative,
    workplace,
    image,
    randomlyEmpty,
    dictionaryDefaultGenerator,
};
