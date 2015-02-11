/**
 * RGB Raster library "parsed" from here:
 * https://github.com/briangonzalez/rgbaster.js
 */

const _blockSize = 100 * 4;	// x * 4
const _exclude = [ '0,0,0', '255,255,255' ];

function process (data) {
	let colors = {}, cArr = [], rgb = '';

	// Loop over all pixels, in _blockSize iterations.
	for (let i = 0; i < data.length; i += _blockSize) {
		rgb = data[i] + ',' + data[i + 1] + ',' + data[i + 2];
		colors[rgb] = (colors[rgb] || 0) + 1;	// Keep track of counts
	}
	// exclude black & white
	for (let c of _exclude) colors[c] = null;

	// convert to 2d array for sorting
	for (let c in colors) cArr.push([c, colors[c]]);

	// sort colors by no of px using it
	cArr.sort((a, b) => b[1] - a[1]);

	return `rgba(${cArr[0][0]}, 0.6)`;
}

export default function (imgSrc) {
	let imgObj = new Image();
	return new Promise(resolve => {
		imgObj.onload = () => {
			let context = document.createElement('canvas').getContext('2d');
			context.drawImage(imgObj, 0, 0);
			let img = context.getImageData(0, 0, imgObj.width, imgObj.height);
			resolve(process(img.data));
		};
		imgObj.src = imgSrc;
	});
}
