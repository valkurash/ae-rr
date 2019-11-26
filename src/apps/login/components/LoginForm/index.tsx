import { FormikProps, withFormik } from 'formik';
import * as React from 'react';

import { IError, ILoadable } from 'models';
import { useBackendValidation } from 'utils/forms/useBackendValidation';
import { isErrorField } from 'utils/forms/errors';
import { translate } from 'utils/translation';
import { Loading } from 'components/Loading';

import { ILoginClient } from '../../redux/ducks/auth';
import { LOGIN_FORM_FIELDS } from './fields';
import { validationSchema } from './validation-schema';

import './index.scss';

/**
 * Component props.
 */
export interface IProps extends ILoadable {
    /** Backend error object. */
    backendError?: IError;

    /** Form submit handler. */
    onSubmit: (data: ILoginClient, meta?: any) => void;
}

/**
 * Component props with Formik props.
 */
export type TProps = IProps & FormikProps<ILoginClient>;

/**
 * Login form.
 */
export const LoginFormComponent: React.FunctionComponent<TProps> = (props: TProps) => {
    const { backendError = {}, loading, values, setFieldValue, handleSubmit, errors, touched, isSubmitting, setErrors } = props;

    /** Process backend validation. */
    useBackendValidation<ILoginClient>(backendError, isSubmitting, errors, setErrors);

    /** Handle form field change. */
    const handleFieldChange = (field: keyof ILoginClient) => (e: React.FormEvent<HTMLInputElement>) => setFieldValue(field, e.currentTarget.value);

    /** Form errors. */
    const usernameError = isErrorField(LOGIN_FORM_FIELDS.username.name, errors, touched);

    const passwordError = isErrorField(LOGIN_FORM_FIELDS.password.name, errors, touched);

    /**
     * Render form.
     */
    const renderForm = (): JSX.Element => (
        <div>
            {backendError.error && <div>{backendError.message}</div>}
            <div className="login-field">
                <label>{LOGIN_FORM_FIELDS.username.label}</label>
                <input
                    id={LOGIN_FORM_FIELDS.username.name}
                    type="text"
                    autoComplete="off"
                    placeholder={LOGIN_FORM_FIELDS.username.placeholder}
                    onChange={handleFieldChange(LOGIN_FORM_FIELDS.username.name)}
                    value={values.username}
                />
                {usernameError && <div>{errors.username}</div>}
            </div>
            <div className="login-field">
                <label>{LOGIN_FORM_FIELDS.password.label}</label>
                <input
                    id={LOGIN_FORM_FIELDS.password.name}
                    type="password"
                    placeholder={LOGIN_FORM_FIELDS.password.placeholder}
                    onChange={handleFieldChange(LOGIN_FORM_FIELDS.password.name)}
                    value={values.password}
                />
                {passwordError && <div>{errors.password}</div>}
            </div>
            <button type="button" onClick={() => handleSubmit()}>
                {translate('Action.SUBMIT')}
            </button>
        </div>
    );

    return (
        <div className="login-form" data-test-id="login-form">
            {loading ? <Loading /> : renderForm()}
        </div>
    );
};

/** Connect to the Formik state. */
export const LoginForm = withFormik<IProps, ILoginClient>({
    enableReinitialize: true,
    displayName: 'LoginForm',
    handleSubmit: (values: ILoginClient, { setSubmitting, props }) => {
        props.onSubmit(values, { setSubmitting });
    },
    mapPropsToValues: (): ILoginClient => ({
        username: '',
        password: '',
    }),
    validationSchema,
})(LoginFormComponent);
