import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = (props) => { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Objeto de datos a enviar al servidor
    const data = {
      username: name,
      email: email,
      password: pass
    };

    if (email && pass && name) {
      // Realizar la solicitud POST al servidor usando fetch
      fetch('http://localhost:5000/User', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      navigate('/principal');
    }
    else{
      alert("Por favor, complete todos los campos.")
  }
}

  return (
    <div className="auth-form-container">
      <h2>SignUp</h2>
      <form className="signUp-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
        <label htmlFor="email">email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        <button type="submit">Sign Up</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
  );

}