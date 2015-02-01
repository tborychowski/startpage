<?php

class JSON {

	public static function result ($result = 'success', $msg = '') {
		$res = array('result' => $result);
		if (!empty($msg)) $res['msg'] = $msg;
		return json_encode($res);
	}

	public static function error ($msg = '') {
		return self::result('error', $msg);
	}

	public static function success ($msg = '') {
		return self::result('success', $msg);
	}

}