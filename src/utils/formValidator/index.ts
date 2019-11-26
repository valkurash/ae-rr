import { IAsyncData } from 'models';

import { isError } from '../redux';
import { shallowEqual } from '../shallowEqual';
import { IFormValidatorComponentClass, IFormValidatorDecorator } from './models';

/**
 * Form validation decorator.
 */
// tslint:disable-next-line:typedef
export function formValidator<T>(EFieldName: any) {
    return <AClass extends IFormValidatorComponentClass<T>>(TargetClass: AClass): AClass => {
        class DecoratedClass extends TargetClass implements IFormValidatorDecorator<T> {
            /**
             * Return error list by field name.
             *
             * @param {EFieldName} fieldName Form field name.
             */
            public getValidationErrorList = (fieldName: T): string[] => {
                const { validationErrors = {} } = this.state;

                return validationErrors.hasOwnProperty((fieldName as any) as string) ? validationErrors[(fieldName as any) as string] : [];
            };

            /**
             * Set backend validation errors to state.
             */
            public setBackendValidationErrors = (state: IAsyncData<any>): void => {
                const { error } = state;
                const { validationErrors } = this.state;

                if (isError(state) && error && error.checks) {
                    error.checks.forEach(({ message, path = '' }) => {
                        if (!validationErrors[path]) {
                            validationErrors[path] = [message];
                        } else {
                            if (validationErrors[path].indexOf(message) === -1) {
                                validationErrors[path].push(message);
                            }
                        }

                        this.setState({ validationErrors });
                    });
                }
            };

            /**
             * Form fields validate & set state.
             */
            public validateFieldsAndSetState = (fieldNames: T[], callback?: (isValid: boolean) => void): boolean => {
                let isValid = true;
                const validationErrors = { ...(this.state.validationErrors || {}) };

                fieldNames.forEach(fieldName => {
                    const error = this.validateField(fieldName);
                    validationErrors[fieldName as any] = error;
                    isValid = error.length === 0 && isValid;
                });

                if (!shallowEqual(this.state.validationErrors, validationErrors)) {
                    this.setState({ validationErrors }, () => callback && callback(isValid));
                } else if (callback) {
                    callback(isValid);
                }

                return isValid;
            };

            /**
             * Form validate & set state.
             */
            public validateFormAndSetState = (callback?: (isValid: boolean) => void): boolean => {
                // Get all form fields name.
                const allFields = Object.keys(EFieldName).map(k => EFieldName[k as any]);

                return this.validateFieldsAndSetState(allFields, callback);
            };
        }

        return DecoratedClass;
    };
}
