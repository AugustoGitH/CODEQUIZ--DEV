import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import verifyTokenServices from "../../services/public/VerifyToken"

interface IPropsPrivateRouter{
    children: JSX.Element,
    redirect: string,
    reverse?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PrivateRouter = ({
    children, redirect, reverse }: IPropsPrivateRouter) => {

    const [isAuth, setIsAuth] = useState<boolean | null>(null);
  
    useEffect(() => {
        verifyTokenServices.user().then(response => {
            const { isLogged } = response.data.user
            setIsAuth( reverse ? !isLogged : isLogged )
      });
    }, []);
  
    return  isAuth === null
    ? <></>
    : isAuth
      ? children
      : <Navigate to={redirect} />;
  }


export default PrivateRouter