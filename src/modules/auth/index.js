import hello from 'hellojs';

const GOOGLE = '771477434400-8j1a58af6aettr9mlmsfv612958nmpui.apps.googleusercontent.com';

hello.init({ google: GOOGLE }, { 'redirect_uri': 'redirect/redirect.html' });


function login () {
	return hello('google').login();
}

export default {
	login
};
