import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useField } from '@unform/core';

import { InputContainer, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { defaultValue, fieldName, registerField, error } = useField(name);

  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback(() => {
    console.log('BLUR', !!inputRef.current?.value);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer isErrored={!!error} isFilled={isFilled}>
      <label htmlFor={fieldName}>{label}</label>
      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        onBlur={handleInputBlur}
        type="text"
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};

export { Input };
