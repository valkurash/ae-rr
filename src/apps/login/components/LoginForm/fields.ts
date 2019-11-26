import { TFormField } from 'models';
import { translate } from 'utils/translation';

import { ILoginClient } from '../../redux/ducks/auth';

/** Login form fields. */
export const LOGIN_FORM_FIELDS: TFormField<ILoginClient> = {
    username: {
        name: 'username',
        label: translate('LoginPage.Login.username.label', 'Login'),
        placeholder: translate('LoginPage.Login.username.placeholder', 'Login'),
    },
    password: {
        name: 'password',
        label: translate('LoginPage.Login.password.label', 'Login'),
        placeholder: translate('LoginPage.Login.password.placeholder', 'Login'),
    },
};
