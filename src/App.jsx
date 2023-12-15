import {obtenerTareas} from "./logic/crud"
import TaskCard from "./components/TaskCard";
import CreateTask from "./components/CreateTask";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    obtenerTareas(setTask)
  }, []);

  return (
    <>
      <h1>To Do</h1>
      
      <CreateTask setTask={setTask}/>

      {tasks.map((task, key) => (
        <TaskCard
          key={key}
          id={task.id}
          description={task.descripcion}
          status={task.estado}
          date={task.fecha_finalizacion}
          setTask={setTask}
        />
      ))}
    </>
  );
}

export default App;
