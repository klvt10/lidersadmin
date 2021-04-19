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

export const Rescues = styled.ul`
  padding-top: 20px;
  max-height: calc(100% - 60px);
  overflow-y: auto;

  li {
    width: 100%;
    font-size: 0.9rem;
    display: grid;
    align-items: center;
    grid-template-columns: 2fr 2fr 1fr 2fr 2fr 3fr 1fr;
    padding: 5px 0;
    border-bottom: 1px solid var(--white-disable);

    span {
      button {
        font-size: 0px;

        img {
          width: 16px;
          height: 16px;
        }
      }
    }

    &:first-child {
      font-size: 1rem;
      font-weight: bold;
      padding: 8px 0;
    }

    span.value, span.request, span.transfer, span.edit {
      text-align: center;
    }
  }
`;