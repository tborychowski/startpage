/* Appplication Cache - update when change detected */

function onUpdateReady () {
	if (window.confirm('Cache updated. Click OK to reload.')) window.location.reload();
}

function init () {
	var cache = window.applicationCache;
	cache.addEventListener('updateready', onUpdateReady);
	if (cache.status === cache.UPDATEREADY) onUpdateReady();
}

export default init;