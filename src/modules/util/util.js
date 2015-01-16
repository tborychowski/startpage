'use strict';

/* better typeof */
function type (obj) {
	return obj ? Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() : 'undefined';
}

function isNumber (v) {
	if (typeof v === 'number') return true;
	if (typeof v !== 'string') return false;
	return (/^[\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?$/).test(v);
}

function varToRealType (v) {
	if (isNumber(v)) {
		var originalv = v;
		v = parseFloat('' + v);
		if (('' + v) !== originalv) v = originalv;
	}
	else if (v === 'true') v = true;
	else if (v === 'false') v = false;
	if (v === '') v = undefined;
	if (type(v) === 'array') {
		for (var i = 0, il = v.length; i < il; i++) v[i] = varToRealType(v[i]);
	}
	return v;
}

function isObjectEmpty (x) {
	if (!x || typeof x !== 'object') return true;
	for (var a in x) if (x.hasOwnProperty(a)) return false;
	return true;
}

function rand (max, min) {
	min = min || 0;
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function each (arr, cb) {
	for (var i = 0, item; item = arr[i]; i++) cb.call(cb, item, i);
	// return Array.prototype.forEach.call(collection, cb);
}

module.exports = {
	type          : type,
	rand          : rand,
	each          : each,
	isNumber      : isNumber,
	varToRealType : varToRealType,
	isObjectEmpty : isObjectEmpty
};