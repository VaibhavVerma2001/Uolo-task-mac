import React from 'react';
import './login.css';
import loginImg from '../../static/login.png';
import logo from '../../static/image1.png';


function Login() {
    return (
        <div className='login'>
            <div className="left">
                <img src={loginImg} alt="login-img" />
            </div>

            <div className="right">
                <div className="container">
                    <img src={logo} alt="logo-img" />
                    <hr/>
                    <span className="head">Welcome back!</span>
                    <span className="msg">Log in to continue and access all the features</span>

                    <form className="myForm">
                        <label htmlFor="email">Enter email</label>
                        <input type="email" id='email' name='email' placeholder='Enter email' />

                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' placeholder='Enter password' />

                        <button className='login-btn' type="submit">Login</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login
