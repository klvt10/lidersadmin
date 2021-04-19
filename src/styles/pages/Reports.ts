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

export const Reports = styled.ul`
  padding-top: 20px;
  max-height: calc(100% - 60px);
  overflow-y: auto;

  li {
    width: 100%;
    font-size: 0.9rem;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 3fr 2fr 2fr 1fr 1fr;
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
    
    &:not(:first-child) {
      span.thumb {
        height: 40px;
      }
    }

    span.thumb {
      img {
        height: 40px;
        width: 40px;
        object-fit: contain;
        border-radius: 50%;
      }
    }

    span.type, span.resolved, span.date, span.edit {
      text-align: center;
    }
  }
`;