import React, {useState} from "react";
import Componente1 from "./Componentes/Componente1";

export const MostrarPerro = () =>{

    return(
        //Hacer una intereativa para mostrar todos los perros perdidos de la tabla
        <div>
         <ul id="barraLateral">
             <li id="parteBarra"><b id="letrasBarra">FindPet</b></li>
             <li id="parteBarra"><a id="textoBarra">Ayuda encontrando los perros</a></li>
             <li id="parteBarra"><a id="textoBarra">Tu perfil</a></li>
             <li id="parteBarra"><a id="textoBarra">Login</a></li>
             <li id="parteBarra"><a id="textoBarra">Sign up</a></li>
         </ul>

        <Componente1/>
        <Componente1/>
        <Componente1/>
        <Componente1/>
        </div>
    )

}


export default MostrarPerro;