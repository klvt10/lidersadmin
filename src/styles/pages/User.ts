import styled from 'styled-components';

export const Container = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 0 2rem;

  > div {
    margin: 1rem;
    gap: 1rem;

    display: flex;
    justify-content: flex-end;
  }
`

export const ActionDetails = styled.section`
  margin-top: 1rem;

  display: flex;
  justify-content: center;
  gap: 0.5rem; 
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
  justify-content: space-around;
`

export const UserReports = styled.div`
  text-align: left;
  margin-right: auto;

  p {

    & + p {
      margin-top: 0.5rem;
    }

  }
`