import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificar si los campos están llenados correctamente
    if (email && pass && name) {
      // Realizar acciones de registro o enviar datos al servidor

      // Redirigir al usuario a la ruta "/principal"
      navigate("/principal");
    } else {
      alert("Por favor, complete todos los campos.");
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

