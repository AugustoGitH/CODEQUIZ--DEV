import { ContainerStyled } from './styles';
import React from 'react';


export default function Container({ children }: { children: React.ReactNode}) {
  return (
    <ContainerStyled>
      <div className="content">{children}</div>
    </ContainerStyled>
  );
}
