import { FormikErrors, FormikTouched } from 'formik';

/**
 * Is Formik field has an error.
 *
 * @param name Field name.
 * @param errors Errors.
 * @param touched Touched fields.
 */
export function isErrorField<T>(name: keyof T, errors: FormikErrors<T>, touched: FormikTouched<T>): boolean {
    return Boolean(errors[name] && touched[name]);
}
