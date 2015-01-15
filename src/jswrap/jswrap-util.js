window.$ = (function ($) {
	'use strict';

	var _modules = {};

	/* better typeof */
	$.type = function (obj) {
		return obj ? Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() : 'undefined';
	};

	$.isNumber = function (v) {
		if (typeof v === 'number') return true;
		if (typeof v !== 'string') return false;
		return (/^[\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?$/).test(v);
	};

	$.varToRealType = function (v) {
		if ($.isNumber(v)) {
			var originalv = v;
			v = parseFloat('' + v);
			if (('' + v) !== originalv) v = originalv;
		}
		else if (v === 'true') v = true;
		else if (v === 'false') v = false;
		if (v === '') v = undefined;
		if (this.getType(v) === 'array') {
			for (var i = 0, il = v.length; i < il; i++) v[i] = $.varToRealType(v[i]);
		}
		return v;
	};

	$.isObjectEmpty = function (x) {
		if (!x || typeof x !== 'object') return true;
		for (var a in x) if (x.hasOwnProperty(a)) return false;
		return true;
	};

	$.rand = function (max, min) {
		min = min || 0;
		return Math.floor(Math.random() * (max - min + 1) + min);
	};


	$.module = function (name, def) {
		if (def) _modules[name] = def();
		else return _modules[name];
	};

	$.each = function (arr, cb) {
		for (var i = 0, item; item = arr[i]; i++) cb.call(cb, item, i);
		// return Array.prototype.forEach.call(collection, cb);
	};

	return $;

}(window.$ || {}));
