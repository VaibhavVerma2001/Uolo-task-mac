import React, { useContext, useState } from 'react';
import axios from 'axios';
import './login.css';
import ServerError from '../../components/shared/ServerError/ServerError';
import loginImg from '../../static/login.png';
import logo from '../../static/image1.png';
import UserContext from '../../context/UserContext';

function Login() {

    const context = useContext(UserContext);
    const { setUser } = context;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [serverError, setServerError] = useState(false);
    const [error , setError] = useState("");


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/user/login", {
                email,
                password
            });
            // console.log(res.data);
            if (res.data.success) {
                // console.log("Login successfull");
                const data = res.data.data;
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
                localStorage.setItem("accessToken", data.accessToken);
            }
            else{
                // console.log(res.data.err);
                setError(res.data.err);
            }
        } catch (err) {
            console.log(err);
            setServerError(true);
        }
    }

    return (
        <div className='login'>
            {!serverError &&
                <>
                    <div className="left">
                        <img src={loginImg} alt="login-img" />
                    </div>

                    <div className="right">
                        <div className="container">
                            <img src={logo} alt="logo-img" />
                            <hr />
                            <span className="head">Welcome back!</span>
                            <span className="msg">Log in to continue and access all the features</span>

                            <form className="myForm" onSubmit={handleLogin}>
                                <label htmlFor="email">Enter email</label>
                                <input type="email" id='email' name='email' required placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />

                                <label htmlFor="password">Password</label>
                                <input type="password" id='password' name='password' required placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />

                                <button className='login-btn' type="submit">Login</button>
                                {error && <span className="error-text">{error}</span>}
                            </form>
                        </div>
                    </div>
                </>
            }

            {serverError && <ServerError />}
        </div>
    )
}

export default Login
