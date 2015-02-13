<?php
require('lib/_lib.php');

$req = new Request();

$req->respond(function ($method, $data) {
	$auth = new Auth();
	$res = 'error';
	$msg = '';

	if ($method == 'post') {
		if ($auth->verify($data['email'])) $res = 'success';
	}

	// elseif ($method == 'get') {}

	echo JSON::result($res, $msg);
});
