import { TextareaHTMLAttributes, useEffect, useRef } from 'react';

import { useField } from '@unform/core';

import { TextareaContainer } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ name, label, ...rest }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { defaultValue, fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <TextareaContainer isErrored={!!error}>
      <label htmlFor={fieldName}>{label}</label>
      <textarea
        id={fieldName}
        ref={textareaRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </TextareaContainer>
  );
};
