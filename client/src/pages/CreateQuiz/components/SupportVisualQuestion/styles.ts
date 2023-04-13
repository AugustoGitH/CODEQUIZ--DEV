import styled from 'styled-components'
import animationsPresence from '../../../../animations/presence'

const SupportVisualQuiz = styled.div`
  .block-code {
    margin-top: 2rem;
    width: 750px;
    height: 300px;
    @media (max-width: 880px) {
      width: 100%;
    }
    ${animationsPresence.scale}
  }
`

export { SupportVisualQuiz }
