import {request} from 'uadp-react';
import {Modal, message} from 'antd';

const confirm = Modal.confirm;

/**
 * 查询参数列表
 */
export function listCfg(state, put) {
	let p = {};
	Object.assign(p, {value: state.searchValue}, state.cfgPagination);
	request.post('listCfg.do', p, function (res) {
		put({cfgPagination: res});
	});
}

/**
 * 新增参数
 */
export function addCfg(state, params, put, dispatch) {
	let cfgModalProps = state.cfgModalProps;
	Object.assign(cfgModalProps, {loading: true});
	put(cfgModalProps);
	request.post('addCfg.do', params, function (res) {
		if (!res.success) {
			message.error(res.msg);
			Object.assign(cfgModalProps, {loading: false});
			put(cfgModalProps);
			return;
		}
		Object.assign(cfgModalProps, {loading: false, visible: false});
		put(cfgModalProps);
		dispatch({type: 'listCfg'});
		message.success("新增参数成功！");
	}, function (err) {
		Object.assign(cfgModalProps, {loading: false});
		put(cfgModalProps);
		message.error("请求错误！");
	});
}

/**
 * 编辑参数
 */
export function updateCfg(state, params, put, dispatch) {
	let cfgModalProps = state.cfgModalProps;
	Object.assign(cfgModalProps, {loading: true});
	put(cfgModalProps);
	request.post('updateCfg.do', params, function (res) {
		Object.assign(cfgModalProps, {loading: false, visible: false});
		put(cfgModalProps);
		dispatch({type: 'listCfg'});
	}, function (err) {
		Object.assign(cfgModalProps, {loading: false});
		put(cfgModalProps);
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