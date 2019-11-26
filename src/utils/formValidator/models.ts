import React from 'react';

import { IAsyncData } from 'models';

/**
 * Component class with form validator.
 */
export type IFormValidatorComponentClass<T> = new (...args: any[]) => IFormValidatorComponent<T> & React.Component<any, IFormValidatorState>;

/**
 * Interface, that implements @withPosition decorator.
 * But component for decorating must declare this methods with empty body.
 */
export interface IFormValidatorDecorator<T> {
    getValidationErrorList: (fieldName: T) => string[];
    setBackendValidationErrors: (state: IAsyncData<any>) => void;
    validateFieldsAndSetState: (fieldName: T[]) => boolean;
    validateFormAndSetState: () => boolean;
}

/**
 * If @formValidator decorator is applied to component, it must implement the interface.
 * Decorator extends component with inheritance. Decorator interacts with the component via this interface.
 */
export interface IFormValidatorComponent<T> {
    validateField: (fieldName: T) => string[];
}

/**
 * Form validator state for component.
 */
export interface IFormValidatorState {
    /** Validation errors. */
    validationErrors: {
        [fieldName: string]: string[];
    };
}
