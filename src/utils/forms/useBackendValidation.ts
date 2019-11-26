import { FormikErrors } from 'formik';
import isEqual from 'lodash/isEqual';
import { useEffect } from 'react';

import { ICheckError, IError } from 'models';

/**
 * React hook for applying errors from backend to a form.
 * @param backendError {IError} Object containing backend error.
 * @param isSubmitting Formik flag of a form submission status
 * @param errors Formik current errors of a form
 * @param setErrors Formik action to apply validation errors to a form
 */
export function useBackendValidation<T>(
    // TODO: fix branch type if Formik fields and branch data are different
    backendError: IError,
    isSubmitting: boolean,
    errors: FormikErrors<T>,
    setErrors: (errors: FormikErrors<T>) => void,
): void {
    useEffect(() => {
        const { checks }: Partial<IError> = backendError || { checks: [] };

        if (!isSubmitting && Array.isArray(checks) && Boolean(checks.length)) {
            let newErrors = {};

            checks.forEach((value: ICheckError) => {
                const { message, path = '' } = value;
                newErrors = { ...newErrors, [path]: message };
            });

            if (!isEqual(errors, newErrors)) {
                setErrors(newErrors);
            }
        }
    }, [isSubmitting, backendError, errors, setErrors]);
}
