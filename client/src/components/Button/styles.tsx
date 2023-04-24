import styled from 'styled-components'
import animationsPresence from '../../animations/presence'

interface IPropsHeaderStyled {
  size: 'small' | 'medium' | 'large'
  color: 'info' | 'dark' | 'danger' | 'success'
  hoverEffect?: 'bkg-bd' | 'bd-bkg'
}

export const Button = styled.button<IPropsHeaderStyled>`
  all: unset;
  text-transform: capitalize;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  padding: 0.6rem 1rem;
  font-size: ${(props) =>
    props.size === 'small'
      ? 'var(--font-size-small)'
      : props.size === 'medium'
      ? 'var(--font-size-medium)'
      : props.size === 'large'
      ? 'var(--font-size-large)'
      : ''};
  border: 1.3px solid ${(props) => `var(--color-${props.color})`};
  color: ${(props) =>
    props.hoverEffect === 'bd-bkg'
      ? `var(--color-${props.color})`
      : 'var(--color-light)'};
  transition: 0.3s;
  border-radius: 0.3rem;
  text-align: center;
  cursor: pointer;
  background: ${(props) =>
    props.hoverEffect === 'bd-bkg'
      ? 'transparent'
      : `var(--color-${props.color})`};
  ${animationsPresence.scale};
  @media (max-width: 500px) {
    padding: 0.4rem .8rem;
    font-size: var(--font-size-super-small);
  }
  &::after {
    content: '}';
    margin: 0.5rem;
    transition: margin 0.2s;
  }
  &::before {
    content: '{';
    margin: 0.5rem;
    transition: margin 0.2s;
  }
  &:hover {
    background: ${(props) =>
      props.hoverEffect === 'bd-bkg'
        ? `var(--color-${props.color})`
        : 'transparent'};
    color: ${(props) =>
      props.hoverEffect === 'bd-bkg'
        ? `var(--color-light)`
        : `var(--color-${props.color})`};
    &::after{
      margin-left: 1rem;
    }
  
    &::before {
      margin-right: 1rem;
    }
  }
`
