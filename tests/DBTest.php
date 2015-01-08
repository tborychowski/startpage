<?php

require('data/DB.php');

class DBTest extends PHPUnit_Framework_TestCase {

	protected $file;


	/*** SET UP ***********************************************************************************/
	public static function setUpBeforeClass () {}

	public static function tearDownAfterClass () {
		// remove temp file after tests
		unlink('tests/data_temp.json');
	}

	protected function setUp () {
		// create a temp file before each test
		file_put_contents('tests/data_temp.json', file_get_contents('tests/data.json'));
		$this->file = json_decode(file_get_contents('tests/data_temp.json'), true);
	}

	protected function tearDown () {}
	/*** SET UP ***********************************************************************************/



	/*** TESTS ************************************************************************************/

	public function testFileParsing () {
		$db = new DB('tests/data_temp.json');

		$items = $db->get()->to_array();
		$this->assertEquals('array', gettype($items));

		$items = $db->get()->to_json();
		$this->assertEquals('string', gettype($items));
		$this->assertEquals('array', gettype(json_decode($items)));

		$this->assertEquals(count($this->file), count(json_decode($items)));
	}

	public function testUpdatingItem () {
		$db = new DB('tests/data_temp.json');
		$items = $db->get()->to_array();

		$this->assertEquals($this->file[0]['name'], $items[0]['name']);

		$items[0]['name'] = 'test name';
		$this->assertEquals('test name', $items[0]['name']);

		$db->update_item($items[0])->save();

		$db = new DB('tests/data_temp.json');
		$items = $db->get()->to_array();
		$this->assertEquals('test name', $items[0]['name']);
	}

	public function testDel () {
		$db = new DB('tests/data_temp.json');
		$items = $db->get()->to_array();

        $res = $db->del($items[0])->save()->result()->to_array();;
        $this->assertEquals($res['result'], 'success');

        $items = $db->get()->to_array();
        $this->assertEquals(count($this->file), count($items) + 1);

        $this->assertNotEquals($this->file[0]['name'], $items[0]['name']);
    }




}