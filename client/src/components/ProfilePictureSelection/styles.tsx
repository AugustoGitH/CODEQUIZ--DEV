import styled from "styled-components";
import animationsPresence from "../../animations/presence";



export const ProfilePictureSelection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  background-color: #0203152e;
  width: 100vw;
  min-height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .selection-card{
    background-color: var(--color-gray-light);
    width: 600px;
    height: 450px;
    padding: 3rem 2rem 2rem 2rem;
    ${animationsPresence.scale};
    border-radius: .8rem;
    display: flex;
    flex-direction: column;
    justify-content: flex;

    align-items: center;
    position: relative;
    @media (max-width: 700px) {
      width: 100%;
    }
    @media (max-width: 460px) {
      height: 380px;
    }
    .button-close, .button-close-focus{
      position: absolute;
      bottom: 2rem;
      background: var(--color-danger);
      color: #fff;
      padding: .8rem 1.3rem;
      font-size: var(--font-size-super-small);
      text-transform: uppercase;
      border-radius: .3rem;
      cursor: pointer;
      border: 1.3px solid var(--color-danger);
      transition: .2s;
      &:hover{
        background-color: transparent;
        color: var(--color-danger);
      }
    }
    .button-close-focus{
      background-color: var(--color-info);
      border: 1.3px solid var(--color-info);
      &:hover{
        color:  var(--color-info);
      }
    }
    .image-selected{
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
      ${animationsPresence.scale};
      border: 1.4px solid #00000013;
      @media (max-width: 460px) {
        width: 150px;
        height: 150px;
      }
    }
    .button-select-image{
      all: unset;
      margin-top: 1rem;
      text-transform: uppercase;
      color: var(--color-info);
      border: 1.3px solid var(--color-info);
      padding: .3rem 1.5rem;
      border-radius: .2rem;
      cursor: pointer;
      font-size: var(--font-size-super-small);
      transition: .2s;
      &:hover{
        background-color: var(--color-info);
        color: #fff;
      }
    }
    .images-options{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.2rem;
      @media (max-width: 460px) {
        gap: .8rem;
      }
      li{
        border: 1.4px solid #00000013;
        border-radius: .6rem;
        width: 120px;
        height: 120px;
        overflow: hidden;
        box-shadow: 0px 0px 16px #8a8a8a11;
        transition: .2s;
        cursor: pointer;
        overflow: hidden;
        ${animationsPresence.scale};
        @media (max-width: 460px) {
          width: 90px;
          height: 90px;
        }
        &:hover{
          img{
            transform: scale(1.5);
          }
        }
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: .2s;
        }
      }
    }
  }

`