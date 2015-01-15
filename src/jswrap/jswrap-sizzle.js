window.$ = (function ($) {
	'use strict';



	$.closest = function (el, cls) {
		var has = false;
		while (!has && el) {
			has = el && el.classList && el.classList.contains(cls);
			el = el.parentNode;
		}
		return has;
	};

	/**
	 * Check if target is, or is inside, a selector
	 * @param  {object}  target  - dom element
	 * @param  {string}  ...cls  - classes/selectors
	 * @example
	 *    Helper.isTargetIn(el, 'cls1', 'cls2')
	 * @return {Boolean}
	 */
	$.isIn = function (target) {
		if (!target) return false;
		var classes = [].slice.call(arguments, 1), i = 0, cls;
		for (; cls = classes[i++] ;) if ($.closest(target, cls)) return true;
		return false;
	};

	$.byid = function (id) { return document.getElementById(id); };
	$.qsa = function (sel, node) { return (node || document).querySelectorAll(sel); };
	$.qs = function (sel, node) { return (node || document).querySelector(sel); };

	return $;
}(window.$ || {}));
