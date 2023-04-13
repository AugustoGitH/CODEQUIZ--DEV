import styled from "styled-components";


interface IPropsHeaderStyled{
  position: "sticky" | "fixed"
}

const Header = styled.header<IPropsHeaderStyled>`
  width: 100%;
  padding: 0.7rem 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${(props) => props.position};
  border-bottom: 1.4px solid #00000010;
  font-family: var(--font-Consolas);
  top: 0;
  z-index: 10;
  background: var(--color-light);
  height: 70px;
  @media (max-width: 500px) {
    height: 60px;
    }
`;

const Content = styled.div`
  width: 1000px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title-header{
    h1 {
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 0.3rem;
      transition: 0.3s;
      font-size: var(--font-size-large);
      @media (max-width: 500px) {
        font-size: var(--font-size-medium);
      }
      &::after, &::before{
        font-size: .7rem;
        color: var(--color-danger);
        @media (max-width: 500px) {
          font-size: .5rem;
        }
      }
      &::after{
        content: "</h1>";
      }
      &::before{
        content: "<h1>"
      }
    }
  }
`;

const Nav = styled.nav`
  &, .nav-content{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 1rem;
    @media (max-width: 500px) {
      gap: .5rem;
    }
  }
  .button-header {
    all: unset;
    font-size: var(--font-size-small);
    cursor: pointer;
    
    color: var(--color-light);
    height: 100%;
    padding: 0 1.6rem;
    border-radius: 0.3rem;
    text-transform: uppercase;
    gap: 0.3rem;
    transition: 0.3s;
    display: flex;
    align-items: center;
    @media (max-width: 500px) {
      padding: 0 1rem;
      font-size: var(--font-size-super-small);
    }
    &:hover {
      background: transparent;
      color: var(--color-danger);
    }
    span {
      font-size: 0.8rem;
      color: var(--color-danger);
    }
  }
  .button-blue {
    background: var(--color-info);
    border: 1.3px solid  var(--color-info);
    &:hover {
      color:  var(--color-info);
    }
  }
  .button-red {
    background: var(--color-danger);
    border: 1.3px solid var(--color-danger);
    &:hover {
      color: var(--color-danger);
    }
  }
  .button-green{
    background: var(--color-success);
    border: 1.3px solid var(--color-success);
    &:hover {
      color: var(--color-success);
    }
  }
`;

export { Header, Content, Nav }