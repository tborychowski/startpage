<?php
Class Request {

	public $method;

	private $requestData;
	private $response;


	public function __construct () {
		$this->method = strtolower($_SERVER['REQUEST_METHOD']);
		$data = file_get_contents('php://input');

		if (!empty($data)) $this->requestData = json_decode($data, true);
		elseif (!empty($_REQUEST)) $this->requestData = $_REQUEST;
	}


	function __toString () {
		return print_r($this->response, true);
	}


	/*** PUBLIC API *******************************************************************************/
	public function respond ($cb) {
		if (is_callable($cb)) {
			$this->response = $cb($this->method, $this->requestData);
		}
	}
	/*** PUBLIC API *******************************************************************************/


}
