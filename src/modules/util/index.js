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
		sizzle: _sizzle,
		util: _util
	};

Object.assign(_all, _ajax, _form, _pubsub, _sizzle, _util);

module.exports = _all;
