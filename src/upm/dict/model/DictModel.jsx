import * as service from '../service/Service';
import Constant from '../../../common/Constant';
import assign from 'object-assign';

export default {
	state: {
		searchValue: '',
		dictDialogProps: {
			loading: false,
			visible: false,
			isNew: true,
			editData: {},
		},
		dictPagination: {
			pageNo: 1,
			pageSize: Constant.pageSize
		}
	},
	reducers: {
		/** 打开数据字典弹出窗口 **/
		openDictDialog: function ({state, params}) {
			let dictDialogProps = state.dictDialogProps;
			assign(dictDialogProps, params);
			return {dictDialogProps};
		},
		/** 关闭数据字典弹出窗口 **/
		closeDictDialog: function ({state}) {
			let dictDialogProps = state.dictDialogProps;
			assign(dictDialogProps, {visible: false});
			return {dictDialogProps};
		},
		/** 改变分页时调用 **/
		changePage: function ({state, params, put, dispatch}) {
			let dictPagination = state.dictPagination;
			assign(dictPagination, params);
			put(dictPagination);
			dispatch({type: 'listDict'})
		},
		/*查询数据字典列表*/
		listDict: function ({state, put}) {
			service.listDict(state, put);
		},
		/** 搜索数据字典 **/
		searchDict: function ({state, params, put}) {
			let dictPagination = state.dictPagination;
			assign(dictPagination, {pageNo: 1});
			put(dictPagination);
			put({searchValue: params.value, dictPagination});
			service.listDict(state, put);
		},
		/** 新增数据字典 **/
		addDict: function ({state, params, put, dispatch}) {
			service.addDict(state, params, put, dispatch);
		},
		/** 编辑数据字典 **/
		updateDict: function ({state, params, put, dispatch}) {
			service.updateDict(state, params, put, dispatch);
		},
		/** 删除数据字典 **/
		deleteDict: function ({params, dispatch}) {
			service.deleteDict(params, dispatch);
		},
	}
}
