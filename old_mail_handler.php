<?php

	ini_set('display_errors', 1);
	error_reporting(E_ALL);

	function isInjected($str) {
		$injections = array('(\n+)', '(\r+)', '(\t+)', '(%0A+)', '(%0D+)', '(%08+)', '(%09+)');

		$inject = join('|', $injections);
		$inject = "/$inject/i";
		
		if (preg_match($inject,$str)) {
			return true;
		} else {
			return false;
		}
	}

	// function checkString($string) {
	// 	$bad_strings = array(
	// 		'content-type:', 
	// 		'mime-version:', 
	// 		'multipart/mixed', 
	// 		'Content-Transfer-Encoding:', 
	// 		'bcc:', 
	// 		'cc:', 
	// 		'to:',
	// 		'from:',
	// 	);
	// 	foreach($bad_strings as $bad_string) {
	// 		if (preg_match($bad_string, strtolower($string))) {
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// }

	if (isset($_POST['submit']) && $_SERVER['REQUEST_METHOD'] == 'POST') {

		// RETRIEVE DATA FROM HTML FORM
		$name = $_POST['name'];
		$surname = $_POST['surname'];
		$subject = $_POST['subject'];
		$message = wordwrap($_POST['message'], 70, "\r\n");
		$from = $_POST['email'];

		$from = filter_var($from, FILTER_SANITIZE_EMAIL);
		$from = filter_var($from, FILTER_VALIDATE_EMAIL);

		if (isInjected($from) || !$from) {
			echo "Email non valida.";
			exit;
		}

		// if (!checkString($name) || !checkString($surname) || !checkString($subject) || !checkString($message)) {
		// 	echo "Contenuto dell'email non valido.";
		// 	exit;
		// }

		// COMPOSE EMAIL
		$to = 'davekeehl@gmail.com';
		$email_subject = "Mandioni Costruzioni: Nuovo Messaggio";
		$email_body = "Hai appena ricevuto un messaggio da $name $surname:\r\n $message";
		$headers = "From: davide.ciulla@ticino.com\r\n";
		$headers .= "Reply-To: davide.ciulla@ticino.com\r\n";

		// mail($to, $email_subject, $email_body, $headers);

		// SEND EMAIL
		if (mail('ciulld@usi.ch', 'test', 'messaggio di test')) {
			echo "Email inviata. Verrà contattato/a a breve.";
		} else {
			echo "Errore nell'invio dell'email.";
		}

	} else {
		echo "Qualcosa è andato storto.";
		exit;
	}

?>