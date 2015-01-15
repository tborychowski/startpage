// angular.module('app')
// 	.service('tileSettingsService', function () {
// 		'use strict';

// 		var visible = false,
// 			callbacks = [],
// 			tile = null,
// 			data = null;

// 		this.toggle = function (show) {
// 			var vis = (typeof show === 'undefined' ? !visible : show);
// 			if (vis === visible) return;
// 			visible = vis;

// 			if (!visible) {
// 				tile = null;
// 				data = null;
// 			}

// 			callbacks.forEach(function (cb) {
// 				cb.call(cb, visible, tile, data);
// 			}, this);
// 			return this;
// 		};

// 		this.isVisible = function () {
// 			return visible;
// 		};

// 		this.setData = function (el, dat) {
// 			tile = el;
// 			data = dat;
// 			return this;
// 		};

// 		this.onChange = function (cb) {
// 			callbacks.push(cb);
// 			return this;
// 		};

// 	});
