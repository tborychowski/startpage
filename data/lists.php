<?php
header('content-type: application/json; charset=utf8');

require('DB.php'); // require('Icons.php');


$db = new DB('lists.json');
$item = file_get_contents('php://input');
if (!empty($item)) $item = json_decode($item, true);

if (empty($item)) $res = $db;
else $res = $db->update_item($item)->save()->get($item['id']);

echo $res->to_json();



// $item = $db->to_array()[0][0];
// print_r(Icons::getIconForUrl($item));
//TODO: update appcache manifest when data (|| icons) changed