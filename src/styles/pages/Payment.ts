import styled from "styled-components";

export const Container = styled.div`
  max-width: 1220px;
  margin: 0 auto;

  font-size: 1rem;
`;

export const Header = styled.header`
  background: #f7941d;
  color: #fff;
  text-align: center;
  padding: 0.2rem;
`;

export const Logo = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;

  img {
    width: 14rem;
  }
`;

export const Information = styled.section`
  margin: 0 1rem;

  .info {
    margin-bottom: 0.2rem;
  }
`;

export const PaymentSection = styled.form`
  margin: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .haserrors {
    border: 1px solid red !important;
    border-radius: 5px;
    padding: 5px;
  }

  .cards-section {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: 0.6rem;

    .payment-cards {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.3rem;

      img {
        background: #fff;
        height: 1.8rem;
        border-radius: 3px;
      }
    }
  }
`;

export const CardSection = styled.section`
  margin-top: 1.5rem;
  width: 100%;

  .haserrors {
    border: 1px solid red !important;
  }

  .monthly {
    display: inline-flex;
    align-items: center;
    margin-left: 8rem;
  }

  .paymentType {
    width: 100%;
    height: 2.2rem;
    border-radius: 5px;
    border: 1px solid var(--white-disable);
    padding: 0 0.5rem;
    margin-top: 0.5rem;

    color: var(--font-color);
    font-size: 1rem;
  }

  .cardNumber {
    width: 100%;
    height: 2.2rem;
    border-radius: 5px;
    border: 1px solid var(--white-disable);
    padding: 0 0.5rem;
    margin-top: 0.5rem;
    letter-spacing: 0.2rem;
  }

  .section-year {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .monthValidity {
    width: 20%;
    height: 2.2rem;
    border-radius: 5px;
    border: 1px solid var(--white-disable);
    padding: 0.5rem;
    margin: 0.5rem 2% 0 0;
    letter-spacing: 0.2rem;
  }

  .yearValidity {
    width: 35%;
    height: 2.2rem;
    border-radius: 5px;
    border: 1px solid var(--white-disable);
    padding: 0.5rem;
    margin: 0.5rem 5% 0 0;
    letter-spacing: 0.2rem;
  }

  .cardCvv {
    width: 25%;
    height: 2.2rem;
    border-radius: 5px;
    border: 1px solid var(--white-disable);
    padding: 0.5rem;
    margin-top: 0.5rem;
    letter-spacing: 0.2rem;
  }
`;

export const OwnerInfo = styled.section`
  margin-top: 1.5rem;

  .cardName {
    width: 100%;
    height: 2.2rem;
    border-radius: 5px;
    border: 1px solid var(--white-disable);
    padding: 0.5rem;
    margin-top: 0.5rem;
  }

  .document {
    width: 100%;
    height: 2.2rem;
    border-radius: 5px;
    border: 1px solid var(--white-disable);
    padding: 0.5rem;
    margin-top: 0.5rem;
    letter-spacing: 0.2rem;
  }
`;

export const RegisterButton = styled.button`
  margin-top: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background: none;
  border: none;
  cursor: pointer;
  border: 1px solid #f7941d;
  padding: 0.5rem;
  width: 100%;
  border-radius: 20px;

  cursor: pointer;

  img {
    width: 0.6rem;
    height: 0.8rem;
  }
`;
