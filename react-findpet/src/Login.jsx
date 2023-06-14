import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Objeto de datos a enviar al servidor
    const data = {
      username: email,
      password: pass
    };

    if(email === "" || pass === ""){
        alert("llena las casillas")
    }
    else{
    // Realizar la solicitud POST al servidor usando fetch
    fetch('http://localhost:5000/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    navigate('/principal');

}
}

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit} method="POST">
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        <button type="submit">Log In</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('signUp')}>Don't have an account? Register here.</button>
    </div>
  )
}