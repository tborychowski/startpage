window.$ = (function ($) {
	'use strict';

	var _cache = {};

	$.trigger = function (topic, args) {
		if (!_cache[topic]) return;
		args = args ? [].splice.call(arguments, 1) : [];
		_cache[topic].forEach(function (cb) { cb.apply(cb, args); });
	};

	$.on = function (topic, callback) {
		if (!_cache[topic]) _cache[topic] = [];
		_cache[topic].push(callback);
		return [topic, callback];       // handle for off
	};

	$.off = function (handle) {
		var topic = handle[0], cb = handle[1].toString(), ca = _cache[topic];
		if (ca) ca.forEach(function (fn, i) {
			if (fn.toString() === cb) ca.splice(i, 1);
		});
	};


	return $;

}(window.$ || {}));
