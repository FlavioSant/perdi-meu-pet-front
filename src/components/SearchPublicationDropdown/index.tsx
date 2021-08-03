import { FormEvent, useCallback, useRef, useState } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiSearch, FiX, FiChevronUp, FiChevronDown } from 'react-icons/fi';

import { Category, Sex, Situation, Size } from '../../@types/publication';
import { selectOptions } from '../../utils/inputsOptions';

import { Select } from '../Select';
import { Button } from '../Button';

import { SearchDropdownContainer } from './styles';
import { useEffect } from 'react';

interface SubmitData {
  categoria: Category;
  porte: Size;
  sexo?: Sex;
  situacao: Situation;
}

interface SearchPublicationDropdownProps {
  isReset: boolean;
  onSubmit: (formData: SubmitData, formRef: FormHandles) => void;
  onReset: () => void;
}

const SearchPublicationDropdown: React.FC<SearchPublicationDropdownProps> = ({
  isReset,
  onSubmit,
  onReset,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [isDrop, setIsDrop] = useState(false);

  const dropSearch = useCallback(() => {
    setIsDrop(true);
  }, []);

  const hideSearch = useCallback(() => {
    setIsDrop(false);
  }, []);

  useEffect(() => {
    if (!isDrop) {
      formRef.current.setErrors({});
      formRef.current.reset();
    }
  }, [isDrop]);

  const handleClick = useCallback(() => {
    if (!formRef.current) {
      return;
    }

    if (isReset) {
      onReset();
      formRef.current.reset();
    } else {
      onSubmit(formRef.current.getData() as SubmitData, formRef.current);
    }
  }, [isReset]);

  return (
    <SearchDropdownContainer isDrop={isDrop}>
      <Form ref={formRef} onSubmit={(e: FormEvent) => e.preventDefault()}>
        <Select
          name="situacao"
          placeholder="Situação"
          options={selectOptions.situation}
        />
        <Select name="porte" placeholder="Porte" options={selectOptions.size} />
        <Select
          name="categoria"
          placeholder="Categoria"
          options={selectOptions.category}
        />
        <Select
          name="sexo"
          placeholder="Sexo do Animal"
          options={selectOptions.sex}
        />
        <Button type="button" title="Pesquisar" onClick={handleClick}>
          {isReset ? <FiX size={22} /> : <FiSearch size={22} />}
        </Button>
      </Form>

      {isDrop ? (
        <Button className="dropButton" type="button" onClick={hideSearch}>
          Esconder <FiChevronUp size={22} />
        </Button>
      ) : (
        <Button className="dropButton" type="button" onClick={dropSearch}>
          Busca Rápida <FiChevronDown size={22} />
        </Button>
      )}
    </SearchDropdownContainer>
  );
};

export { SearchPublicationDropdown };
