<?php
Class DB {

	private $file_name;
	private $data;

	public function __construct($fname = 'lists.json') {
		$this->file_name = $fname;
		$this->read_data();
		return $this->data;
	}

	function __toString () {
		return print_r($this->data, true);
	}


	/*** PUBLIC API ***************************************************************************************************/
	public function to_array () { return $this->data; }

	public function to_json () { return json_encode($this->data, JSON_NUMERIC_CHECK); }

	public function update_favicons () {

	}
	/*** PUBLIC API ***************************************************************************************************/




	/*** PRIVATE ******************************************************************************************************/
	private function read_data() {
		$this->data = json_decode(file_get_contents($this->file_name), true);
		return $this;
	}

	private function save_data() {
		file_put_contents($this->file_name, json_encode($this->data));
		return $this;
	}
	/*** PRIVATE ******************************************************************************************************/

}
