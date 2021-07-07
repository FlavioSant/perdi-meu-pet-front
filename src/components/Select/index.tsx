import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import ReactSelect, { Props, OptionTypeBase } from 'react-select';

import { useField } from '@unform/core';

import { SelectContainer } from './styles';

interface SelectProps extends Props<OptionTypeBase> {
  name: string;
  label: string;
  placeholder?: string;
  options: Array<{ value: string | number; label: string }>;
}

const Select: NextPage<SelectProps> = ({
  name,
  label,
  placeholder = 'Selecione...',
  options,
  ...rest
}) => {
  const selectRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      },
      getValue: ref => {
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value;
      },
      clearValue: ref => ref.select.setValue(''),
    });
  }, [fieldName, registerField]);

  return (
    <SelectContainer>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ReactSelect
        inputId={fieldName}
        ref={selectRef}
        defaultValue={defaultValue}
        classNamePrefix="react-select"
        placeholder={placeholder}
        options={options}
        noOptionsMessage={() => 'Sem opções'}
        isSearchable={false}
        isMulti={false}
        styles={{
          container: styles => ({
            ...styles,
            width: '100%',
          }),
          control: styles => ({
            ...styles,
            borderColor: !!error ? 'var(--red)' : 'var(--gray-200)',
            borderRadius: '10px',
            height: '45px',
            ':hover': {
              borderColor: !!error ? 'var(--red)' : 'var(--gray-200)',
            },
            ':focus-within': {
              borderColor: 'var(--text-secondary)',
              boxShadow: 'none',
            },
          }),
          option: (styles, state) => ({
            ...styles,
            color: state.isSelected ? 'white' : 'var(--text-primary)',
            backgroundColor: state.isSelected ? 'var(--orange)' : 'white',
            fontWeight: 400,
            ':hover': {
              background: 'var(--orange-light)',
              color: state.isSelected
                ? 'var(--text-primary)'
                : 'var(--text-primary)',
            },
          }),
          placeholder: styles => ({
            ...styles,
            color: 'var(--gray-500)',
            fontWeight: 400,
          }),
          valueContainer: styles => ({
            ...styles,
            color: 'var(--text-secondary)',
            fontWeight: 400,
          }),
        }}
        {...rest}
      />
    </SelectContainer>
  );
};

export { Select };
