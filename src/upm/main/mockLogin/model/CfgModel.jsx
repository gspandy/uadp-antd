import {request} from 'uadp-react';
export default {
	state: {
		mockUrl: null
	},
	reducers: {
		listSys: function ({put}) {
			request.post('../../login/listSys.do', function (res) {

			})
		}
	}
}
