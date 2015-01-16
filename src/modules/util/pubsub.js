'use strict';

var _cache = {},

	_trigger = function (topic, args) {
		if (!_cache[topic]) return;
		args = args ? [].splice.call(arguments, 1) : [];
		_cache[topic].forEach(function (cb) { cb.apply(cb, args); });
	},

	_on = function (topic, callback) {
		if (!_cache[topic]) _cache[topic] = [];
		_cache[topic].push(callback);
		return [topic, callback];       // handle for off
	},

	_off = function (handle) {
		var topic = handle[0], cb = handle[1].toString(), ca = _cache[topic];
		if (ca) ca.forEach(function (fn, i) {
			if (fn.toString() === cb) ca.splice(i, 1);
		});
	};

module.exports = {
	on: _on,
	off: _off,
	trigger: _trigger
};

