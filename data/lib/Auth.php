<?php
Class Auth {
	private $cookie_name = 'startpage';
	private $cookie_life = 2592000;				// 86400 * 30
	private $token_length = 32;
	private $token_file_name = '__auth_token.php';

	private $max_1_token_per_sec = 60;			// dont send tokens more freq. than that
	private $max_failed_login_attempts = 3;

	private $token_stored;
	private $token_in_cookie;

	private $email_stored;
	private $email_file_name = '__auth_email.php';

	public function __construct () {
		session_start();
		$this->cookie_life += time();
		$this->get_stored_token();
		$this->get_cookie_token();
		$this->get_stored_email();
	}


	/*** PUBLIC API *******************************************************************************/

	public function is_token_sent () {
		return ($_SESSION['token_sent'] == true && !empty($this->token_stored));
	}

	public function is_authenticated () {
		if (empty($this->token_stored) || empty($this->token_in_cookie)) return false;
		return ($this->token_stored == $this->token_in_cookie);
	}

	public function verify ($token) {
		if (empty($this->token_stored)) return false;
		if ($_SESSION['failed_logins'] >= $this->max_failed_login_attempts) {
			$this->logout();
			return false;
		}
		if ($token == $this->token_stored) {
			$this->set_cookie_token($token);
			return true;
		}
		$_SESSION['failed_logins']++;
		return false;
	}

	public function new_token () {
		if ($this->is_not_too_old()) return true;
		// $token = bin2hex(openssl_random_pseudo_bytes(32));
		$token = bin2hex(mcrypt_create_iv($this->token_length, MCRYPT_DEV_RANDOM));

		if (!empty($this->email_stored)) {
			$res = mail($this->email_stored, 'startpage token', $token);
		}
		else $res = true;
		if (!$res) return false;

		$this->set_stored_token($token);
		$_SESSION['token_sent'] = true;
		$_SESSION['failed_logins'] = 0;
		return true;
	}

	public function logout () {
		$this->del_stored_token();
		$this->del_cookie_token();
	}

	/*** PUBLIC API *******************************************************************************/




	/*** PRIVATE METHODS **************************************************************************/
	/**
	 * Stored key is not older than a minute - don't generate a new one
	 */
	private function is_not_too_old () {
		if (!file_exists($this->token_file_name)) return false;
		$created = filectime($this->token_file_name);
		return $created + ($this->max_1_token_per_sec * 10) < time();
	}

	private function get_stored_email () {
		if (file_exists($this->email_file_name)) {
			$this->stored_email = trim(file_get_contents($this->email_file_name));
		}
	}

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