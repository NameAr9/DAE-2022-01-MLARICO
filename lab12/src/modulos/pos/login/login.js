import React from 'react';

const login = () => {
        
	return (
        <div className="login">
        <div className="login-header">
            <h1>Loggin</h1>
        </div>
        <div className="login-form">
            <h3>Email:</h3>
            <input type="text" placeholder="Username"/><br>
            <h3>Password:</h3>
            <input type="password" placeholder="Password"/>
            <br>
            <input type="button" value="Iniciar sesion" className="login-button"/>
            <br>
            <a className="sign-up">Sign Up!</a>
            <br>
            <h6 className="no-access">Can't access your account?</h6>
        </div>
        </div>
        <div class="error-page">
        <div class="try-again">Error: Try again?</div>
        </div>
	);
};