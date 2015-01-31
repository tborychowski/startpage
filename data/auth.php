<?php
require('lib/_lib.php');

use \Request;
$req = new Request();

$req->respond(function ($method, $data) {
	if ($method == 'post') {					// verify token
		$res = (verify($data['login']) ? 'success' : 'error');
	}

	if ($method == 'get') {
		if (check_cookie()) $res = 'success';
		else {									// send token
			send_token();
			$res = 'verify';
		}
	}
	echo json_encode(array('result' => $res ));
});


function check_cookie () {
	if (file_exists('auth-token.dat')) $stored = file_get_contents('auth-token.dat');
	if (!isset($stored)) return false;

	if (isset($_COOKIE['startpage'])) $token = $_COOKIE['startpage'];
	if (!isset($token)) return false;

	return $token == $stored;
}

function send_token () {
	// $token = bin2hex(openssl_random_pseudo_bytes(32));
	$token = bin2hex(mcrypt_create_iv(32, MCRYPT_DEV_RANDOM));

	// $res = mail('tborychowski@gmail.com', 'startpage token', $token);
	// if (!$res) echo 'ooo, dupa!';

	file_put_contents('auth-token.dat', $token);
}

function verify ($token) {
	$stored = file_get_contents('auth-token.dat');
	$res = ($token == $stored);
	if ($res) setcookie('startpage', $token, time() + 86400 * 30, '/');
	return $res;
}