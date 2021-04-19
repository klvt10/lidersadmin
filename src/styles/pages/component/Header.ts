import styled, { css } from 'styled-components';

export const Container = styled.header`
  height: 64px;
  background: var(--main-color);

  nav {
    margin: auto;
    height: 100%;
    max-width: 900px;
    display: flex;

    a {
      cursor: pointer;

      img {
        height: 60px;
        width: 60px;
      }
    }

    .bell {
      align-self: center;

      img {
        height: 25px;
        width: 25px;
      }
    }

    ul {
      flex: 1;
      height: 100%;
      list-style: none;

      display: flex;
      justify-content: space-around;
    }
  }
`;

interface LiProps {
  isActive: boolean;
}

export const Li = styled.li<LiProps>`
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--white);
  ${props => props.isActive ? css`
    border-bottom: 1px solid var(--white);
  ` : ''};
`;
