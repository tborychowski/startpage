<?php
require('lib/_lib.php');

$req = new Request();

$req->respond(function ($method, $data) {
	if ($method == 'get') {
		$iconTree = getIcons('../img/icons');
		$themes = array();
		foreach ($iconTree as $name => $theme) {
			$themes[] = array('name' => $name, 'icons' => $theme);
		}
	}
	// print_r($themes);
	echo json_encode($themes);
});


function getIcons ($dir, $name = '') {
	if (!$name) $name = $dir;
	global $result;
	$tree = array_slice(scandir($dir), 2);
	foreach($tree as $item) {
		$path = $dir . '/' . $item;
		$ext = pathinfo($path, PATHINFO_EXTENSION);
		$itemName = $name . '/' . basename($path, '.'.$ext);

		if (is_dir($path)) getIcons($dir. '/' .$item, $item);
		else $result[$name][] = array('name' => $itemName, 'path' => ltrim($path, '\.\.\/'));
	}
	return $result;
}