import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
`

export const HeadSection = styled.div`
  margin-bottom: 1.5rem;

  text-align: left;
  font-weight: normal;
`

export const UserDetails = styled.div`
  display: flex;
  align-items: center;

  ul {
    text-align: left;
    margin-left: 1rem;

    & + ul {
    margin-left: 8rem; 
    }

      li {
        list-style: none;

        & + li {
          margin-top: 0.8rem;
        }
      }
  }

  img {
    width: 11rem;
    border-radius: 10px;
  }
`

export const OthersReports = styled.div`
  span {
    display: inline-block;
    margin: 1rem 0;
    font-weight: bold;
  }

  p {
    text-align: left;

    & + p {
      margin-top: 0.5rem;
    }
  }
`


export const ButtonsSection = styled.div`
  margin-top: 1.5rem;

  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`