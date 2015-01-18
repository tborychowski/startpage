'use strict';

module.exports = function (options, data) {      /*global Promise */
	var req = new XMLHttpRequest(), resp;

	if (typeof options === 'string') options = { url: options };
	data = data || options.data || '';

	if (data) {
		options.method = options.method || 'POST';
		options.type = 'json';
	}

	options.type = options.type || 'x-www-form-urlencoded';
	if (data && options.type === 'json') data = JSON.stringify(data);

	return new Promise(function (resolve, reject) {
		req.open(options.method || 'GET', options.url, true);
		req.onload = function () {
			if (req.status >= 200 && req.status < 400) {
				resp = req.responseText;
				try { resp = JSON.parse(resp); } catch(e) {}
				resolve(resp);
			}
			else reject(req.statusText);
		};
		req.onerror = function () { reject(req.statusText); };
		req.setRequestHeader('Content-Type', 'application/' + options.type + '; charset=UTF-8');
		req.send(data);
	});
};
