import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  
  font-size: 1rem;
`;

export const Header = styled.header`
  background: #F7941D;
  color: #FFF;
  text-align: center;
  padding: 0.2rem;
`;

export const Logo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 4rem;
  
  img {
    width: 14rem;
  }

  span {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;