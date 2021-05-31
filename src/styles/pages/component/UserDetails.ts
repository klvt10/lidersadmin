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
`
