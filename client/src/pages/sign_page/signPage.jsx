import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './signPage.css';
import { useAppSelector } from "../../app/hooks";
import { Login, Register } from "../../features/auth/ui";

export const SignPage = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const [mode, setMode] = useState('login');

    if(isAuth) return <Navigate to="/main" replace />

    return (
        <div className="sign-page">
            {mode === 'login' ? 
            (<Login />) : 
            (<Register />)}
        </div>
    )
};