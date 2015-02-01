'use strict';

var $ = require('util'),
	_url = 'data/auth.php';

module.exports = {

	auth: function () {
		return $.ajax(_url);
	},

	verify: function (params) {
		return $.ajax(_url, params);
	},

	logout: function () {
		return $.ajax({ url: _url, type: 'json', method: 'DELETE' });
	}

};
