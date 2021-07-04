import styled from 'styled-components'

interface ContainerProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  width: 7rem;
  
  font-size: 0.875rem;
  text-align: center;
  color: ${(props) => props.color};

  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    width: 7rem;
  }

  img {
    width: 3rem;
    height: 3rem;
  }

  @media (max-width: 781px) {
    span {
      display: inline-block;
      margin-top: 1rem;
    }
  }
`