import styled from 'styled-components'

export const Container = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 0 2rem;
  height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  overflow-y: auto;

  .sectionButtons {
    margin-top: 1rem;
    gap: 1rem;

    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 781px) {
    max-width: 100vw;
    margin: 0;
    padding: 0 0.5rem;

    .sectionButtons {
      justify-content: center;
      gap: 2.2rem;
    }
  }
`

export const PostDetails = styled.section`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
  }

  ul {
    text-align: left;
    margin-top: 0.5rem;
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

  .avatar {
    width: 11rem;
    height: 11rem;
    border-radius: 10px;
    object-fit: cover;
  }

  @media (max-width: 781px) {
    flex-direction: column;

    .avatar {
      width: 7.5rem;
      height: 7.5rem;
    }
  }
`

export const Icons = styled.div`
  display: flex;
  margin-top: 0.5rem;

  @media (max-width: 781px) {
    margin: 2.5rem auto 0;
  }
`

export const Reports = styled.ul`
  text-align: left;
  margin-right: auto;

  margin-left: 2rem;

  li {
    margin-top: 0.5rem;
  }
`

export const Comments = styled.div`
margin-top: 0.5rem;

display: flex;
align-items: center;
justify-content: space-between;

button {
  background: none;
  border: none;
}
`