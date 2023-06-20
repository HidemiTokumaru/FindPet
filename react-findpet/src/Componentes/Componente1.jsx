import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Componente1 = () => {
  const { userId } = useParams();
  const [perros, setPerros] = useState([]);
  const [editarPostId, setEditarPostId] = useState(null);
  const [editarNombre, setEditarNombre] = useState("");
  const [editarDescripcion, setEditarDescripcion] = useState("");
  const [editarRaza, setEditarRaza] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [nuevaRaza, setNuevaRaza] = useState("");

  useEffect(() => {
    obtenerPerrosPerdidos();
  }, [userId]);

  const obtenerPerrosPerdidos = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/posts?userId=${userId}`);
      const data = await response.json();
      setPerros(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditarPost = (postId, nombre, descripcion, raza) => {
    setEditarPostId(postId);
    setEditarNombre(nombre);
    setEditarDescripcion(descripcion);
    setEditarRaza(raza);
  };

  const handleActualizarPost = (postId) => {
    const post = {
      PetName: editarNombre,
      PetDescription: editarDescripcion,
      PetBreed: editarRaza
    };
    
    fetch(`http://127.0.0.1:5000/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(response => {
        if (response.ok) {
          obtenerPerrosPerdidos();
          setEditarPostId(null);
          setEditarNombre("");
          setEditarDescripcion("");
          setEditarRaza("");
          alert("Post actualizado exitosamente");
        } else {
          alert("Error en la solicitud");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };



  const handleEliminarPost = async (postId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/posts/${postId}`, {
        method: "DELETE"
      });
  
      if (response.ok) {
        // Eliminación exitosa, realizar alguna acción adicional si es necesario
        alert("Post eliminado exitosamente");
        // Actualizar la lista de perros después de eliminar el post
        const perrosActualizados = perros.filter((perro) => perro.id !== postId);
        setPerros(perrosActualizados);
      } else {
        throw new Error("Error al eliminar el post");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleAgregarPost = async () => {
    const nuevoPost = {
      PetName: nuevoNombre,
      PetDescription: nuevaDescripcion,
      PetBreed: nuevaRaza
    };
    if (nuevoNombre === "" || nuevaDescripcion === "" || nuevaRaza === "") {
      alert("Por favor, complete todos los campos.")
    }else{
    try {
      const response = await fetch(`http://127.0.0.1:5000/posts?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoPost)
      });
  
      if (response.ok) {
        // Registro exitoso, realizar alguna acción adicional si es necesario
        console.log("Post agregado exitosamente");
        // Actualizar la lista de perros después de agregar el nuevo post
        obtenerPerrosPerdidos();
        // Limpiar los campos del nuevo post
        setNuevoNombre("");
        setNuevaDescripcion("");
        setNuevaRaza("");
      } else {
        throw new Error("Error al agregar el post");
      }
    } catch (error) {
      console.log(error);
    }
    }
  };


  return (
    <div>
      <table id="perro">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Raza</th>
            <th>Última vez visto</th>
            <th>Contacto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {perros.map((perro) => (
            <tr key={perro.id}>
              <td>{perro.PetPhoto}</td>
              <td>
                {editarPostId === perro.id ? (
                  <input
                    type="text"
                    value={editarNombre}
                    onChange={(e) => setEditarNombre(e.target.value)}
                  />
                ) : (
                  perro.PetName
                )}
              </td>
              <td>
                {editarPostId === perro.id ? (
                  <input
                    type="text"
                    value={editarDescripcion}
                    onChange={(e) => setEditarDescripcion(e.target.value)}
                  />
                ) : (
                  perro.PetDescription
                )}
              </td>
              <td>
                {editarPostId === perro.id ? (
                  <input
                    type="text"
                    value={editarRaza}
                    onChange={(e) => setEditarRaza(e.target.value)}
                  />
                ) : (
                  perro.PetBreed
                )}
              </td>
              <td>{perro.PetLastSeen}</td>
              <td>{perro.PetContact}</td>
              <td>
                {editarPostId === perro.id ? (
                  <button onClick={() => handleActualizarPost(perro.id)}>Guardar</button>
                ) : (
                  <>
                    <button onClick={() => handleEditarPost(perro.id, perro.PetName, perro.PetDescription, perro.PetBreed)}>
                      Editar
                    </button>
                    <button onClick={() => handleEliminarPost(perro.id)}>
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
  
      <h2>Agregar nuevo post:</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nuevoNombre}
        onChange={(e) => setNuevoNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={nuevaDescripcion}
        onChange={(e) => setNuevaDescripcion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Raza"
        value={nuevaRaza}
        onChange={(e) => setNuevaRaza(e.target.value)}
      />
      <button onClick={handleAgregarPost}>Agregar</button>
    </div>
  );
}
export default Componente1;










