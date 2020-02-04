<?php
	$to      = 'davekeehl@gmail.com';
	$subject = 'the subject';
	$message = 'hello';
	$headers = 'From: dave.jacksonguitars95@gmail.com' . "\r\n" .
    'Reply-To: dave.jacksonguitars95@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

	 if (mail($to, $subject, $message, $headers)) {
		 echo "Success";
	 } else {
		 echo "Ouch";
	 }

?>