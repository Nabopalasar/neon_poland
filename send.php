<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: /neon_poland/index.html");
    exit;
}

$title = $_POST['service_title'] ?? '';
$name  = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$msg   = $_POST['message'] ?? '';

if (!$name || !$phone || !$email || !$msg) {
    echo "Ошибка: заполните все поля!";
    exit;
}

$to = "izimedia.reklama@gmail.com"; // твоя почта
$subject = "Новая заявка: $title";

$body = "
Услуга: $title
Имя: $name
Телефон: $phone
Email: $email
Сообщение:
$msg
";

$headers = "From: info@neonizi.pl\r\n"; // почта с твоего домена
$headers .= "Content-type: text/plain; charset=utf-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    // Письмо отправлено, редирект на страницу благодарности
    header("Location: /thanks.html");
    exit;
} else {
    echo "Ошибка отправки письма!";
}