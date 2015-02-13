<?php
Class Auth {
	private $email_file_name = '__auth_email.php';
	private $email_stored;

	public function __construct () {
		$this->get_stored_email();
	}


	/*** PUBLIC API *******************************************************************************/

	public function verify ($email = '') {
		return (!empty($email) && $this->email_stored === $email);
	}


	/*** PUBLIC API *******************************************************************************/




	/*** PRIVATE METHODS **************************************************************************/
	private function get_stored_email () {
		if (file_exists($this->email_file_name)) {
			$this->email_stored = trim(file_get_contents($this->email_file_name));
		}
	}

	/*** PRIVATE METHODS **************************************************************************/



}