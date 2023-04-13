import styled from 'styled-components'

const AceEditorStyled = styled.div`
  width: 100%;
  height: 100%;
  background: #282a36;
  padding: 1rem;
  color: #fff;
  border-radius: 0.3rem;
  header {
    all: unset;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 20px;
    .circle-decoration {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      &:nth-child(1) {
        background: #ff3a3a;
      }
      &:nth-child(2) {
        background: #ffeb3a;
      }
      &:nth-child(3) {
        background: #49e61d;
      }
    }
  }
  .ace-editor-area {
    padding: .5rem 0;
    width: 100%;
    height: calc(100% - 10px);
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px; /* width of the entire scrollbar */
    }

    &::-webkit-scrollbar-track {
      background: transparent; /* color of the tracking area */
    }

    &::-webkit-scrollbar-thumb {
      background-color: #353547; /* color of the scroll thumb */
      border-radius: 20px; /* roundness of the scroll thumb */
    }
  }
  .ace-not_bracket {
    .ace_bracket {
      border: none;
    }
  }
`

export { AceEditorStyled }
