import React from "react";
import {useJwtToken} from "../hooks/useJwtHook.tsx";
import {Navigate, useLocation} from "react-router-dom";
/**
 * A higher order component that checks if a user is signed in (auth is set in redux with a valid JWT). If the user is signed they get redirected to the protected route, else the user is redirected to the login page.
 * @param {Component} childComponent child component called in the body of Private route
 * @returns {JSX.Element} Either the protected component or a react router redirect depending if the user is logged in.
 * @constructor
 */

interface PrivateRouteProps {
    children: React.ReactNode
}
export function PrivateRoute (props: PrivateRouteProps) {
    const {children} = props

    const {profile, isLoading} = useJwtToken()


    if(isLoading === true) {
        return <IsLoading />

    } else if(  profile === null) {
        return <HandleRedirect />
    }

    return children
}

export function HandleRedirect() {
    let location = useLocation();
    return (
        <>
            <Navigate to="/" state={{ from: location }} replace />;
        </>

    )
}




export function IsLoading () {
    return(
        <>
            <h1>Page is still loading</h1>
        </>
    )
}