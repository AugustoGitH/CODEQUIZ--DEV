import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import verifyTokenServices from "../../services/public/VerifyToken"
import authenticationServices from '../../services/public/Authentication';


import PopUpConfirm from "../PopUpConfirm"

import * as H from "./styles"

interface IPropsHeader{
    position?: "sticky" | "fixed",
    home?: {
        default: boolean,
        playQuizzes?: boolean
    },
    painel?: {
        logout?: boolean,
        back?: boolean,
        historyQuestions?: boolean,
        playQuizzes?: boolean
    },
    children?: JSX.Element,
}




const Header = (
    { position = "sticky", home = {
        default: false
    }, painel = {
        logout: false, back: false, playQuizzes: false
    }, children }: IPropsHeader
)=>{
    const navigation = useNavigate();
    const [ isUser, setIsUser ] = useState<boolean | null>(null)
    const [ showPopUpLogout, setShowPopUpLogout ] = useState<boolean>(false);
    useEffect(()=>{
        if(home){
            verifyTokenServices.user().then(response=>{
                const { data } = response
                setIsUser(data.user.isLogged)
            })
        }
    }, [])

    const logout = ()=>{
        authenticationServices.logout().then(response=>{
            const { message, status } = response
            if(status) return navigation("/auth/login")
            else{
                alert(message)
                setShowPopUpLogout(false)
            }
        })
    }

    const ButtonsHeader = (): React.ReactElement[] | [] =>{
        const buttonsIncludes = []

        if( home?.playQuizzes || painel?.playQuizzes ){
            buttonsIncludes.push(
                <Link 
                    key="quizzes" 
                    className="button-header button-blue" to="/quizzes"
                >QUIZZES</Link>
            )
        }
        if( painel.back ){
            buttonsIncludes.push(
                <Link 
                    key="painel"  
                    to="/painel" 
                    className="button-header button-blue"
                >Voltar</Link>
            )
        }
        if( painel.logout ){
            buttonsIncludes.push(
                <button 
                    className="button-header button-red"
                    onClick={()=> setShowPopUpLogout(true)}
                    key="logout"
                >Sair</button>
            )
        }
        if( home.default && isUser ){
            buttonsIncludes.push(
                <Link 
                    to="/painel" 
                    className="button-header button-blue"
                    key="logout"
                >Painel</Link>
            )
        }
        if( home.default && !isUser !== null && isUser === false ){
            buttonsIncludes.push(
                <span key="auth" className="nav-content">
                    <Link 
                        to="/auth/login" 
                        className="button-header button-blue"
                    >Login</Link>
                    <Link 
                        to="/auth/register" 
                        className="button-header button-red"
                    >Register</Link>
                </span>
            )
        }

        return buttonsIncludes
    }

    return (
        <>
            <PopUpConfirm
                show={showPopUpLogout}
                helperText="Você deseja sair da sua conta atual?"
                handleClickButtons={{
                yes: logout,
                not: () => setShowPopUpLogout(false),
            }}/>
            <H.Header position={position}>
                <H.Content>
                    <Link to="/" className="title-header">
                        <h1>CodeQuiz</h1>
                    </Link>
                    <H.Nav>
                       { ButtonsHeader().length > 0 ? ButtonsHeader() : <></> }
                       { children }
                    </H.Nav>
                </H.Content>
            </H.Header>
        </>
    )
}


export default Header