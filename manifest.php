<?php
header('Content-Type: text/cache-manifest');

$hashes = '';
$files = array();
$patterns = array(
	'assets/*.*',
	'data/*.json',
	'fonts/*.*',
	'img/*.*',
	'img/icons/*/*.*',
	'index.html'
);

foreach ($patterns as $p) { $files = array_merge($files, glob($p)); }
foreach ($files as $i => $f) {
	$hashes .= md5_file($f);
	$files[$i] = './' . $f;
}

echo "CACHE MANIFEST\n";
echo "#hash: ".md5($hashes)."\n";
echo implode("\n", $files);
echo "\nhttp://fonts.googleapis.com/css?family=Open+Sans:700,300,600,400";
echo "\nNETWORK:\n*\n\n";
