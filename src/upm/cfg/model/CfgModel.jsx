import * as service from '../service/Service';

export default {
	state: {
		searchValue: '',
		cfgModalProps: {
			loading: false,
			visible: false,
			isNew: true,
			editData: {},
		},
		cfgPagination: {
			pageNo: 1,
			pageSize: 20
		}
	},
	reducers: {
		/*打开参数弹出窗口*/
		openCfgModal: function ({state, params}) {
			let cfgModalProps = state.cfgModalProps;
			Object.assign(cfgModalProps, params);
			return {cfgModalProps};
		},
		/*关闭参数弹出窗口*/
		closeCfgModal: function ({state}) {
			let cfgModalProps = state.cfgModalProps;
			Object.assign(cfgModalProps, {visible: false});
			return {cfgModalProps};
		},
		/** 改变分页时调用 **/
		changePage: function ({state, params, put, dispatch}) {
			let cfgPagination = state.cfgPagination;
			Object.assign(cfgPagination, params);
			put(cfgPagination);
			dispatch({type: 'listCfg'})
		},
		/*查询参数列表*/
		listCfg: function ({state, put}) {
			service.listCfg(state, put);
		},
		/** 搜索参数 **/
		searchCfg: function ({state, params, put}) {
			let cfgPagination = state.cfgPagination;
			Object.assign(cfgPagination, {pageNo: 1});
			put(cfgPagination);
			put({searchValue: params.value, cfgPagination});
			service.listCfg(state, put);
		},
		/*新增参数*/
		addCfg: function ({state, params, put, dispatch}) {
			service.addCfg(state, params, put, dispatch);
		},
		/*编辑参数*/
		updateCfg: function ({state, params, put, dispatch}) {
			service.updateCfg(state, params, put, dispatch);
		},
		/*删除参数*/
		deleteCfg: function ({params, dispatch}) {
			service.deleteCfg(params, dispatch);
		},
	}
}
