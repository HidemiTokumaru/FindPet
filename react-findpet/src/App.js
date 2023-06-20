import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import PrincipalPage from "./Principalpage";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <SignUp onFormSwitch={toggleForm} />} />
          <Route path="/signup" element={<SignUp onFormSwitch={toggleForm} />} />
          <Route path="/principal" element={<PrincipalPage />} />
          <Route path="/principal/:userId" element={<PrincipalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';
// import { Login } from "./Login";
// import { SignUp } from "./SignUp";
// import PrincipalPage from "./Principalpage";

// function App() {
//   const [currentForm, setCurrentForm] = useState('login');

//   const toggleForm = (formName) => {
//     setCurrentForm(formName);
//   }

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <SignUp onFormSwitch={toggleForm} />} />
//           <Route path="/signup" element={<SignUp onFormSwitch={toggleForm} />} />
//           <Route path="/principal" element={<PrincipalPage />} />
//           <Route path="/principal/:userId" element={<PrincipalPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

