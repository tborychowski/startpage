import $ from 'util';

var _data, _dataPromise;

function load () {
	return _dataPromise = $.ajax('data/icons.php').then((data) => _data = data);
}

export default {
	get: (forceReload) => {
		if (!forceReload && _dataPromise) return _dataPromise;
		return load();
	}
};
