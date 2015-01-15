(function () {
    'use strict';

	$.Data = {
		get: function () {
			return $.ajax('data/index.php');
		},
		save: function (params) {
			return $.ajax('data/index.php', params);
		},
		del: function (params) {
			return $.ajax({ url: 'data/index.php', data: params, method: 'DEL' });
		}
	};

})();
