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
		$res = ($auth->verify($data['login']) ? 'success' : 'error');	// verify token
	}

	elseif ($method == 'get') {
		if ($auth->is_authenticated()) $res = 'success';
		else {
			$authres = $auth->new_token();								// send new token
			$res = ($authres == true ? 'success' : 'error');
			$msg = ($authres == true ? 'verify' : 'Ooo, dupa!');
		}
	}
	elseif ($method == 'delete') {
		$auth->logout();
	}

	echo JSON::result($res, $msg);
});
