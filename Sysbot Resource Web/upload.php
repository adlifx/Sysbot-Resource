<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $resume = $_FILES['resume'];

    $to = "hr@yourdomain.com"; // HR email
    $subject = "New Resume Submission";
    $message = "Name: $name\nEmail: $email\nPhone: $phone";

    $headers = "From: $email";

    // Add file as an attachment
    $file_path = $resume['tmp_name'];
    $file_name = $resume['name'];

    // Use a library like PHPMailer to add file attachments
    // Alternatively, include raw MIME data for attachments here.

    if (mail($to, $subject, $message, $headers)) {
        echo "Submission successful!";
    } else {
        echo "Error submitting the form.";
    }
}
?>
