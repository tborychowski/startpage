angular.module('app')
	.service('sidebarService', function () {
		'use strict';

		this.visible = false;
		this.callbacks = [];

		this.toggle = function (show) {
			this.visible = (typeof show === 'undefined' ? !this.visible : show);

			this.callbacks.forEach(function (cb) {
				cb.call(cb, this.visible);
			}, this);
			return this;
		};

		this.onChange = function (cb) {
			this.callbacks.push(cb);
			return this;
		};

		// this.isVisible = function () {
		// 	return this.visible;
		// };


	});
