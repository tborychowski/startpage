'use strict';

var $ = require('util');

module.exports = {

	auth: function () {
		return $.ajax('data/auth.php');
	},

	verify: function (params) {
		return $.ajax('data/auth.php', params);
	}

};
