import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  overflow-y: auto;

  @media (max-width: 781px) {
    max-width: 100vw;
    margin: 0;
    padding: 0 0.5rem;
  }

  @media (min-width: 779px) {
    .buttonsMobile {
      display: none;
    }

    .view-user-mobile {
      display: none;
    }
  }

  @media (max-width: 781px) {
    .buttonsMobile {
      display: flex;
      justify-content: center;
      gap: 2.5rem;
      margin-top: 1rem;
    }

    .view-user-mobile {
      display: flex;
      justify-content: center;
      margin-top: 1rem;

      button {
        background: #FFF;
        border: 2px solid #8B008A;
        padding: 0.4rem 0;
        width: 24rem;
        border-radius: 0.75rem;

        color: #8B008A;

        font-size: 0.875rem;

        display: flex;
        align-items: center;
        justify-content: center;

        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.95)
        }
      }
    }
  } 
`

export const HeadSection = styled.div`
  margin-bottom: 1.5rem;

  text-align: left;
  font-weight: normal;
`

export const UserDetail = styled.div`
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

  label {
    display: block;
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

  @media (max-width: 781px) {
    display: none;
  }
`