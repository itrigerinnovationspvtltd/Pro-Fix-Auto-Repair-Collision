<?php
declare(strict_types=1);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    echo json_encode(["ok" => true]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Method not allowed"]);
    exit;
}

function clean_input(string $value): string
{
    return trim(str_replace(["\r", "\n"], " ", $value));
}

$name = clean_input($_POST["name"] ?? "");
$phone = clean_input($_POST["phone"] ?? "");
$emailRaw = clean_input($_POST["email"] ?? "");
$vehicle = clean_input($_POST["vehicle"] ?? "");
$message = clean_input($_POST["message"] ?? "");

if ($name === "" || $phone === "" || $message === "") {
    http_response_code(422);
    echo json_encode(["ok" => false, "message" => "Please complete required fields."]);
    exit;
}

$isValidEmail = (bool) filter_var($emailRaw, FILTER_VALIDATE_EMAIL);
$email = $isValidEmail ? $emailRaw : "Not provided";

// Replace this with your real destination email before going live.
$to = "info@profixautomotive.net";
$subject = "New Collision & Concierge Lead";
$body = "New website lead received:\n\n"
    . "Name: {$name}\n"
    . "Phone: {$phone}\n"
    . "Email: {$email}\n"
    . "Vehicle: {$vehicle}\n"
    . "Message: {$message}\n";

$headers = [
    "MIME-Version: 1.0",
    "Content-type: text/plain; charset=UTF-8",
    "From: noreply@profixautomotive.net",
    "X-Mailer: PHP/" . phpversion()
];

if ($isValidEmail) {
    $headers[] = "Reply-To: {$emailRaw}";
}

$mailSent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$mailSent) {
    http_response_code(500);
    echo json_encode(["ok" => false, "message" => "Unable to send at the moment."]);
    exit;
}

echo json_encode(["ok" => true, "message" => "Lead submitted successfully."]);
