import { crearTarea } from "../logic/crud";
import { useState } from "react";

/* eslint-disable react/prop-types */
export default function CreateTask({setTask}) {
  const [inputs, setInputs] = useState([]);

  // Funcion para guardar en el estado inputs los valores del textarea y del input type="date"
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //Funcion para crear la tarea
  const handleSubmit = (event) => {
    event.preventDefault();

    crearTarea(inputs, setTask);
  };
  
  return (
    <form className="task-insert">
      <textarea
        onChange={handleChange}
        type="text"
        name="descripcion"
        id="descripcion"
        placeholder="Escribe aquí..."
        maxLength={30}
        required
      />
      <input
        onChange={handleChange}
        type="date"
        name="fecha_finalizacion"
        id="fecha_finalizacion"
      />
      <button type="submit" onClick={handleSubmit}>
        Agregar
      </button>
    </form>
  );
}
