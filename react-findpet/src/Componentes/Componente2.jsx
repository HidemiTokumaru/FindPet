import React, {useState, useEffect} from "react";

const Componente2 = () => {
  const [perros, setPerros] = useState([]);

  useEffect(() => {
    const obtenerPerrosPerdidos = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/posts");
        const data = await response.json();
        setPerros(data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerPerrosPerdidos();
  }, []);

  return (
    <div>
      <table id="perro">
        <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Raza</th>
          <th>Ultima vez visto</th>
          <th>Contacto</th>
        </tr>
        </thead>
        <tbody>
        {perros.map((perro) => (
          <tr key={perro.id}>
            <td>{perro.PetPhoto}</td>
            <td>{perro.PetName}</td>
            <td>{perro.PetDescription}</td>
            <td>{perro.PetBreed}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default Componente2;