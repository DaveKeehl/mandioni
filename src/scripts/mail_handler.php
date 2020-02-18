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

	function processString($string, $mode) {
		$bad_strings = array(
			"content-type:",
			"mime-version:",
			"multipart/mixed",
			"Content-Transfer-Encoding",
			"bcc:",
			"to:",
			"cc:",
			"href",
			"from:");
		if (strcmp($mode,"check") == 0) {
			foreach ($bad_strings as $bad_string) {
				if (strcmp($string,$bad_string) == 0) {
					return false;
				}
			}
			return true;
		} elseif (strcmp($mode,"clean") == 0) {
			return str_replace($bad_strings,"",$string);
		} else {
			echo "Unknown mode";
		}
	}

	if (isset($_POST['submit']) && $_SERVER['REQUEST_METHOD'] == 'POST') {

		if (
			!isset($_POST['name']) || 
			!isset($_POST['surname']) || 
			!isset($_POST['subject']) || 
			!isset($_POST['email']) || 
			!isset($_POST['message'])
		) {
			die();
		}

		// RETRIEVE DATA FROM HTML FORM
		$name = $_POST['name'];
		$surname = $_POST['surname'];
		$from = $_POST['email'];
		$subject = $_POST['subject'];
		$message = $_POST['message'];

		$gotcha = $_POST['gotcha'];
		if (!empty($gotcha)) {
			die();
		}

		// CHECK FOR INVALID VALUES
		$error_message = "";
		$string_regex = "/^[A-Za-z0-9 .'-]+$/";
		$email_regex = "/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/";

		if (!preg_match($string_regex,$name) ||	!processString($name,"check")) {
			$error_message .= 'Il nome che hai scritto non è valido.<br/>';
		}
		if (!preg_match($string_regex,$surname) || !processString($surname,"check")) {
			$error_message .= 'Il cognome che hai scritto non è valido.<br/>';
		}  
		if (!preg_match($email_regex,$from) || isInjected($from) || !processString($from,"check")) {
			$error_message .= 'L\'email che hai scritto non è valida.<br/>';
		}
		if (!preg_match($string_regex,$subject) || !processString($subject,"check")) {
			$error_message .= 'Il soggetto che hai scritto non è valido.<br/>';
		}
		if (!preg_match($string_regex,$message) || !processString($message,"check")) {
			$error_message .= 'Il messaggio che hai scritto non è valido.<br/>';
		}
		if (strlen($error_message) > 0) {
			die($error_message);
		}

		// CLEANUP FIELDS
		$name = processString($name,"clean");
		$surname = processString($surname,"clean");
		$from = filter_var($from, FILTER_SANITIZE_EMAIL);
		$from = filter_var($from, FILTER_VALIDATE_EMAIL);
		$from = processString($from,"clean");
		$subject = processString($subject,"clean");
		$message = processString($message,"clean");
		$message = wordwrap($message, 70, "\r\n");

		// COMPOSE EMAIL
		$to = "info@mandioni-costruzioni.ch";
		$email_subject = "Mandioni Costruzioni - Nuovo Messaggio : " . $subject;
		$email_body = "Hai appena ricevuto un messaggio da $name $surname:\r\n $message";
		$headers = 'From: '.$from."\r\n".
		'Reply-To: '.$from."\r\n" .
		'X-Mailer: PHP/' . phpversion();

		// SEND EMAIL
		if (mail($to, $email_subject, $email_body, $headers)) {
			echo "Email inviata. Verrà contattato/a a breve.";
		} else {
			echo "Errore nell'invio dell'email.";
		}

		header( "refresh:2;url=./../../contatti.html" );

	} else {
		echo "Qualcosa è andato storto.";
		die();
	}

?>