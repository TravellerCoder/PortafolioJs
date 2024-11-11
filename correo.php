<?php

$nombre = $_POST['Nombre'];
$telefono = $_POST['Telefono'];
$email = $_POST['Email'];
$asunto = $_POST['Asunto'];
$mensaje = $_POST['Mensaje'];   

$formcontent="
    Datos de Contacto: \n
    Nombre: $nombre \n
    Telefono: $telefono \n
    Email: $email \n
    Asunto: $asunto\n
    Mensaje: $mensaje\n
";

$recipient = "guillermobukowski@gmail.com";

$subject = "Nuevo mensaje de contacto de Traveller coder";

$header = "From: $email \r\n";
$header .= "Content-Type: text/plain; charset=UTF-8";
mail($recipient, $subject, $formcontent, $header) or die("Error!");
header("Location: index.html");

?>