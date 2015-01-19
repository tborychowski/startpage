'use strict';


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
function isIn (target/*, cls1, cls2, ...*/) {
	if (!target) return false;
	var classes = [].slice.call(arguments, 1), i = 0, cls;
	for (; cls = classes[i++] ;) if (closest(target, cls)) return true;
	return false;
}

function byid (id) { return document.getElementById(id); }
function qsa (sel, node) { return (node || document).querySelectorAll(sel); }
function qs (sel, node) { return (node || document).querySelector(sel); }

function createElFromString (html) {
	return (new DOMParser()).parseFromString(html, 'text/html').body.firstChild;
}

module.exports = {
	closest: closest,
	isIn: isIn,
	byid: byid,
	qsa: qsa,
	qs: qs,
	el: createElFromString
};