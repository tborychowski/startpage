import $ from 'util';

const _url = 'data/auth.php';


export default {

	auth: () => $.ajax(_url),

	verify: (params) => $.ajax(_url, params),

	logout: () => $.ajax({ url: _url, type: 'json', method: 'DELETE' })

};
