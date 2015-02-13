<?php
require('lib/_lib.php');

$req = new Request();

$req->respond(function ($method, $data) {
	$db = new DB('data.json');

	if ($method === 'delete') {
		$res = $db->del($data)->save()->result();					// delete item
	}

	elseif ($method === 'post') {
		if (!empty($data['name'])) {
			$res = $db->update_item($data)->save()->get($data);		// add/update item
		}

		else {
			$res = $db->reorder($data)->save()->get()->result();	// reorder items
		}
	}

	else $res = $db->get();											// get all items

	echo $res->to_json(true);
});
