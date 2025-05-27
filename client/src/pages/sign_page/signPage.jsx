import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../../components/auth/loginForm";
import RegistrationForm from "../../components/auth/registrationForm";
import './signPage.css';

const SignPage = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [singUp, setSignUp] = useState(true);
    const [singIn, setSignIn] = useState(false);

    useEffect(() => {
        if(user) {
            navigate('/main');
        }
    }, [user, navigate]);
    
    function changeForm(event) {
        if(event.target.className == "signIn") {
            setSignIn(true);
            setSignUp(false);
        }
        else {
            setSignIn(false);
            setSignUp(true);
        }
    }

    return (
        <div className="sign-page">
            <div className="change-from" style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width: '400px', marginLeft:'50px'}}>
                <button className={singUp ? 'signUp active': 'signUp'} onClick={(e) => changeForm(e)} >signUp</button>
                <button className={singIn ? 'signIn active': 'signIn'} onClick={(e) => changeForm(e)} >signIn</button>
            </div>
            {singIn? <LoginForm/>: ''}
            {singUp? <RegistrationForm/>: ''}
        </div>
    )
}

export default SignPage;