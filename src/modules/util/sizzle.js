'use strict';

var util = require('./util.js');


function sizzle (mixed, context) {
	if (!mixed) return [];
	var el;
	if (typeof mixed !== 'string') el = mixed;

	// is html - create new element
	else if (/<[a-z][\s\S]*>/i.test(mixed)) {
		el = (new DOMParser()).parseFromString(mixed, 'text/html').body.firstChild;
	}
	// is selector - find element
	else el = (context || document).querySelectorAll(mixed);

	if (el.nodeType) el = [el];
	else if (util.isNodeList(el)) el = Array.prototype.slice.call(el);

	return Object.assign(el || [], sizzle.fn);
}


sizzle.fn = {};
sizzle.fn.find = function (selector) { return sizzle(selector, this[0]); };

sizzle.fn.appendTo = function (el) {
	if (el.length) el = el[0];
	if (this && this.length) el.appendChild(this[0]);
	return this;
};

sizzle.fn.append = function (el) {
	if (el.length) el = el[0];
	if (this && this.length) this[0].appendChild(el);
	return this;
};

sizzle.fn.on = function (eventName, cb) {
	var el = (this && this.length ? this[0] : null);
	if (el) el.addEventListener(eventName, cb);
	return this;
};

sizzle.fn.off = function (eventName, cb) {
	var el = (this && this.length ? this[0] : null);
	if (el) el.removeEventListener(eventName, cb);
	return this;
};


sizzle.fn.closest = function (cls) {
	var el = (this && this.length ? this[0] : null), has = false;
	cls = ('' + cls).replace(/\./g, '');
	while (!has && el) {
		has = el && el.classList && el.classList.contains(cls);
		if (has) return el;
		el = el.parentNode;
	}
	return null;
};

/**
 * Check if target is, or is inside, a selector
 * @param  {object}  target  - dom element
 * @param  {string}  ...cls  - classes/selectors
 * @example
 *    Helper.isTargetIn(el, 'cls1', 'cls2')
 * @return {Boolean}
 */
sizzle.fn.isIn = function (/*cls1, cls2, ...*/) {
	var target = (this && this.length ? this : null),
		classes = Array.prototype.slice.call(arguments),
		i, cls;

	if (!target) return false;

	for (i = 0; cls = classes[i++] ;) if (target.closest(cls)) return true;
	return false;
};

// sizzle.qsa = function (sel, node) { return (node || document).querySelectorAll(sel); };
// sizzle.qs = function (sel, node) { return (node || document).querySelector(sel); };

// sizzle.createElFromString = function (html) {
// 	return (new DOMParser()).parseFromString(html, 'text/html').body.firstChild;
// };

module.exports = sizzle;