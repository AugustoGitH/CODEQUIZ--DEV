import styled from "styled-components";
import animationsPresence from "../../animations/presence";


export const PageLoaded = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 15;
    background: #fff;
    ${animationsPresence.scale};
    display: flex;
    align-items: center;
    justify-content: center;
`