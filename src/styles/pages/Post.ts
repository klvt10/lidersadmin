import styled from 'styled-components'

export const Container = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 0 2rem;

  > div {
    margin-top: 1rem;
    gap: 1rem;

    display: flex;
    justify-content: flex-end;
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
`

export const Icons = styled.div`
  display: flex;
  margin-top: 0.5rem;
`

export const Reports = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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