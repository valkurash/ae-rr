import { toDigits, toUppercase } from '../formatters';

describe('formatters', () => {
    describe('toDigits', () => {
        it('should return correct formatted phone number', () => {
            expect(toDigits('+994 (55) 123-45-67')).toBe('994551234567');
        });

        it('should return empty string', () => {
            expect(toDigits('')).toBe('');
        });
    });

    describe('toUppercase', () => {
        it('should return text transformed to uppercase', () => {
            expect(toUppercase('qwerty')).toBe('QWERTY');
        });

        it('should return empty string', () => {
            expect(toUppercase()).toBe('');
        });
    });
});
