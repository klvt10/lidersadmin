import styled from 'styled-components';

export const Container = styled.section`
  display: flex;

  ul {
    text-align: left;
    margin-left: 2rem;

    & + ul {
    margin-left: 14rem; 
    }

      li {
        list-style: none;

        & + li {
          margin-top: 0.8rem;
        }
      }
  }

  .userThumbnail {
    width: 11rem;
    height: 11rem;
    border-radius: 10px;
  }

  @media (max-width: 779px) {
    display: none;
  }
`

export const ContainerMobile = styled.div`
@media (min-width: 781px) {
  display: none;
}

.first-list {
  display: flex;

  ul {
    margin-left: 1.5rem;
  }
}

.second-list {
  margin-top: 0.8rem;
}

  ul {
    text-align: left;

    li {
      list-style: none;

      & + li {
        margin-top: 0.8rem;
      }
    }
  }

  .userThumbnail {
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 10px;
  }

`
