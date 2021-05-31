import styled from 'styled-components'

export const Container = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 0 2rem;

  .report {
    display: block;
    text-align: left;
    margin-bottom: 1rem;
  }
`

export const PostDetails = styled.section`
  display: flex;
  justify-content: space-between;
  text-align: left;

  .report {
    display: block;
    margin-bottom: 1rem;
  }

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

export const Comments = styled.section`
margin-top: 0.5rem;
text-align: center;

span {
  display: inline-block;
  font-weight: bold;
  margin: 1rem 0;
}

div {
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + div {
    margin-top: 0.5rem;
  }
}
`

export const Reports = styled.section`
margin-top: 0.5rem;
text-align: center;

span {
  display: inline-block;
  font-weight: bold;
  margin: 1rem 0;
}

p {
  padding: 0 1rem;
  text-align: left;

  & + p {
    margin-top: 0.5rem;
  }
}

`

export const Buttons = styled.div`
 display: flex;
 align-items: center;
 justify-content: flex-end;
 gap: 1rem;
 
 margin-top: 1rem;
`