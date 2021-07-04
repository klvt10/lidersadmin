import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1080px;
  margin: auto;
  height: calc(100vh - 84px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 1.5rem;
  text-align: center;
  color: var(--main-color);
  line-height: 2.5rem;

  @media (max-width: 480px) {
    font-size: 1.3rem;
    
    .hidden {
      display: none;
    }
  }
`;

export const BoxLoading = styled.section`
`;

export const BoxInfo = styled.section`
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  grid-gap: 10px;

  > a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 12rem;
    height: 12rem;
    box-shadow: 2px 2px 6px var(--white-disable);
    background: var(--white);
    transition: background 300ms ease;

    strong {
      font-size: 3rem;
      color: var(--main-color);
      transition: color 300ms ease;
    }

    span {
      text-align: center;
      color: var(--main-color);
      transition: color 300ms ease;
    }

    &:hover {
      background: var(--main-color);

      strong {
        color: var(--white);
      }

      span {
        color: var(--white);
      }

    }
  }

  @media (max-width: 781px) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    a {
      width: 20rem;
      height: 7rem;
    }
  }
`;
