import styled from 'styled-components'

const PainelScreen = styled.div`
  width: 100%;
  padding: 2rem 0;
  .apresentation-container {
    padding: 2rem 0;
    .nav-buttons-acess {
      width: 100%;
      padding: 2rem 0;
      display: flex;
      justify-content: center;
      @media (max-width: 500px) {
        button{
          width: 100%;
        }
      }
    }
  }
  .challenges-created-by {
    padding: 3rem 0;
  }
`

export { PainelScreen }
