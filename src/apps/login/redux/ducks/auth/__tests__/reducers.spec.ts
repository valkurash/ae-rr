import { testAsyncReducer } from 'utils/test';

import { login, loginReducer } from '../index';

describe('Reducer login', () => {
    testAsyncReducer(loginReducer, login);
});
