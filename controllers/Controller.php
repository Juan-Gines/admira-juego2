<?php

header('Content-Type:application/json; charset=utf-8');

require_once '../config/Conexion.php';
require_once '../controllers/PuntuacionController.php';
require_once '../library/ValidarInputs.php';

$puntuacion = new PuntuacionController($conexion);
$validar = new ValidarInputs();

if ($_SERVER['REQUEST_METHOD'] == "GET") {

    if (!$resultado = $puntuacion->record()) {
        $resultado = ['error' => 'no hay records'];
    }
} elseif ($_SERVER['REQUEST_METHOD'] == "POST") {

    if (isset($_POST['marcador'])) {
        $marcador = $_POST['marcador'];
        $resultado = $puntuacion->grabarRecord($marcador);
    } else {
        $resultado = ['error' => $_POST];
    }
}
echo json_encode($resultado);
