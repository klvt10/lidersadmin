import styled from "styled-components";

export const Container = styled.div`
  margin: auto;
  height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  max-width: 900px;
`;

export const Select = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  select {
    font-size: 0.9rem;
    height: 2rem;
    width: 10rem;
    border: none;
    background: none;
    border-bottom: 1px solid var(--white-disable);

    option {
      background: #fafafa;
    }
  }

  @media (max-width: 781px) {
    flex: 1;
    margin-bottom: 10px;
    width: calc(100% - 40px);

    select {
      flex: 1;
    }
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin-top: 0.5rem;

  div {
    display: flex;
  }

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
    flex-direction: column;
    height: 60px;

    margin-top: 1rem;
    margin-bottom: 0.5rem;
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

    span.value,
    span.request,
    span.transfer,
    span.edit {
      text-align: center;
    }
  }

  @media (max-width: 779px) {
    display: none;
  }
`;

export const RescuesMobile = styled.div`
  @media (min-width: 781px) {
    display: none;
  }

  height: calc(100vh - 175px);
  max-height: calc(100vh - 175px);
  overflow: hidden;
  overflow-y: auto;

  .rescue {
    display: flex;
    justify-content: space-between;
    margin: 1rem 1.5rem;
    padding: 0.85rem 0.65rem;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  }

  ul {
    list-style: none;

    li {
      & + li {
        margin-top: 0.5rem;
      }
    }
  }

  .last-ul {
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    li:last-child {
      flex: 1;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }

    img {
      width: 3rem;
      height: 3rem;
    }
  }
`;
