<?php
Class Request {

	public $method;

	private $requestData;
	private $response;


	public function __construct () {
		if (isset($_SERVER['REQUEST_METHOD'])) {
			$method = $_SERVER['REQUEST_METHOD'];
			header('content-type: application/json; charset=utf8');
		}
		else $method = 'GET';

		$this->method = strtolower($method);
		$data = file_get_contents('php://input');

		if (!empty($data)) $this->requestData = json_decode($data, true);
		elseif (!empty($_REQUEST)) $this->requestData = $_REQUEST;

		$this->requestData = $this->sanitizeData($this->requestData);
	}


	function __toString () {
		return print_r($this->response, true);
	}

	private function sanitize ($val, $type = '') {
		$val = substr($val, 0, 255);
		if ($type === 'url') $val = filter_var($val, FILTER_SANITIZE_URL);
		else $val = filter_var($val, FILTER_SANITIZE_STRING);
		return $val;
	}

	/*** PUBLIC API *******************************************************************************/
	public function sanitizeData ($data) {
		$newData = array();
		if (empty($data)) return $newData;
		foreach ($data as $key => $value) {
			$key = $this->sanitize($key);
			$newData[$key] = $this->sanitize($value, $key);
		}
		return $newData;
	}

	public function respond ($cb) {
		if (is_callable($cb)) {
			$this->response = $cb($this->method, $this->requestData);
		}
	}
	/*** PUBLIC API *******************************************************************************/


}
