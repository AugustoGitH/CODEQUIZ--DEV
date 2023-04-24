import React from "react";
import { Navigate } from "react-router-dom";
import useFetchVerifyCredential from "../../queries/verifyCredential";


interface IPropsPrivateRouter{
    children: JSX.Element,
    redirect: string,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PrivateRouter = ({
    children, redirect }: IPropsPrivateRouter) => {
        const { data: auth, isFetching } = useFetchVerifyCredential()
        
        if(!auth && !isFetching) return <Navigate to={redirect} />
        if(auth) return children
        return <></>
  }


export default PrivateRouter