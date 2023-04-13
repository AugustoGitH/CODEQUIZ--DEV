import styled from "styled-components"
import animationsPresence from "../../../../animations/presence"


export const Question = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    ${ animationsPresence.scale };
    min-height: calc(100vh - 70px);
    padding: 2rem 0;
    .content{
        width: 750px;
        @media (max-width: 900px) {
            width: 100%;
        }
        h2{
            font-size: var(--font-size-medium);
            margin-bottom: .6rem;
            color: var(--color-info);
            position: relative;
            &::before{
                content: "";
                width: 15px;
                height: 15px;
                position: absolute;
                left: -.3rem;
                background: #4d4df628;
                border-radius: .3rem;
                z-index: -1;
            }
        }
        .block-code{
            margin-top: 2rem;
            width: 100%;
            min-height: 250px;
            background-color: var(--color-dark);
            border-radius: .5rem;
        }
        .question-paragraph{
            margin-bottom: 1.3rem;
            font-size: var(--font-size-small);
            word-wrap: break-word;
        }
        .grid-alternatives{
            display: grid;
            align-items: center;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
        .flexbox-alternatives{
            display: flex;
            flex-direction: column;
        }
        .alternatives{
            margin-top: 2rem;
            gap: 1rem;
            .alternative{
                display: flex;
                align-items: center;
                background: var(--color-gray-light);
                padding: .5rem 1rem;
                border-radius: .4rem;
                cursor: pointer;
                transition: .2s;
                height: var(--height-alternative);
                user-select: none;
                &:hover{
                    background: #79ff79;
                }
                span{
                    flex: none;
                    width: 30px;
                    height: 30px;
                    background-color: var(--color-dark);
                    color: #fff;
                    font-size: .9rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    margin-right: 1rem;
                }
                p{
                    font-size: var(--font-size-super-small);
                    width: 100%;
                    white-space: break-spaces;
                    word-break: break-all;
                }
            }
            .alt-readOnly{
                cursor: default;
                pointer-events: none;
            }
            .alt-correct{
                background-color: #79ff79;
            }
            .alt-incorrect{
                background-color: #f63939;
            }
            
        }
        .locked-alternatives{
            li{
                transition: .2s;
                background: #fbf827;
                pointer-events: none;
            }
        }
    }
`