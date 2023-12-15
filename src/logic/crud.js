import axios from "axios";

/*
CONSUMO DE LA API CREADA EN PHP
EN LA CARPETA API ESTAN LOS ARCHIVOS PHP QUE CREAN LA API
*/

// GET
export function obtenerTareas(setTask) {
  axios.get("http://localhost:80/api/tareas/").then(function (response) {
    try{

        setTask(response.data);
    }
    catch(e){
        console.log(typeof setTask);
    }
  });
}

// DELETE
export const eliminarTarea = (id, setTask) => {
  axios
    .delete(`http://localhost:80/api/tareas/${id}/`)
    .then(function (response) {
      console.log(response.data);
      obtenerTareas(setTask);
    });
};

// PUT/UPDATE
export const actualizarTarea = (id, status, setTask) => {
  axios
    .put(`http://localhost:80/api/tareas/`, { id: id, estado: status })
    .then(function (response) {
      console.log(response.data);
      obtenerTareas(setTask);
    });
};

// POST/CREATE
export const crearTarea = (inputs, setTask) => {
  axios
    .post("http://localhost:80/api/tareas/", inputs)
    .then(function (response) {
      console.log(response.data);
      obtenerTareas(setTask);
    });
};
