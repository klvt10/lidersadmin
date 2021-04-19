import styled from 'styled-components';

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

      span.read {
        color: var(--font-color-opaque);
        font-size: 0.7rem;

        button {
          color: var(--main-color);
          background: none;
          font-size: 0.7rem;
          border: none;
          outline: none;
        }
      }
    }
  }
`;