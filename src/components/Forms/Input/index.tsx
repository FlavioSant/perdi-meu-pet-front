import {
  InputHTMLAttributes,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';

import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons/lib';

import { Container, ErrorText } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { defaultValue, fieldName, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
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
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <div>
        <input
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          type="text"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        />
        {Icon && <Icon size={22} />}
      </div>
      {error && (
        <ErrorText>
          {error}
          <FiAlertCircle size={18} />
        </ErrorText>
      )}
    </Container>
  );
};
