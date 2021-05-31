import styled from 'styled-components'

interface ContainerProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  text-align: left;
  margin: 0 0.5rem;
  color: ${(props) => props.color};

  h2 {
    font-size: 3rem;
  }

  .value {
    color: #000;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`

