/**
 * Created by wangjz on 2016/10/28.
 */
import {message, Modal} from 'antd';
import {request} from 'uadp-react';
const confirm = Modal.confirm;
export function listModuleTree(state, put) {
	request.post('listModuleTree.do', function (res) {
		put({moduleTreeProps: {...state.moduleTreeProps,treeData: res}});
	});
}

export function sort(params) {
	request.post('sort.do', params, function (res) {
		console.log("排序成功");
	});
}

/**
 * 查询功能模块列表
 */
export function listModule(state, put) {
	let {selectKey} = state.moduleTreeProps;
	request.get('listModule.do', {id: selectKey}, function (res) {
		put({dataSource: res});
	});
}

export function listModuleByName(params, put) {
	request.get('listModuleByName.do', params, function (res) {
		put({dataSource: res});
	});
}

/**
 * 新增功能模块
 */
export function addModule(state, params, put, dispatch) {
	put({moduleDialogProps: {...state.moduleDialogProps, loading: true}});
	request.post('addModule.do', params, function (res) {
		put({moduleDialogProps: {...state.moduleDialogProps, loading: false, visible: false}});
		dispatch({type: 'listModule'});
		dispatch({type: 'listModuleTree'});
		message.success("新增功能模块成功！");
	}, function (err) {
		put({moduleDialogProps: {...state.moduleDialogProps, loading: false}});
		message.error("请求错误！");
	});
}

/**
 * 编辑功能模块
 */
export function updateModule(state, params, put, dispatch) {
	let moduleDialogProps = state.moduleDialogProps;
	Object.assign(moduleDialogProps, {loading: true});
	put(moduleDialogProps);
	request.post('updateModule.do', params, function (res) {
		Object.assign(moduleDialogProps, {loading: false, visible: false});
		put(moduleDialogProps);
		dispatch({type: 'listModule'});
		dispatch({type: 'listModuleTree'});
	}, function (err) {
		Object.assign(moduleDialogProps, {loading: false});
		put(moduleDialogProps);
		message.error("请求错误！");
	});
}

export function deleteModule(params, dispatch) {
	confirm({
		title: '确认删除这条记录吗？',
		onOk() {
			request.post('deleteModule.do', {id: params.id}, function () {
				message.success('删除参数成功！');
				dispatch({type: 'listModule'});
				dispatch({type: 'listModuleTree'});
			});
		}
	});
}