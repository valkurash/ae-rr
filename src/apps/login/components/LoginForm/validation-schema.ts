import * as Yup from 'yup';

import { translate } from 'utils/translation';

import { ILoginClient } from '../../redux/ducks/auth';

/**
 * Validation scheme of the Login form.
 */
export const validationSchema = Yup.object().shape<ILoginClient>({
    username: Yup.string().required(() => translate('Validation.required')),
    password: Yup.string().required(() => translate('Validation.required')),
});
