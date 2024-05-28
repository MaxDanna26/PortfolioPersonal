<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "tucorreo@example.com";
    $subject = "Nuevo mensaje de tu portafolio";
    $body = "Nombre: $name\nCorreo electrónico: $email\n\nMensaje:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Mensaje enviado con éxito.";
    } else {
        echo "Hubo un error al enviar tu mensaje. Inténtalo nuevamente.";
    }
}
?>
