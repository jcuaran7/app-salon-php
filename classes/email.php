<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Email {

    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion() {
        // Crear instancia de PHPMailer
        $mail = new PHPMailer(true);
        
        //crear el objeto de emeail
        $mail->isSMTP();
        $mail->Host =$_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = false; // MailHog no requiere autenticación
        $mail->Port = $_ENV['EMAIL_PORT'];// Puerto por defecto de MailHog
        $mail->SMTPSecure = false; // No es necesario SSL/TLS

           // Configurar remitente y destinatario
        $mail->setFrom('cuentas@appsalon.com', 'App Salon');
        $mail->addAddress('cuentas@appsalin.com');
        $mail->Subject = 'Confirma tu Cuenta';

        // set Html
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        

        $contenido = "<html>";  
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has creado tu cuenta en App Salon, 
        solo debes confirmarla presionando en el siguiente enlace</p>";
        $contenido .= "<p>Presiona aquí: <a href='" . $_ENV['APP_URL'] . "/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a></p>";
        $contenido .= "<p> Si tu no solicitaste esta cuenta, Puedes ignorar el mensaje </p>";
        $contenido .="</html>";


        $mail->Body = $contenido;
        $mail->AltBody = 'Hola desde MailHog en texto plano';

         // Enviar correo
         $mail->send();
  
    }

    public function enviarInstrucciones() {
        // Crear instancia de PHPMailer
        $mail = new PHPMailer(true);

        //crear el objeto de emeail
        $mail->isSMTP();
        $mail->Host =$_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = false; // MailHog no requiere autenticación
        $mail->Port = $_ENV['EMAIL_PORT'];// Puerto por defecto de MailHog
        $mail->SMTPSecure = false; // No es necesario SSL/TLS


            // Configurar remitente y destinatario
        $mail->setFrom('cuentas@appsalon.com', 'App Salon');
        $mail->addAddress('cuentas@appsalin.com');
        $mail->Subject = 'Restablece tu Password';

        // set Html
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        

        $contenido = "<html>";  
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has solicitado reestablecer tu password, 
        sigue el siguiente enlace para hacerlo.</p>";
        $contenido .= "<p>Presiona aquí: <a href='" . $_ENV['APP_URL'] . " /recuperar?token=" . $this->token . "'>Reestablecer Password</a></p>";
        $contenido .= "<p> Si tu no solicitaste esta cambio, Puedes ignorar el mensaje </p>";
        $contenido .="</html>";


        $mail->Body = $contenido;
        $mail->AltBody = 'Hola desde MailHog en texto plano';

        // Enviar correo
        $mail->send();
    }
}