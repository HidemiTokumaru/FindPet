import React, { useState } from "react";
import Componente1 from "./Componentes/Componente1";
import Componente2 from "./Componentes/Componente2";

export const MostrarPerro = () => {
  const [showComponent1, setShowComponent1] = useState(true);
  const [showComponent2, setShowComponent2] = useState(false);

  const handleShowComponent1 = () => {
    setShowComponent1(true);
    setShowComponent2(false);
  };

  const handleShowComponent2 = () => {
    setShowComponent1(false);
    setShowComponent2(true);
  };

  return (
    <div>
      <ul id="barraLateral">
        <li id="parteBarra">
          <button id="letrasBarra" onClick={handleShowComponent1}>
            My Posts
          </button>
        </li>
        <li id="parteBarra">
          <button id="letrasBarra" onClick={handleShowComponent2}>
            Posts
          </button>
        </li>
      </ul>

      <br />

      {showComponent1 && <Componente1 />}
      {showComponent2 && <Componente2 />}
    </div>
  );
};

export default MostrarPerro;
