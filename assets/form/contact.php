<?php
// ========================================
// CONFIGURATION
// ========================================

$destinataire = "tristan.coquet.ciel@gmail.com";
$sujet_prefix = "[Portfolio] ";

// ========================================
// HEADERS POUR RÉPONSE JSON
// ========================================

header('Content-Type: application/json; charset=UTF-8');

// ========================================
// VÉRIFICATION MÉTHODE POST
// ========================================

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Méthode non autorisée"
    ]);
    exit;
}

// ========================================
// RÉCUPÉRATION ET NETTOYAGE DES DONNÉES
// ========================================

$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
$subject = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// ========================================
// VALIDATION DES CHAMPS
// ========================================

$errors = [];

if (empty($name)) {
    $errors[] = "Le nom est requis";
}

if (empty($email)) {
    $errors[] = "L'email est requis";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "L'email n'est pas valide";
}

if (empty($subject)) {
    $errors[] = "Le sujet est requis";
}

if (empty($message)) {
    $errors[] = "Le message est requis";
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => implode(", ", $errors)
    ]);
    exit;
}

// ========================================
// CONSTRUCTION DE L'EMAIL
// ========================================

$sujet_email = $sujet_prefix . $subject;

$corps_email = "
═══════════════════════════════════════════
    NOUVEAU MESSAGE - PORTFOLIO
═══════════════════════════════════════════

📧 DE : $name
📬 EMAIL : $email
📋 SUJET : $subject

───────────────────────────────────────────
    MESSAGE
───────────────────────────────────────────

$message

───────────────────────────────────────────
Envoyé depuis le formulaire de contact du portfolio
Date : " . date('d/m/Y à H:i:s') . "
IP : " . $_SERVER['REMOTE_ADDR'] . "
═══════════════════════════════════════════
";

// ========================================
// HEADERS DE L'EMAIL
// ========================================

$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ========================================
// ENVOI DE L'EMAIL
// ========================================

$envoi = mail($destinataire, $sujet_email, $corps_email, $headers);

if ($envoi) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Message envoyé avec succès !"
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de l'envoi. Veuillez réessayer."
    ]);
}
?>
