import styled from 'styled-components';

export const Container = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 0 2rem;
  height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  overflow-y: auto;

  .buttons {
    margin: 1rem;
    gap: 1rem;

    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 781px) {
    max-width: 100vw;
    margin: 0;
    padding: 0 0.5rem;

    .buttons {
      justify-content: center;
      gap: 2.2rem;
    }
  }
`

export const ActionDetails = styled.section`
  margin-top: 1rem;

  display: flex;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 781px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    row-gap: 1.6rem;
    column-gap: 0;
  }
`

export const UserActionsDetails = styled.div`
  font-size: 0.875rem;
  text-align: center;
  color: #8B008A;

  display: flex;
  align-items: center;
  flex-direction: column;

  span {
    width: 6.25rem;
  }

  img {
    width: 50px;
    height: 50px;
  }
`

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

export const UserReports = styled.ul`
  text-align: left;
  margin-right: auto;

  margin-left: 2rem;

  li {
    margin-top: 0.5rem;
  }
`