import * as service from '../service/Service';
import {message} from 'antd';
import Constant from '../../../common/Constant';

export default {
	state: {
		cascade: true,
		moduleTreeProps: {
			treeData: [],
			expandedKeys: [],
			selectKey: '0',
		},
		moduleDialogProps: {
			loading: false,
			visible: false,
			isNew: true,
			editData: {},
		}
	},
	reducers: {
		listModuleTree: function ({state, params, put}) {
			service.listModuleTree(state, put);
		},
		selectTree: function ({state, params, put}) {
			let moduleTreeProps = {...state.moduleTreeProps, ...params};
			put({moduleTreeProps: moduleTreeProps});
			service.listModule(state, put);
		},

		/*打开功能模块弹出窗口*/
		openModuleDialog: function ({state, params}) {
			if(params.isNew && state.moduleTreeProps.selectKey == null) {
				message.info("请选择父功能节点！", 3);
				return ;
			}
			return {moduleDialogProps: {...state.moduleDialogProps, ...params}};
		},
		/*关闭功能模块弹出窗口*/
		closeModuleDialog: function ({state}) {
			return {moduleDialogProps: {...state.moduleDialogProps, visible: false}};
		},
		/*查询功能模块列表*/
		listModule: function ({state, put}) {
			service.listModule(state, put);
		},
		/** 搜索功能模块 **/
		searchModule: function ({params, put}) {
			service.listModuleByName(params, put);
		},
		/*新增功能模块*/
		addModule: function ({state, params, put, dispatch}) {
			service.addModule(state, params, put, dispatch);
		},
		/*编辑功能模块*/
		updateModule: function ({state, params, put, dispatch}) {
			service.updateModule(state, params, put, dispatch);
		},
		/*删除功能模块*/
		deleteModule: function ({params, dispatch}) {
			service.deleteModule(params, dispatch);
		},
		sort: function ({state, params, put}) {
			let moduleTreeProps = {...state.moduleTreeProps, treeData: params.treeData};
			put(moduleTreeProps);
			service.sort(params.dragNode);
		}
	}
}