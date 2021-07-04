import styled from 'styled-components'

export const Container = styled.div`
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;

    span {
      font-weight: bold;
    }

    .closeButton {
      border: 2px solid ${(props) => props.color};
      font-size: 20px;
      border-radius: 50%;
      padding: 0px;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: filter 0.5s;

      &:hover {
        border: 2px solid #fff;
        filter: invert();
      }
    }
  }

  .itens {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .section-modal {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .description {
      resize: none;
    }
  }

  footer {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    button {
      background: #FFF;
      border: 2px solid ${(props) => props.color};
      padding: 0.2rem 0.5rem;
      border-radius: 0.75rem;
      width: 6rem;

      color: ${(props) => props.color};

      font-size: 0.875rem;
      font-weight: bold;

      display: flex;
      align-items: center;
      justify-content: center;

      transition: filter 0.2s;

      &:hover {
        border: 2px solid #fff;
        filter: invert();
      }
  }

  }
`