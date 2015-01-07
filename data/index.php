<?php
header('content-type: application/json; charset=utf8');

 // require('Icons.php');
require('DB.php');
require('Request.php');


$db = new DB('data.json');
$req = new Request();

$req->respond(function ($method, $data) use($db) {
	if ($method === 'delete') {
		$res = $db->del($data)->save()->result();
	}
	elseif ($method === 'post') {
		if (empty($data)) $res = $db->get();
		else $res = $db->update_item($data)->save()->get($data);
	}
	else $res = $db->get();

	echo $res->to_json();
});



// print_r(Icons::getIconForUrl($item));
//TODO: update appcache manifest when data (|| icons) changed