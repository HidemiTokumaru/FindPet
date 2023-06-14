import React, {useState} from "react";
import Componente1 from "./Componentes/Componente1";

export const MostrarPerro = () =>{
    
    return(
        //Hacer una intereativa para mostrar todos los perros perdidos de la tabla
        <div>
            <ul id="barraLateral">
                <li id="parteBarra"><b id="letrasBarra">My Posts</b></li>
                <li id="parteBarra"><b id="letrasBarra">Posts</b></li>
                </ul>

                <br/>

                <Componente1/>
                <Componente1/>
                <Componente1/>
                <Componente1/>
                </div>
                )
            }

export default MostrarPerro;

