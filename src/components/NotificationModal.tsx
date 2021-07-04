import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

import "react-datepicker/dist/react-datepicker.css";

import { Container } from "@/styles/pages/component/NotificationModal";

type NotificationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: () => Promise<void>;
};

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  title,
  onClose,
  onConfirm,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [startDate, setStartDate] = useState(new Date());

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
        <div className="itens">
          <div className="section-modal">
            <label htmlFor="">Data:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date as Date)}
              locale="pt-BR"
              dateFormat="P"
            />
          </div>
          <div className="section-modal">
            <label htmlFor="desc">Descrição:</label>
            <textarea
              id="desc"
              className="description"
              name="description"
              rows={13}
              cols={54}
            ></textarea>
          </div>
        </div>
        <footer>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" onClick={onConfirm}>
            Ok
          </button>
        </footer>
      </Container>
    </Modal>
  );
};
