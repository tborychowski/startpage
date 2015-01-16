'use strict';

module.exports = function (options, data) {      /*global Promise */
	var req = new XMLHttpRequest(), cType = 'x-www-form-urlencoded', resp;

	if (typeof options === 'string') options = { url: options };
	data = data || options.data || '';
	if (data) {
		data = JSON.stringify(data);
		options.method = options.method || 'POST';
		cType = 'json';
	}

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
		req.setRequestHeader('Content-Type', 'application/' + cType + '; charset=UTF-8');
		req.send(data);
	});
};
