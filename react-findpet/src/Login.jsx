import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificar si los campos están llenados correctamente
    if (email && pass) {
      // Comparar los datos del formulario con los usuarios registrados en la base de datos
      fetch('http://localhost:5000/User', { method: 'GET',})
        .then(response => response.json())
        .then(users => {
          let isLoggedIn = false;
          users.forEach(user => {
            if (user.email === email && user.password === pass) {
              isLoggedIn = true;
            }
          });
          if (isLoggedIn) {
            // Si el usuario existe, redirigir a la ruta /principal
            navigate("/principal");
          } else {
            alert("El usuario no existe.");
          }
        });
      } 
    
    else {
      alert("Por favor, complete todos los campos.");
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
  );
}