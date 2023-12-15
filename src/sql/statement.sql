CREATE DATABASE todo
    DEFAULT CHARACTER SET = 'utf8mb4';

USE todo;

CREATE TABLE tareas (
    id INT AUTO_INCREMENT,
    descripcion VARCHAR(300) NOT NULL,
    estado BOOLEAN DEFAULT 0,
    fecha_finalizacion DATE
);