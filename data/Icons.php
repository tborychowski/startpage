<?php
Class Icons {


	//http://www.google.com/s2/favicons?domain=nettuts.com
	//https://plus.google.com/_/favicon?domain=http://feeds.feedburner.com/CssTricks
	public static function getIconForUrl ($item) {
		$iconUrl = 'https://plus.google.com/_/favicon?domain=' . $item['url'];
		$file = '../img/' . $item['name'] . '.png';
		$tooOld = isset($item['icon']) && ($item['icon'] + 604800 < time());
		$noImg = !file_exists($file);

		if (empty($item['icon']) || $tooOld || $noImg) {  // if no icon or icon older than a week - fetch new one
			copy($iconUrl, $file);
			$item['icon'] = time();
		}
		return $item;
	}



}
