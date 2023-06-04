import * as F from './styles'

export default function Footer() {
  return (
    <F.Footer>
      <div className="content">
        <div className="title">
          <h1>CodeQuiz</h1>
          <h5>Desafios de programação</h5>
        </div>
        <nav>
          <a
            href="https://www.linkedin.com/in/augusto-westphal/"
            target="_blank"
          >
            <i className="bx bxl-linkedin-square"></i>
          </a>
          <a href="https://github.com/AugustoGitH" target="_blank">
            <i className="bx bxl-github"></i>
          </a>
        </nav>
        <p className="rigths-reserveds">
          ©{' '}
          <a target="_blank" href="https://augustowestphal.up.railway.app">
            Augusto Caetano Westphal
          </a>
          , 2023. <br />All Rights Reserved
        </p>
      </div>
    </F.Footer>
  )
}
