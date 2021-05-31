import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  align-items: center;

  h3 {
    font-size: 2.5rem;
  }

  p {
    text-align: center;
    margin: 15px 0 ;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      width: 80%;
      margin: 5px 80px;
      padding: 5px;
      height: 40px;
      outline: none;
      border: none;
      border-bottom: 1px solid var(--font-color);
      background: transparent;
      transition: border-bottom-color 0.5s ease;

      &:focus {
        border-bottom-color: var(--main-color);
      }
    }

    button {
      margin-top: 20px;
      border: none;
      width: 80%;
      height: 40px;
      background: var(--main-color);
      color: var(--white);
      outline: none;
    }
  }
`;
