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

	function checkString($string) {
		$bad_strings = array(
			'content-type:', 
			'mime-version:', 
			'multipart/mixed', 
			'Content-Transfer-Encoding:', 
			'bcc:', 
			'cc:', 
			'to:',
			'from:',
		);
		foreach($bad_strings as $bad_string) {
			if (preg_match($bad_string, strtolower($string))) {
				return false;
			}
		}
		return true;
	}

	if (isset($_POST['submit']) && $_SERVER['REQUEST_METHOD'] == 'POST') {

		// RETRIEVE DATA FROM HTML FORM
		$name = $_POST['name'];
		$surname = $_POST['surname'];
		$subject = $_POST['subject'];
		$message = $_POST['message'];
		$from = $_POST['email'];

		$from = filter_var($from, FILTER_SANITIZE_EMAIL);
		$from = filter_var($from, FILTER_VALIDATE_EMAIL);

		if (isInjected($from) || !$from) {
			echo "Email non valida.";
			exit;
		}

		if (!checkString($name) || !checkString($surname) || !checkString($subject) || !checkString($message)) {
			echo "Contenuto dell'email non valido.";
			exit;
		}

		// COMPOSE EMAIL
		$to = 'davide.ciulla@ticino.com';
		$email_subject = "Mandioni Costruzioni: Nuovo Messaggio";
		$email_body = "Hai appena ricevuto un messaggio da $name:\n $message";
		$headers = "From: $from \r\n";
		$headers .= "Reply-To: $from \r\n";

		// SEND EMAIL
		mail($to, $email_subject, $email_body, $headers);

		// SUBMISSION MESSAGE
		echo "Email inviata. Verrà contattato/a a breve.";

	} else {
		echo "Qualcosa è andato storto.";
		exit;
	}

?>