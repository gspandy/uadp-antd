import * as service from '../service/Service';
import assign from 'object-assign';
export default {
	state: {
		OrgDialog: {
			loading: false,
			visible: false,
			isNew: true,
			editData: {},
		}
	},
	reducers: {
		/*打开系统弹出窗口*/
		openSysModal: function ({state, params, put}) {
			let OrgDialog = state.OrgDialog;
			assign(OrgDialog, params);
			return {OrgDialog};
		},
		/*关闭系统弹出窗口*/
		closeSysModal: function ({state, params, put}) {
			let OrgDialog = state.OrgDialog;
			assign(OrgDialog, {visible: false});
			return {OrgDialog};
		},
		/*查询系统列表*/
		querySys: function ({state, params, put}) {
			service.querySys(params, put);
		},
		/*新增系统*/
		addSys: function ({state, params, put, dispatch}) {
			service.addSys(state, params, put, dispatch);
		},
		/*编辑系统*/
		editSys: function ({state, params, put, dispatch}) {
			service.editSys(state, params, put, dispatch);
		},
		/*删除系统*/
		deleteSys: function ({params, dispatch}) {
			service.deleteSys(params, dispatch);
		},
	}
}
