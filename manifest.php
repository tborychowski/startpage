<?php
header('Content-Type: text/cache-manifest');

$hashes = '';
$file_list = '';
$dir = new RecursiveDirectoryIterator('.');

function is_excluded ($file) {
	$excludes = ['.git', 'node_modules', 'src', 'data\lib', '__auth', 'test', '.json' ];
	$br = false;
	foreach ($excludes as $ex) if (stripos($file, $ex) !== false) { $br = true; break; }
	return $br;
}

// Iterate through all the files/folders in the current directory
foreach (new RecursiveIteratorIterator($dir) as $file) {
	$info = pathinfo($file);
	if (is_excluded($file)) continue;
	if ($file -> IsFile() && $file != './manifest.php' && substr($file->getFilename(), 0, 1) != '.') {
		$file = str_replace(' ', '%20', $file);	// Replace spaces with %20 or it will break
		$file = str_replace('\\', '/', $file);
		// $file = str_replace('./', '', $file);
		$file_list .= $file . "\n";
		$hashes .= md5_file($file);								// Add this file's hash to the $hashes string
	}
}




echo "CACHE MANIFEST\n";					// Write the first line
echo "#hash: " . md5($hashes) . "\n";		// Write the $hashes string
echo $file_list;
echo 'http://fonts.googleapis.com/css?family=Open+Sans:700,300,600,400';

echo "\nNETWORK:\n*\n\n";
