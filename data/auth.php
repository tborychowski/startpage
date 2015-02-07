<?php
require('lib/_lib.php');

use \Request;
use \Auth;
use \JSON;

$req = new Request();

$req->respond(function ($method, $data) {
	$auth = new Auth();
	$res = 'success';
	$msg = '';

	if ($method == 'post') {
		$res = $auth->verify($data['login']);
		if ($res === true) $res = 'success';
		else $res = 'error';
	}

	elseif ($method == 'get') {
		if ($auth->is_authenticated()) $res = 'success';
		elseif ($auth->is_token_sent()) {
			$res = 'success';
			$msg = 'verify';
		}
		else {
			$authres = $auth->new_token();						// send new token
			if ($authres == true) {
				$res = 'success';
				$msg = 'verify';
			}
			else {
				$res = 'error';
				$msg = 'Ooo, dupa!';
			}
		}
	}
	elseif ($method == 'delete') {
		unset($_SESSION['token_sent']);
		$auth->logout();
	}

	echo JSON::result($res, $msg);
});
