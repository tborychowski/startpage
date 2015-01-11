angular.module('app')
	.service('Helper', function () {
		'use strict';

		/**
		 * jQuery "closest()" replacement
		 * @param  {object} element
		 * @param  {string} class name of the element or parents
		 */
		function closest (el, cls) {
			var has = false;
			while (!has && el) {
				has = el && el.classList && el.classList.contains(cls);
				el = el.parentNode;
			}
			return has;
		}

		/**
		 * Check if target is, or is inside, a selector
		 * @param  {object}  target  - dom element
		 * @param  {string}  ...cls  - classes/selectors
		 * @example
		 *    Helper.isTargetIn(el, 'cls1', 'cls2')
		 * @return {Boolean}
		 */
		function isTargetIn (target) {
			if (!target) return false;
			var classes = [].slice.call(arguments, 1), i = 0, cls;
			for (; cls = classes[i++] ;) if (closest(target, cls)) return true;
			return false;
		}

		return {
			closest: closest,
			isTargetIn: isTargetIn
		};

	});
