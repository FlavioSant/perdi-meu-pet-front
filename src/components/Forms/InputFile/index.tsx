import { InputHTMLAttributes, useEffect, useRef } from 'react';

import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';

import { InputFileContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  accept: string;
  name: string;
  description: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export const InputFile: React.FC<InputProps> = ({
  accept,
  name,
  description,
  icon: Icon,
  ...rest
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputFileRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <InputFileContainer>
      <label htmlFor={fieldName} title={description}>
        {Icon && <Icon size={22} />}
        <input
          id={fieldName}
          ref={inputFileRef}
          defaultValue={defaultValue}
          type="file"
          accept={accept}
          {...rest}
        />
        {description}
      </label>
    </InputFileContainer>
  );
};
