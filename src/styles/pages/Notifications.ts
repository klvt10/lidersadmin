import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin: auto;
  height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  max-width: 900px;
`;

export const Search = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 40px;

  input {
    width: 300px;
    border: none;
    border-bottom: 1px solid var(--white-disable);
    outline: none;
    background: none;
  }

  .buttonMobile {
    background: none;
    border: none;
    display: flex;
    align-items: center;

    margin-left: 0.75rem;
  }

  @media (max-width: 781px) {
    justify-content: center;

    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
`;

export const Notifications = styled.ul`
  padding-top: 20px;
  max-height: calc(100% - 60px);
  overflow-y: auto;

  li {
    width: 100%;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 10px 0;
    border-bottom: 1px solid var(--white-disable);
    border-right: 1px solid var(--white-disable);

    section {
      display: flex;
      justify-content: space-between;

      span.date {
        font-weight: bold;
        font-size: 0.7rem;
        color: var(--font-color-opaque);
      }
    }
  }

  @media (max-width: 781px) {
    display: none;
  }
`;


interface NotificationProps {
  isActive: boolean;
}

export const TextNotification = styled.span<NotificationProps>`
  color: var(--font-color-opaque);
  font-size: 0.7rem;

  button {
    color: var(--main-color);
    background: none;
    font-size: 0.7rem;
    border: none;
    outline: none;
    ${props => props.isActive ? css`
    font-weight: bold;
  ` : ''};
  }

  ${props => props.isActive ? css`
    font-weight: bold;
  ` : ''};

`

export const NotificationsMobile = styled.div`

@media (min-width: 781px) {
  display: none;
}

  height: calc(100vh - 175px);
  max-height: calc(100vh - 175px);
  overflow: hidden;
  overflow-y: auto;

div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  margin: 1rem 1.5rem;
  padding: 0.85rem 0.65rem;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);

  span.date {
    font-weight: bold;
    font-size: 0.9rem;
    color: var(--font-color-opaque);
  }

  span.read {
    color: var(--font-color-opaque);
    font-size: 0.9rem;

    button {
      color: var(--main-color);
      background: none;
      font-size: 0.9rem;
      border: none;
      outline: none;
    }
  }
}

height: 45rem;
overflow: hidden;
overflow-y: auto;

`