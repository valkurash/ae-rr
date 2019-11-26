import '../../i18n';
import { translate } from '../translation';

describe('translation utils tests', () => {
    it('should exists', () => {
        expect(translate).toBeInstanceOf(Function);
    });

    it('should return default common key', () => {
        expect(translate('Nav.menu')).toBe('Common:Nav.menu');
    });

    it('should return appropriate key value ', () => {
        expect(translate('Test.key', 'TestModule')).toBe('TestModule:Test.key');
    });
});
