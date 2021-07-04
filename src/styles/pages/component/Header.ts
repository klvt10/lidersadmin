import styled, { css, keyframes } from 'styled-components';

const slideIn = keyframes`
  0% { top: 63px; }
  100% { top: -100vh; }
`

const slideOut = keyframes`
  0% { top: -100vh; }
  100% { top: 63px; }
`

export const Container = styled.header`
  height: 64px;
  background: var(--main-color);

  p {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--white);
    font-size: 1.3rem;
  }

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

      .hiddenPage {
        display: none;
      }
    }
  }

  @media (max-width: 781px) {
    .bell {
      display: none;
    }

    nav {
      ul {
        .hiddenPage {
          display: flex;
        }
      }
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

  .notification {
      display: none;
    }

  @media (max-width: 781px) {
    
    .notification {
      display: inherit;
    }

    ${ props => props.isActive ? css`
      display: inherit;
      border-bottom: none;
    ` : css`
      display: none;
    `}
  }
`;

export const Menu = styled.div`
  @media (min-width: 779px) {
    display: none;
  }

  display: flex;
  align-items: center;
  margin-right: 1rem;

  button {
    background: none;
    border: none;
  }
`
interface LiMobileProps {
  openedMenu: boolean;
}

export const Pages = styled.ul<LiMobileProps>`
  @media (min-width: 779px) {
    display: none;
  }
  
  ${({ openedMenu }) => openedMenu === undefined ? '' : css`
    animation: ${openedMenu 
      ? css`${slideOut} 300ms linear forwards`
      : css`${slideIn} 300ms linear forwards`};
  `}

  position: absolute;
  height: calc(100vh - 63px);
  width: 100vw;

  top: -100vh;
  background: var(--main-color);

  .chevron {
    background: none;
    border: none;
    width: 100vw;

    display: flex;
    justify-content: center;
    margin-top: calc(100vh - 597.4px);
    padding-bottom: 1rem;
    
    img {
      width: 3rem;
    }
  }
`

export const LiMobile = styled.li`
  font-weight: bold;
  color: var(--white);
  font-size: 2rem;
  margin: 7.2rem 0 0 1.2rem;

  display: flex;
  align-items: center;
  gap: 1rem;

  & + li {
    margin-top: 2.5rem;
  }
`
