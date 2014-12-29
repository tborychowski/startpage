<!DOCTYPE html>
<html lang="en" xmlns:ng="http://angularjs.org" ng-app="app">
<head>
	<meta charset="UTF-8">
	<title>Start</title>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
	<link rel="stylesheet" href="assets/lib.css">
	<link rel="stylesheet" href="assets/app.css">
</head>
<body ng-controller="appCtrl">

<menu-toggler toggle-class="sidebar-expanded"></menu-toggler>
<main></main>
<sidebar></sidebar>
<tile-settings></tile-settings>

<script src="assets/lib.js"></script>
<script src="assets/app.js"></script>
<script src="http://localhost:35729/livereload.js"></script>

</body>
</html>
