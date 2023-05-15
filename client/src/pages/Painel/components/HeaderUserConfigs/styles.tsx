import styled from "styled-components";

export const HeaderUserConfigs = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.4px solid #00000019;
  padding: 0 2rem 1rem 2rem;
  .image-profile-user{
    cursor: pointer;
    width: 50px;
    height: 50px;
    background-color: var(--color-gray-light);
    border-radius: 50%;
    border: 1.3px solid #00000032;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &::after{
      content: "Trocar imagem";
      position: absolute;
      width: 90px;
        font-size: .6rem;
        background-color: var(--color-dark);
        color: var(--color-light);
        text-align: center;
        line-height: .6rem;
        padding: .3rem .5rem;
        border-radius: .3rem;
        z-index: 1;
        bottom: -1.8rem;
        right: -50%;
        text-transform: uppercase;
        transform: translateY(-17px);
        opacity: 0;
        transition: .2s;
        pointer-events: none;
    }
    &:hover{
      &::after{
        transform: translateY(0);
        opacity: 1;
      }
    }
    img{
      border-radius: 50%;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  .nav-buttons{
    display: flex;
    gap: .7rem;
    button{
      all: unset;
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      color: var(--color-light);
      background-color: var(--color-gray-light);
      border-radius: 50%;
      border: 1.3px solid #00000020;
      color: var(--color-dark);
      transition: .2s;
      cursor: pointer;
      position: relative;
      i{ transition: .2s; }
      &:hover{
        background-color: transparent;
        color: var(--color-dark);
        i{ transform: scale(1.2)  }
      }
    }
    .button-trophy, .button-stats, .button-config{
      &::after{
        position: absolute;
        font-size: .6rem;
        background-color: var(--color-dark);
        color: var(--color-light);
        text-align: center;
        line-height: .6rem;
        padding: .3rem .5rem;
        pointer-events: none;
        border-radius: .3rem;
        z-index: 1;
        bottom: -1.8rem;
        text-transform: uppercase;
        transform: translateY(-17px);
        opacity: 0;
        transition: .2s;
        
      }
      &:hover{
        &::after{
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
    .button-trophy::after{
      content: "conquistas";
    }
    .button-stats::after{
      content: "Estátisticas";
    }
    .button-config::after{
      content: "Configurações";
    }
  }

`