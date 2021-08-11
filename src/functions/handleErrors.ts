import { FormHandles } from '@unform/core';
import { ValidationError } from 'yup';
import { errorToast } from '../utils/toast';

interface Errors {
  [key: string]: string;
}

interface HandleErrors {
  err: any;
  formHandles: FormHandles;
  description: string;
}

const getValidationErrors = (err: ValidationError): Errors => {
  const errors: Errors = {};

  err.inner.forEach(error => {
    errors[error.path] = error.message;
  });

  return errors;
};

export const handleErrors = ({
  err,
  formHandles,
  description,
}: HandleErrors): void => {
  if (err instanceof ValidationError) {
    const errors = getValidationErrors(err);
    formHandles.setErrors(errors);
    return;
  }

  errorToast({ message: description });

  console.error({ err });
};
