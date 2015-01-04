<?php
Class DB {

	private $file_name;
	private $data;
	private $output;

	public function __construct ($fname = 'lists.json') {
		$this->file_name = $fname;
		$this->read_data();
		return $this->output;
	}

	function __toString () {
		return print_r($this->output, true);
	}


	/*** PUBLIC API *******************************************************************************/
	/**
	 * Set output to all items or a single item
	 */
	public function get ($id = null) {
		if (empty($this->data)) return $this;
		if (isset($id)) {
			foreach ($this->data as $item) {
				if ($item['id'] != $id) continue;
				$this->output = $item;
				break;
			}
		}
		else $this->output = json_decode(json_encode($this->data, JSON_NUMERIC_CHECK), true);
		return $this;
	}

	public function to_array () { return $this->output; }

	public function to_json ($pretty = false) { return $this->get_json($pretty); }

	/**
	 * Save all items to file
	 */
	public function save () {
		file_put_contents($this->file_name, $this->get()->get_json(true));
		return $this;
	}

	/**
	 * Update single item
	 */
	public function update_item ($newItem) {
		foreach ($this->data as &$item) {
			if ($item['id'] == $newItem['id']) {
				$item = $newItem;
				break;
			}
		}
		return $this;
	}

	public function update_ids () {
		foreach ($this->data as &$item) {
			$item['id'] = $this->generate_id($item);
		}
		return $this;
	}
	/*** PUBLIC API *******************************************************************************/




	/*** PRIVATE **********************************************************************************/
	private function read_data () {
		$this->data = json_decode(file_get_contents($this->file_name), true);
		return $this->get();								// set output to all
	}

	private function get_json ($pretty = false) {
		$flags = JSON_NUMERIC_CHECK;
		if ($pretty) $flags = $flags | JSON_PRETTY_PRINT;
		return json_encode($this->output, $flags);
	}

	public function update_favicons () {}

	/**
	 * Generate ID for an item: md5(name + url + time)
	 */
	private function generate_id ($item) {
		return md5($item['name'] . $item['url'] . time());
	}
	/*** PRIVATE **********************************************************************************/

}
