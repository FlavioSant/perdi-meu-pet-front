import { useRef, useEffect, useState, useCallback } from 'react';

import { useField } from '@unform/core';
import ReactInputMask, { Props } from 'react-input-mask';

import { Container } from './styles';

interface InputProps extends Props {
  name: string;
  label: string;
}

export const InputMask: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      <label htmlFor={fieldName}>{label}</label>
      <div>
        <ReactInputMask
          ref={inputRef}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        />
      </div>
    </Container>
  );
};
