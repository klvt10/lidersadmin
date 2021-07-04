import styled from 'styled-components'

export const Container = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 0 2rem;
  height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  overflow-y: auto;

  .report {
    display: block;
    text-align: left;
    margin-bottom: 1rem;
  }

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

  .button-web {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  @media (max-width: 781px) {
    .button-web {
      display: none;
    }
    
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
  margin-top: 1rem;
}

li {
  padding: 0 1rem;
  text-align: left;
  margin-left: 1rem;
  margin-top: 0.5rem;
}

`

export const Buttons = styled.div`
 display: flex;
 align-items: center;
 justify-content: flex-end;
 gap: 1rem;
 
 margin-top: 1rem;

 @media (max-width: 781px) {
    display: none;
  }
`