import styled from 'styled-components';

export const Container = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 0 2rem;

  p {
    text-align: center;
    margin: 2rem;
  }
`

export const TransferDetailContainer = styled.section`
  display: flex;
  padding: 0 3rem;

  ul {
    flex: 1;
    list-style: none;
    
    li {
      text-align: left;
    }
  }
`;

export const FinanceSection = styled.div`
  display: flex;
  justify-content: space-around;
`

export const Rescues = styled.ul`
  padding-top: 20px;
  max-height: calc(100% - 60px);
  overflow-y: auto;

  li {
    width: 100%;
    font-size: 0.9rem;
    display: grid;
    align-items: center;
    grid-template-columns: 2fr 2fr 1fr 2fr 2fr 3fr 1fr;
    padding: 5px 0;
    border-bottom: 1px solid var(--white-disable);

    span {
      button {
        font-size: 0px;

        img {
          width: 16px;
          height: 16px;
        }
      }
    }

    &:first-child {
      font-size: 1rem;
      font-weight: bold;
      padding: 8px 0;
    }

    span.value, span.request, span.transfer {
      text-align: center;
    }
  }
`;
