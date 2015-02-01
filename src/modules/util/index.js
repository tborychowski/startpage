'use strict';

var
	_ajax = require('./ajax'),
	_form = require('./form'),
	_pubsub = require('./pubsub'),
	_sizzle = require('./sizzle'),
	_util = require('./util'),
	_all = {
		ajax: _ajax,
		form: _form,
		pubsub: _pubsub,
		util: _util
	};

Object.assign(_all, _ajax, _pubsub, _util);
for (var prop in _all) _sizzle[prop] = _all[prop];

module.exports = _sizzle;
