import { safeGeneratePath } from '../router';

const testPath = '/test/:id/:value';

describe('Router utils', () => {
    describe('safeGeneratePath', () => {
        it('should return empty value if params passed and one of them is empty', () => {
            const result = safeGeneratePath(testPath, { id: '123', value: '' });
            expect(result).toBe('');
        });

        it('should return resolved path if not empty params passed', () => {
            const result = safeGeneratePath(testPath, { id: '123', value: 'val' });
            expect(result).toBe('/test/123/val');
        });

        it('should return resolved path if params not passed', () => {
            const result = safeGeneratePath('/test');
            expect(result).toBe('/test');
        });
    });

    describe('safePush', () => {
        // TODO. Write tests for safePush.
    });
});
