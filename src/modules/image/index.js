/**
 * RGB Raster library "parsed" from here:
 * https://github.com/briangonzalez/rgbaster.js
 */
'use strict';

var
	_blockSize = 100 * 4,	// x * 4
	_exclude = [ '0,0,0', '255,255,255' ],

	_makeRgb = function (c) { return 'rgb(' + c + ')'; },

	_process = function (data) {
		var colors = {}, cArr = [], c, i, rgb = '';

		// Loop over all pixels, in _blockSize iterations.
		for (i = 0; i < data.length; i += _blockSize) {
			rgb = data[i] + ',' + data[i + 1] + ',' + data[i + 2];
			colors[rgb] = (colors[rgb] || 0) + 1;	// Keep track of counts
		}
		// exclude black & white
		for (i = 0; c = _exclude[i++] ;) colors[c] = null;
		// convert to 2d array for sorting
		for (c in colors) cArr.push([c, colors[c]]);
		// sort colors by no of px using it
		cArr.sort(function(a, b) { return b[1] - a[1]; });

		return _makeRgb(cArr[0][0]);
	},

	_image = function (imgSrc) {
		var imgObj = new Image(), context, img, dominant;
		return new Promise(function (resolve) {
			imgObj.onload = function () {
				context = document.createElement('canvas').getContext('2d');
				context.drawImage(imgObj, 0, 0);
				img = context.getImageData(0, 0, imgObj.width, imgObj.height);
				dominant = _process(img.data);
				resolve(dominant);
			};
			imgObj.src = imgSrc;
		});
	};

module.exports = _image;
