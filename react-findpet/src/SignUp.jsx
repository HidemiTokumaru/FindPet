import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = (props) => { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Objeto de datos a enviar al servidor
    const data = {
      username: name,
      email: email,
      password: pass
    };
  
    if (email && pass && name) {
      try {
        // Realizar la solicitud POST al servidor usando fetch
        const response = await fetch('http://127.0.0.1:5000/User', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          // La solicitud POST fue exitosa, realizar la solicitud GET para obtener el userId
          const getUsersResponse = await fetch('http://127.0.0.1:5000/User', { method: 'GET' });
          const users = await getUsersResponse.json();
          let userId = null;
          users.forEach(user => {
            if (user.email === email && user.password === pass) {
              userId = user.IdUser;
            }
          });
          navigate(`/principal/${userId}`);
        } else {
          throw new Error('Error al realizar la solicitud POST');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Por favor, complete todos los campos.');
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