<?php

# Solucion para el problema del CORS
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

# importamos e instanciamos la clase para crear una conexion con la base de datos
include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM tareas";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
        break;

    case "POST":
        $tarea = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO tareas(descripcion, fecha_finalizacion) VALUES(:descripcion, :fecha_finalizacion)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':descripcion', $tarea->descripcion);
        $stmt->bindParam(':fecha_finalizacion', $tarea->fecha_finalizacion);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $tarea = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE tareas SET estado= :estado WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $tarea->id);
        $stmt->bindParam(':estado', $tarea->estado);
        ;

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM tareas WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}