import hello from 'hellojs';
import $ from 'util';

const _URL = 'data/auth.php';
const SECRETS = {
	google: '771477434400-8j1a58af6aettr9mlmsfv612958nmpui.apps.googleusercontent.com'
};
const OPTIONS = { scope: 'email', redirect_uri: 'redirect/redirect.html' };

function login () {
	var res = (isOnline() ? getEmail() : hello('google').login().then(getEmail));
	return res.then(validateEmail);
}

function logout () { return hello('google').logout(); }

function me () { return hello('google').api('me'); }

function getEmail () { return me().then(function (user) { return user.email; }); }

function isOnline () {
	var session = hello('google').getAuthResponse(), now = +new Date() / 1000;
	return (session && session.access_token && session.expires > now);
}

function validateEmail (email) {
	return $.ajax(_URL, { email: email }).then(function (resp) {
		return resp.result === 'success';
	});
}



hello.init(SECRETS, OPTIONS);

export default { login, logout, isOnline };
