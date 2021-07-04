import React from 'react';
import Modal from 'react-modal';

import { Container } from '@/styles/pages/component/ConfirmationModal';

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => Promise<void>;
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
}) => {
  const customStyles = {
    content : {
      top : '50%',
      left : '50%',
      right : 'auto',
      bottom : 'auto',
      marginRight : '-50%',
      transform : 'translate(-50%, -50%)'
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={title}
    >
      <Container>
        <header>
          <span>{title}</span>
          <button type="button" onClick={onClose} className="closeButton">
            X
          </button>
        </header>
        <div>{message}</div>
        <footer>
          <button type="button" onClick={onClose}>Cancelar</button>
          <button type="button" onClick={onConfirm}>Ok</button>
        </footer>
      </Container>
    </Modal>
  );
};
