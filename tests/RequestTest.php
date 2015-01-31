<?php

require('data/lib/request.php');

class RequestTest extends PHPUnit_Framework_TestCase {

	public function testSanitize () {
		$_REQUEST = array(
			'val1' => 'val1',
			'<script>val2</script>' => '<script>val2</script>',
			'val3' => '"val3"',
			'>val4<' => '>val4<',
			'long' => str_repeat('a', 300)
		);
		$req = new Request();

		$req->respond(function ($method, $data) {
			$this->assertEquals($data['val1'], 'val1');
			$this->assertEquals($data['val2'], 'val2');
			$this->assertEquals($data['val3'], '&#34;val3&#34;');
			$this->assertEquals($data['>val4'], '>val4');
			$this->assertEquals(strlen($data['long']), 255);
		});
	}

	public function testSanitizeValidUrl () {
		$_REQUEST = array('url' => 'http://domain.com');
		$req = new Request();
		$req->respond(function ($method, $data) {
			$this->assertEquals($data['url'], 'http://domain.com');
		});
	}
	public function testSanitizeInvalidUrl () {
		$_REQUEST = array('url' => 'invalid url');
		$req = new Request();
		$req->respond(function ($method, $data) {
			$this->assertEquals($data['url'], 'invalidurl');
		});
	}


}