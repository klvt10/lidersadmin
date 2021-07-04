import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  height: calc(100vh - 125px);
  max-height: calc(100vh - 125px);
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

export const Posts = styled.ul`
  padding-top: 20px;
  max-height: calc(100% - 60px);
  overflow-y: auto;

  li {
    width: 100%;
    font-size: 0.9rem;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 3fr 2fr 1fr 3fr 1fr;
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

    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:first-child {
      font-size: 1rem;
      font-weight: bold;
      padding: 8px 0;
    }

    span.thumb {
      img {
        height: 40px;
        width: 40px;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    span.user, span.active, span.date, span.edit {
      text-align: center;
    }
  }

@media (max-width: 779px) {
  display: none;
}
`;

export const PostMobile = styled.div`
@media (min-width: 781px) {
  display: none;
}

  height: calc(100vh - 175px);
  max-height: calc(100vh - 175px);
  overflow: hidden;
  overflow-y: auto;

.post-description {
  display: flex;
}

.post {
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

ul:first-child {
  margin-right: 1rem;
}

.icon {
  right: 1rem;
  bottom: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  img {
    width: 3rem;
    height: 3rem;
  }
}

img {
  height: 6.8rem;
  width: 6.8rem;
  object-fit: cover;
  border-radius: 20px;
}
`