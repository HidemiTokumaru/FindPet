import React, {useState} from "react";
import "./perrofoto.jpg"

export const Componente1 = () =>{
    let data = {
        nombre:"Bobby",
        raza:"Bulldog",
        descripcion:"Perro pequeño, con una cicatriz en el lomo, le gusta perseguir palomas",
        propietario:"Juan Rivas",
        contacto:947123854,
        foto: "/Componente/perrofoto.jpg"
    }



    return(
        //Hacer una intereativa para mostrar todos los perros perdidos de la tabla
<div>
    <table id="perro">
        <tr>
            <th>Foto</th>
            <th>Descripción</th>
            <th>Nombre</th>
            <th>Raza</th>
            <th>Num contacto</th>
            <th>Dueño</th>

        </tr>
        <tr>
            <td><img src="/react-findpet/src/Componentes/perrofoto.jpg"/></td>
            <td>{data.descripcion}</td>
            <td>{data.nombre}</td>
            <td>{data.raza}</td>
            <td>{data.contacto}</td>
            <td>{data.propietario}</td>

        </tr>
    </table>
    <br/>
</div>
    )

}


export default Componente1;