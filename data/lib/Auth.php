<?php
Class Auth {
	private $cookie_name = 'startpage';
	private $cookie_life = 2592000;	// 86400 * 30
	private $token_length = 32;
	private $token_file_name = '__auth_token.php';

	private $email_stored = '';
	private $token_stored;
	private $token_in_cookie;

	public function __construct () {
		$this->cookie_life += time();
		$this->get_stored_token();
		$this->get_cookie_token();
	}


	/*** PUBLIC API *******************************************************************************/

	public function is_authenticated () {
		if (empty($this->token_stored) || empty($this->token_in_cookie)) return false;
		return ($this->token_stored == $this->token_in_cookie);
	}

	public function verify ($token) {
		if ($token != $this->token_stored) return false;
		$this->set_cookie_token($token);
		return true;
	}

	public function new_token () {
		// $token = bin2hex(openssl_random_pseudo_bytes(32));
		$token = bin2hex(mcrypt_create_iv($this->token_length, MCRYPT_DEV_RANDOM));

		$res = mail($this->email_stored, 'startpage token', $token);
		if (!$res) return false;

		$this->set_stored_token($token);
		return true;
	}

	public function logout () {
		$this->del_stored_token();
		$this->del_cookie_token();
	}

	/*** PUBLIC API *******************************************************************************/




	/*** PRIVATE METHODS **************************************************************************/

	private function get_stored_token () {
		if (file_exists($this->token_file_name)) {
			$this->token_stored = file_get_contents($this->token_file_name);
		}
	}
	private function set_stored_token ($token) {
		file_put_contents($this->token_file_name, $token);
		$this->token_stored = $token;
	}
	private function del_stored_token () {
		$this->token_stored = null;
		if (file_exists($this->token_file_name)) unlink($this->token_file_name);
	}

	private function get_cookie_token () {
		if (isset($_COOKIE[$this->cookie_name])) {
			$this->token_in_cookie = $_COOKIE[$this->cookie_name];
		}
	}
	private function set_cookie_token ($token) {
		setcookie($this->cookie_name, $token, $this->cookie_life, '/');
		$this->token_in_cookie = $token;
	}
	private function del_cookie_token () {
		$this->token_in_cookie = null;
		setcookie($this->cookie_name, '', time() - 1000, '/');
	}

	/*** PRIVATE METHODS **************************************************************************/



}