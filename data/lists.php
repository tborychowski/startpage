<?php
// sleep(2);
header('content-type: application/json; charset=utf8');

require('DB.php');
require('Icons.php');

$db = new DB('lists.json');

// $item = $db->to_array()[0][0];
// print_r(Icons::getIconForUrl($item));

echo $db->to_json();


//TODO: update appcache manifest when data (|| icons) changed