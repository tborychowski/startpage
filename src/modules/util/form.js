'use strict';

const keyBreaker = /[^\[\]]+/g;
const numberMatcher = /^[\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?$/;

function _isNumber (value) {
	if (typeof value === 'number') return true;
	if (typeof value !== 'string') return false;
	return value.match(numberMatcher);
}

function _decodeEntities (str) {
	var d = document.createElement('div');
	d.innerHTML = str;
	return d.innerText || d.textContent;
}

function _getInputs (form) {
	var inputs = form.querySelectorAll('[name]');
	return Array.prototype.slice.call(inputs) || [];
}



/**
 * Form component
 * @param {object} el - form DOM element
 */
function Form (el) {
	if (!el) return null;
	this.form = el;
}

Form.prototype.set = function (params, clear) {
	_getInputs(this.form).forEach((input) => {
		var name = input.name,
			value = params[name] || '',
			names, i, n, v;

		// if name is object, e.g. user[name], userData[address][street], update value to read this correctly
		if (name.indexOf('[') > -1) {
			names = name.replace(/\]/g, '').split('[');
			n = null;
			v = params;
			for (i = 0; n = names[i++] ;) {
				if (v[n]) v = v[n];
				else { v = undefined; break; }
			}
			value = v;
		}

		// if clear==true and no value = clear field, otherwise - leave it as it was
		if (clear !== true && value === undefined) return;

		// if no value - clear field
		if (value === null || value === undefined) value = '';

		// decode html special chars (entities)
		if (typeof value === 'string' && value.indexOf('&') > -1) value = _decodeEntities(value);

		if (input.type === 'radio') input.checked = (input.value.toString() === value.toString());
		else if (input.type === 'checkbox') input.checked = value;
		else input.value = value;
	});
	return this;
};


Form.prototype.get = function (convert = false) {
	var data = {}, current, i;

	_getInputs(this.form).forEach((el) => {
		var type = el.type && el.type.toLowerCase(),
			key, value, parts, lastPart, tv, cmp, last;

		// if we are submit or disabled - ignore
		if ((type === 'submit') || !el.name || el.disabled)  return;

		key = el.name;
		value = el.value;
		parts = key.match(keyBreaker);

		// return only "checked" radio value
		if (type === 'radio' && !el.checked) return;

		// convert chekbox to [true | false]
		if (type === 'checkbox') value = el.checked;

		if (convert) {
			if (_isNumber(value)) {
				tv = parseFloat(value);
				cmp = tv + '';
				// convert (string)100.00 to (int)100
				if (value.indexOf('.') > 0) cmp = tv.toFixed(value.split('.')[1].length);
				if (cmp === value) value = tv;
			}
			else if (value === 'true') value = true;
			else if (value === 'false') value = false;
			if (value === '') value = null;
		}

		current = data;
		// go through and create nested objects
		for (i = 0; i < parts.length - 1; i++) {
			if (!current[parts[i]]) current[parts[i]] = {};
			current = current[parts[i]];
		}
		lastPart = parts[parts.length - 1];

		// now we are on the last part, set the value
		last = current[lastPart];
		if (last) {
			if (!Array.isArray(last)) current[lastPart] = (last === undefined ? [] : [last]);
			last.push(value);
		}
		else if (!last) current[lastPart] = value;
	});
	return data;
};

Form.prototype.reset = function () { this.set({}); };

Form.prototype.clear = function () { this.set({}, true); };


module.exports = Form;
