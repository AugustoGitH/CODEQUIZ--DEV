import styled from 'styled-components'

interface IPropsEditorCode {
  readOnly: boolean
}

export const EditorCode = styled.div<IPropsEditorCode>`
  width: 100%;
  height: 100%;
  background: #282a36;
  padding: 1rem;
  color: #fff;
  border-radius: 0.3rem;
  position: relative;
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: ${(props) => (props.readOnly ? 'inline-block' : 'none')};
  }

  header {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    height: 22px;
    ul {
      display: flex;
      align-items: center;
      gap: 0.5rem;
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
    nav{
      gap: .5rem;
      display: flex;
      .marked-lang{
        background: #dedede;
        color: var(--color-dark);
      }
      
      button{
        all: unset;
        font-size: .7rem;
        text-transform: uppercase;
        padding: .2rem .8rem;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: .2s;
        border-radius: .4rem;
        &:hover{
          background: #dedede;
          color: var(--color-dark);
        }
      }
    }
  }
  .ace-editor-area {
    padding: 0.5rem 0;
    width: 100%;
    height: calc(100% - 22px);
    overflow: auto;
    outline: none;
    font-size: .82rem;
    @media (max-width: 500px) {
      font-size: .7rem;
    }
    *::-webkit-scrollbar {
      width: 5px; /* width of the entire scrollbar */
    }

    *::-webkit-scrollbar-track {
      background: transparent; /* color of the tracking area */
    }

    *::-webkit-scrollbar-thumb {
      background-color: #353547; /* color of the scroll thumb */
      border-radius: 20px; /* roundness of the scroll thumb */
    }
  }
`
