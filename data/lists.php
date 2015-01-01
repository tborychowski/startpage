<?php
// sleep(1);
header('content-type: application/json; charset=utf8');
// $db = json_decode(file_get_contents('lists.json'), true);
// echo json_encode($db, JSON_NUMERIC_CHECK);

echo file_get_contents('lists.json');
