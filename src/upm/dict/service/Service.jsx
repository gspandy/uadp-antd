import {request} from 'uadp-react';
import {Modal, message} from 'antd';
import assign from 'object-assign';

const confirm = Modal.confirm;

/**
 * 查询数据字典列表
 */
export function listDict(state, put) {
	let p = {};
	assign(p, {value: state.searchValue}, state.dictPagination);
	request.post('listDict.do', p, function (res) {
		put({dictPagination: res});
	});
}

/**
 * 新增字典
 */
export function addDict(state, params, put, dispatch) {
	let dictDialogProps = state.dictDialogProps;
	assign(dictDialogProps, {loading: true});
	put(dictDialogProps);
	request.post('addDict.do', params, function (res) {
		assign(dictDialogProps, {loading: false, visible: false});
		put(dictDialogProps);
		dispatch({type: 'listDict'});
		message.success("新增字典成功！");
	}, function (err) {
		assign(dictDialogProps, {loading: false});
		put(dictDialogProps);
		message.error("请求错误！");
	});
}

/**
 * 编辑数据字典
 */
export function updateDict(state, params, put, dispatch) {
	let dictDialogProps = state.dictDialogProps;
	assign(dictDialogProps, {loading: true});
	put(dictDialogProps);
	request.post('updateDict.do', params, function (res) {
		assign(dictDialogProps, {loading: false, visible: false});
		put(dictDialogProps);

		dispatch({type: 'listDict'});
	}, function (err) {
		assign(dictDialogProps, {loading: false});
		put(dictDialogProps);
		message.error("请求错误！");
	});
}

export function deleteDict(params, dispatch) {
	confirm({
		title: '确认删除这条记录吗？',
		onOk() {
			request.get('deleteDict.do', {id: params.id}, function (res) {
				message.success('删除字典成功！');
				dispatch({type: 'listDict'});
			});
		}
	});
}