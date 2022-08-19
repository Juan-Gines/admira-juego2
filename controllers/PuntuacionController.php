<?php

class PuntuacionController
{
    private $conexion;

    public function __construct(\PDO $pdo)
    {
        $this->conexion = $pdo;
    }

    public function record()
    {
        $query = "SELECT max(puntuacion) as puntuacion FROM puntuaciones";
        $stmt = $this->conexion->prepare($query);
        if ($stmt->execute() && $stmt->rowCount() == 1) {
            return $stmt->fetch();
        } else {
            return false;
        }
    }

    public function grabarRecord($puntuacion)
    {
        $query = "INSERT INTO puntuaciones (puntuacion) VALUES
    (:puntuacion)";
        $stmt = $this->conexion->prepare($query);
        $stmt->execute(['puntuacion' => $puntuacion]);

        if ($stmt->rowCount() == 1) {
            $id = $this->conexion->lastInsertId();
            $query = "SELECT * FROM puntuaciones WHERE id=:id";
            $stmt = $this->conexion->prepare($query);
            $stmt->execute(['id' => $id]);
            return  $stmt->fetch();
        } else {
            return false;
        }
    }
}
