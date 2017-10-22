import * as service from '../service/Service';

export default {
	state: {
		searchValue: '',
		cfgDialogProps: {
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
		openCfgDialog: function ({state, params}) {
			return {cfgDialogProps: {...state.cfgDialogProps, ...params}};
		},
		/*关闭参数弹出窗口*/
		closeCfgDialog: function ({state}) {
			return {cfgDialogProps: {...state.cfgDialogProps, visible: false}};
		},
		/** 改变分页时调用 **/
		changePage: function ({state, params, put, dispatch}) {
			put({cfgPagination: {...state.cfgPagination, params}});
			dispatch({type: 'listCfg'})
		},
		/*查询参数列表*/
		listCfg: function ({state, put}) {
			service.listCfg(state, put);
		},
		/** 搜索参数 **/
		searchCfg: function ({state, params, put}) {
			put({searchValue: params.value, cfgPagination: {...state.cfgPagination, pageNo: 1}});
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
