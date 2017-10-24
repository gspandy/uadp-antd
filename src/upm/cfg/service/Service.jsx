import {request} from 'uadp-react';
import assign from 'object-assign';
import {Modal, message} from 'antd';

const confirm = Modal.confirm;

/**
 * 查询参数列表
 */
export function listCfg(state, put) {
	let p = {value: state.searchValue, ...state.cfgPagination};
	request.post('listCfg.do', p, function (res) {
		put({cfgPagination: res});
	});
}

/**
 * 新增参数
 */
export function addCfg(state, params, put, dispatch) {
	put({cfgDialogProps: {...state.cfgDialogProps, loading: true}});
	request.post('addCfg.do', params, function (res) {
		if (!res.success) {
			message.error(res.msg);
			put({cfgDialogProps: {...state.cfgDialogProps, loading: false}});
			return;
		}
		put({cfgDialogProps: {...state.cfgDialogProps, loading: false, visible: false}});
		dispatch({type: 'listCfg'});
		message.success("新增参数成功！");
	}, function (err) {
		put({cfgDialogProps: {...state.cfgDialogProps, loading: false}});
		message.error("请求错误！");
	});
}

/**
 * 编辑参数
 */
export function updateCfg(state, params, put, dispatch) {
	let cfgDialogProps = state.cfgDialogProps;
	assign(cfgDialogProps, {loading: true});
	put(cfgDialogProps);
	request.post('updateCfg.do', params, function (res) {
		assign(cfgDialogProps, {loading: false, visible: false});
		put(cfgDialogProps);
		dispatch({type: 'listCfg'});
	}, function (err) {
		assign(cfgDialogProps, {loading: false});
		put(cfgDialogProps);
		message.error("请求错误！");
	});
}

export function deleteCfg(params, dispatch) {
	confirm({
		title: '确认删除这条记录吗？',
		onOk() {
			request.get('deleteCfg.do', {key: params.key}, function (res) {
				message.success('删除参数成功！');
				dispatch({type: 'listCfg'});
			});
		}
	});
}