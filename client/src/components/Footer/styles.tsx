import styled from "styled-components";



export const Footer = styled.footer`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-gray-light);
    border-top: 1.4px solid #00000015;
    padding: 2rem 0;
    .content{
        width: 1000px;
        font-family: var(--font-Consolas);
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .title{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            line-height: .8rem;
            h1 {
                display: flex;
                align-items: center;
                cursor: pointer;
                gap: 0.3rem;
                transition: 0.3s;

                &::after, &::before{
                    font-size: .7rem;
                    color: var(--color-danger);
                    margin: .4rem;
                }
                &::after{
                    content: "</h1>";
                }
                &::before{
                    content: "<h1>"
                }
            }
            h5{
                color: #000000b5;
                &::after, &::before{
                    font-size: .7rem;
                    color: var(--color-danger);
                    margin: .4rem;
                }
                &::after{
                    content: "</h5>";
                }
                &::before{
                    content: "<h5>"
                }
            }
        }
    }

`