import styled from 'styled-components'

interface ContainerProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  button {
    background: #FFF;
    border: 2px solid ${(props) => props.color};
    padding: 0.4rem 0.5rem;
    border-radius: 0.75rem;

    color: ${(props) => props.color};

    font-size: 0.875rem;

    display: flex;
    align-items: center;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.95)
    }
  }
`