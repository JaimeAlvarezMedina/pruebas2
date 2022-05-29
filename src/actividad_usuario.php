<?php
    include('cabecera.php');
    include('conexion.php');

    $creador=$_POST["creador"];

        $consulta= $conexion->prepare("SELECT * FROM `articulos` where Creador='tt'");
        $consulta->execute();
        echo json_encode($consulta->fetchAll());
    
?>