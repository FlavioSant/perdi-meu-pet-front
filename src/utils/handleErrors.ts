import { FormHandles } from '@unform/core';
import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

interface HandleErrors {
  err: any;
  formHandles: FormHandles;
}

const getValidationErrors = (err: ValidationError): Errors => {
  const errors: Errors = {};

  err.inner.forEach(error => {
    errors[error.path] = error.message;
  });

  return errors;
};

export const handleErrors = ({ err, formHandles }: HandleErrors): void => {
  if (err instanceof ValidationError) {
    const errors = getValidationErrors(err);
    formHandles.setErrors(errors);
    return;
  }

  console.error({ err });
};
