import {
  Container,
  Header,
  Logo,
  Information,
  PaymentSection,
  CardSection,
  OwnerInfo,
  RegisterButton,
} from "@/styles/pages/Payment";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

interface CreatePaymentFormData {
  paymentType: string;
  cardNumber: string;
  monthValidity: string;
  yearValidity: string;
  cardCvv: string;
  cardName: string;
  document: string;
  paymentMonthly: boolean;
  brand: string;
}

const createPaymentFormSchema = yup.object().shape({
  brand: yup
    .string()
    .oneOf(
      ["Visa", "Master", "Amex", "Diners", "Elo", "Hipercard"],
      "Cartão inválido"
    )
    .required("Selecione o tipo de cartão")
    .typeError("Selecione o tipo de cartão"),
  cardName: yup.string().required("Nome obrigatório"),
  document: yup.string().required("CPF obrigatório"),
  cardNumber: yup.string().required("Informe o número do cartão"),
  monthValidity: yup.string().required("Informe o mês de vencimento do cartão"),
  yearValidity: yup.string().required("Informe o ano de vencimento do cartão"),
  cardCvv: yup.string().required("Informe o código de segurança do cartão"),
});

const apiUrl = "https://api.lidersclub.com.br/v2/";

export default function Payment() {
  const { query } = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(createPaymentFormSchema),
  });

  const handleCreatePayment: SubmitHandler<CreatePaymentFormData> = async (
    values
  ) => {
    setLoading(true);

    try {
      const body = {
        TeamId: query.teamId,
        PaymentType: values.paymentType,
        PaymentMonthly: values.paymentMonthly,
        Brand: values.brand,
        CardNumber: values.cardNumber,
        MonthValidity: values.monthValidity,
        YearValidity: values.yearValidity,
        CVV: values.cardCvv,
        CardName: values.cardName,
        Document: values.document,
        Street: null,
        HouseNumber: null,
        Complement: null,
        Neighborhood: null,
        ZipCode: null,
        City: null,
        State: null,
      };

      const response = await axios.post(`${apiUrl}SubscriptionAPI`, body, {
        headers: {
          Authorization: `Bearer ${query.token}`,
        },
      });

      const { status, data } = response;

      if (status === 200 && data?.isOK) {
        if (data.authenticationUrl) {
          window.open(
            data.authenticationUrl,
            "_blank",
            "location=yes,height=570,width=520,scrollbars=yes,status=yes"
          );
        } else {
          window.location.href = "paymentOk";
        }
      } else {
        setLoading(false);
        alert(
          "Ocorreu um problema ao realizar o pagamento verifique seus dados."
        );
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadUserPayment() {
      try {
        setLoading(true);

        const response = await axios.get(`${apiUrl}SubscriptionAPI`, {
          headers: {
            Authorization: `Bearer ${query.token}`,
          },
        });

        reset(response.data);
      } catch (error) {
        // alert('Erro ao executar. Tente novamente.');
      }

      setLoading(false);
    }

    if (query.token) {
      loadUserPayment();
    }
  }, [query, reset]);

  return (
    <Container>
      <Header>
        <span>Inscrição Liders Club</span>
      </Header>
      <Logo>
        <img src="/logoSite.png" alt="" />
      </Logo>
      <Information>
        <p className="info">
          <strong>Informações:</strong>
        </p>
        <p>
          Para apoiar o&#40;a&#41; {query.name} e usufluir de todas as vantagens
          de um&#40;a&#41; associado&#40;a&#41;, você precisa autorizar o débito
          mensal de R&#36; 50,00 em seu cartão de crédito ou realizar o
          pagamento mensal via cartão de crédito ou débito.
        </p>
        <p>
          &#42; Não guardamos as informações de seu cartão, deixamos todo o
          processo a cargo da Cielo.
        </p>
      </Information>
      <PaymentSection onSubmit={handleSubmit(handleCreatePayment)}>
        <span>
          <strong>Selecione o meio de pagamento desejado:</strong>
        </span>
        <div className={`cards-section ${errors.brand ? "haserrors" : ""}`}>
          <div className="payment-cards">
            <input
              type="radio"
              name="brand"
              id="Visa"
              value="Visa"
              {...register("brand")}
            />
            <label htmlFor="visa">
              <img src="cards/visa.svg" alt="cartão visa" />
            </label>
          </div>
          <div className="payment-cards">
            <input
              type="radio"
              name="brand"
              id="Master"
              value="Master"
              {...register("brand")}
            />
            <label htmlFor="Master">
              <img src="cards/mastercard.png" alt="cartão mastercard" />
            </label>
          </div>
          <div className="payment-cards">
            <input
              type="radio"
              name="brand"
              id="Amex"
              value="Amex"
              {...register("brand")}
            />
            <label htmlFor="Amex">
              <img src="cards/amex.png" alt="cartão american express" />
            </label>
          </div>
          <div className="payment-cards">
            <input
              type="radio"
              name="brand"
              id="Diners"
              value="Diners"
              {...register("brand")}
            />
            <label htmlFor="Diners">
              <img src="cards/diners.png" alt="cartão diners club" />
            </label>
          </div>
          <div className="payment-cards">
            <input
              type="radio"
              name="brand"
              id="Elo"
              value="Elo"
              {...register("brand")}
            />
            <label htmlFor="Elo">
              <img src="cards/elo.png" alt="cartão elo" />
            </label>
          </div>
          <div className="payment-cards">
            <input
              type="radio"
              name="brand"
              id="Hipercard"
              value="Hipercard"
              {...register("brand")}
            />
            <label htmlFor="Hipercard">
              <img src="cards/hipercard.png" alt="cartão hipercard" />
            </label>
          </div>
        </div>
        <CardSection>
          <span>Dados do cartão</span>
          <div className="monthly">
            <input
              type="checkbox"
              name="mensal"
              id="mensal"
              {...register("paymentMonthly")}
            />
            <span>
              <strong>Mensal</strong>
            </span>
          </div>
          <select
            className={`paymentType ${errors.paymentType ? "haserrors" : ""}`}
            {...register("paymentType")}
          >
            <option value="C">Crédito</option>
            <option value="D">Débito</option>
          </select>
          <input
            type="text"
            placeholder="Número do Cartão"
            className={`cardNumber ${errors.cardNumber ? "haserrors" : ""}`}
            {...register("cardNumber")}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^\d]/g, "");
              setValue(
                "cardNumber",
                `${newValue.substr(0, 4)}${
                  newValue.length > 4 ? ` ${newValue.substr(4, 4)}` : ""
                }${newValue.length > 8 ? ` ${newValue.substr(8, 4)}` : ""}${
                  newValue.length > 12 ? ` ${newValue.substr(12, 4)}` : ""
                }`
              );
            }}
          />
          <div className="section-year">
            <input
              type="number"
              placeholder="MM"
              className={`monthValidity ${
                errors.monthValidity ? "haserrors" : ""
              }`}
              {...register("monthValidity")}
              onChange={(e) => {
                setValue(
                  "monthValidity",
                  e.target.value.replace(/[^\d]/g, "").substr(0, 2)
                );
              }}
            />
            <input
              type="number"
              className="yearValidity"
              placeholder="AAAA"
              {...register("yearValidity")}
              onChange={(e) => {
                setValue(
                  "yearValidity",
                  e.target.value.replace(/[^\d]/g, "").substr(0, 4)
                );
              }}
            />
            {}
            <img
              className="img-cvv"
              src="cards/cvv.png"
              alt="imagem código de segurança do cartão"
            />
            <input
              type="number"
              placeholder="CVV"
              className={`cardCvv ${errors.cardCvv ? "haserrors" : ""}`}
              {...register("cardCvv")}
              onChange={(e) => {
                setValue(
                  "cardCvv",
                  e.target.value.replace(/[^\d]/g, "").substr(0, 6)
                );
              }}
            />
          </div>
          <OwnerInfo>
            <p>Informações do&#40;a&#41; portador&#40;a&#41; do cartão</p>
            <input
              type="text"
              className={`cardName ${errors.cardName ? "haserrors" : ""}`}
              placeholder="Nome impresso no cartão"
              {...register("cardName")}
            />
            <input
              type="text"
              placeholder="CPF"
              className={`document ${errors.document ? "haserrors" : ""}`}
              {...register("document")}
              onChange={(e) => {
                const newValue = e.target.value.replace(/[^\d]/g, "");
                setValue(
                  "document",
                  `${newValue.substr(0, 3)}${
                    newValue.length > 3 ? `.${newValue.substr(3, 3)}` : ""
                  }${newValue.length > 6 ? `.${newValue.substr(6, 3)}` : ""}${
                    newValue.length > 9 ? `-${newValue.substr(9, 2)}` : ""
                  }`
                );
              }}
            />
          </OwnerInfo>
          <RegisterButton type="submit" disabled={loading}>
            {loading ? "Carregando..." : "REGISTRAR-SE"}
            <img src="double-arrow.png" alt="" />
          </RegisterButton>
        </CardSection>
      </PaymentSection>
    </Container>
  );
}
