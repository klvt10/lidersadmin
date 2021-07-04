import styled from 'styled-components';

export const Container = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 0 2rem;
  height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  overflow-y: auto;

  p {
    text-align: center;
    margin: 2rem;
  }
`

export const TransferDetailContainer = styled.section`
  display: flex;
  flex-direction: column;

  .list {
    display: flex;
    padding: 0 3rem;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  ul {
    flex: 1;
    list-style: none;
    
    li {
      text-align: left;
      margin-top: 0.8rem;
    }
  }

  @media (max-width: 781px) {
    flex-direction: column;
    padding: 0;
  }
`;

export const FinanceSection = styled.div`
  display: flex;
  justify-content: center;

  .line-card {
    display: flex;
  }

  @media (max-width: 781px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    row-gap: 1.6rem;
    column-gap: 0;

    .line-card {
      display: block;
    }
  }
`

export const Rescues = styled.ul`
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

  @media (max-width: 781px) {

    .header-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    .list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    .transfer, .notes {
      display: none;
    }
  }
`;
