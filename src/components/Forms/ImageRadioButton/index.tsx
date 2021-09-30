import Image from 'next/image';
import { InputHTMLAttributes, useEffect, useRef } from 'react';

import { useField } from '@unform/core';

import { ImageRadioContainer } from './styles';

interface Option {
  id: string;
  value: string;
  label: string;
  imageURL: string;
}

interface ImageRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: Option[];
}

export const ImageRadioButton: React.FC<ImageRadioButtonProps> = ({
  name,
  options,
  ...rest
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const { defaultValue = '', fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.find(ref => ref.checked)?.value || '';
      },
      setValue: (refs: HTMLInputElement[], id: string) => {
        const inputRef = refs.find(ref => ref.id === id);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs: HTMLInputElement[]) => {
        const inputRef = refs.find(ref => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <ImageRadioContainer>
      {options.map((option, index) => (
        <div key={option.id}>
          <input
            ref={ref => ref && (inputRefs.current[index] = ref)}
            id={option.id}
            type="radio"
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            {...rest}
          />
          <label htmlFor={option.id} title={option.label}>
            <figure>
              <Image
                src={option.imageURL}
                alt={option.label}
                width={70}
                height={70}
              />
            </figure>
            <span>{option.label}</span>
          </label>
        </div>
      ))}
    </ImageRadioContainer>
  );
};
