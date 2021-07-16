import { forwardRef, useCallback, useState, useImperativeHandle } from 'react';
import { FiInfo } from 'react-icons/fi';

import { ModalContainer, ModalFrame } from './styles';

interface ModalProps {
  title: string;
  message: string;
}

export interface ModalHandles {
  openModal: () => void;
}

const Modal: React.ForwardRefRenderFunction<ModalHandles, ModalProps> = (
  { title, message },
  ref,
) => {
  const [visible, setVisible] = useState(false);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  if (!visible) {
    return null;
  }

  return (
    <ModalContainer>
      <ModalFrame>
        <FiInfo size={32} />
        <h2>{title}</h2>
        <p>{message}</p>
        <button type="button" onClick={closeModal}>
          Ok
        </button>
      </ModalFrame>
    </ModalContainer>
  );
};

export default forwardRef(Modal);
