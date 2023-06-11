import React, {useState} from "react";
import "./perrofoto.jpg"
export const Componente3 = () =>{
    let data = {nombre:"Bobby",
        raza:"Bulldog",
        descripcion:"Perro pequeño de año y medio, con una cicatriz en forma de rayo en el lomo, le gusta perseguir palomas y morder ramas",
        referencia:"Av. Grau 193 frente al estadio Chipoco",
        propietario:"Juan Rivas",
        contacto:947123854,
        foto:"/fotoperro.jpg"}

    return(<div>

            <table id="tabladatos">
                <h1 id="titulo">PERRO PERDIDO!</h1>
                <tbody>
                <tr>
            <td id="div1">
                <img id="fotoperro" src="/react-findpet/src/Componentes/perrofoto.jpg"/>
                <h2 id="hdatos">Descripción:</h2>
                <p id="pdatos">{data.descripcion}</p>
            </td>

            <td id="infoperro">
            <div id="div2">
                <h2 id="hdatos">Nombre:</h2>
                <p id="pdatos">{data.nombre}</p>
            </div>

            <div id="div2">
                <h2 id="hdatos">Raza:</h2>
                <p id="pdatos">{data.raza}</p>
            </div>

            <div id="div2">
                <h2 id="hdatos">Ultima vez visto:</h2>
                <p id="pdatos">{data.referencia}</p>
            </div>

            </td>
                </tr>
                </tbody>
            </table>

        </div>

    )}

export default Componente3;