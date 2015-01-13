<?php
Class DB {

	private $file_name;
	private $data;
	private $output;
    private $last_id;
	private $result;

	public function __construct ($fname = 'lists.json') {
		$this->file_name = $fname;
		$this->read_data();
        $this->result = 'success';
		return $this->output;
	}

	function __toString () {
		return print_r($this->output, true);
	}


	/*** PUBLIC API *******************************************************************************/
	/**
	 * Set output to all items or a single item
	 */
	public function get ($item0 = null) {
		if (empty($this->data)) return $this;
		if (!empty($item0['id'])) $id = $item0['id'];
		elseif ($this->last_id && $item0 != null) $id = $this->last_id;

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

	public function result () {
		$this->output = array('result' => ($this->result !== false ? 'success' : 'error'));
		return $this;
	}


	public function reorder ($order) {
		// $this->data = array_replace(array_flip($order), $this->data);
		$newData = array();
		foreach ($order as $id) {
			$item = $this->get_item_by_id($id);
			if ($item) array_push($newData, $item);
		}
		$this->data = $newData;
		$this->result = true;
		return $this;
	}



	/**
	 * Save all items to file
	 */
	public function save () {
		$res = file_put_contents($this->file_name, $this->get()->get_json(true));
        $this->result = ($res !== false);
		return $this;
	}

	/**
	 * Delete item
	 */
	public function del ($itemToDel) {
		if (!isset($itemToDel['id'])) return $this;
		$id = $itemToDel['id'];
        $this->result = false;
		foreach ($this->data as $i => &$item) {
			if ($item['id'] == $id) {
                array_splice($this->data, $i, 1);
                $this->result = true;
				break;
			}
		}
		return $this;
	}

	/**
	 * Update single item
	 */
	public function update_item ($newItem) {
        $this->result = false;
        if (!isset($newItem['id'])) {
            $this->result = true;
            $newItem['id'] = $this->generate_id($newItem);
            $this->last_id = $newItem['id'];
            array_push($this->data, $newItem);
        }
        else {
			foreach ($this->data as &$item) {
				if ($item['id'] == $newItem['id']) {
					$item = $newItem;
                    $this->result = true;
					break;
				}
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
	private function get_item_by_id ($id) {
		foreach ($this->data as $item) {
			if ($item['id'] === $id) return $item;
		}
		return null;
	}

	private function read_data () {
		$this->data = json_decode(file_get_contents($this->file_name), true);
		return $this->get();								// set output to all
	}

	private function get_json ($pretty = false) {
		$flags = JSON_NUMERIC_CHECK;
		if ($pretty) $flags = $flags | JSON_PRETTY_PRINT;
		return json_encode($this->output, $flags);
	}

	/**
	 * Generate ID for an item: md5(name + url + time)
	 */
	private function generate_id ($item) {
		return md5($item['name'] . $item['url'] . time());
	}
	/*** PRIVATE **********************************************************************************/

}
