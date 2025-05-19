import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, login } from "../../features/auth/authSlice";
import './loginForm.css'

const LoginForm = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    console.log('error', error)

    return (
        <form className="reg-form" onSubmit={handleSubmit}>
            
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="type email"
                required
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="type password"
                required
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign In"}
            </button>
            {error && (
                <div className="error" style={{display: 'flex', flexDirection: 'row'}}>
                    {error}
                    <button className="error-btn" type="button" onClick={() => dispatch(clearError())}>×</button>
                </div>
            )}
        </form>
    );
};

export default LoginForm;