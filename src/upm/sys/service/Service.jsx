import {request} from 'uadp-react';
import {Modal, message} from 'antd';

const confirm = Modal.confirm;

/**
 * 查询系统列表
 */
export function querySys(params, put) {
	request.post('querySys.do', params, function (res) {
		put({sysList: res});
	});
}

/**
 * 保存系统信息
 */
export function addSys(state, params, put, dispatch) {
	let sysModalProps = state.sysModalProps;
	Object.assign(sysModalProps, {loading: true});
	put(sysModalProps);
	request.post('addSys.do', params, function () {
		Object.assign(sysModalProps, {loading: false, visible: false});
		put(sysModalProps);
		dispatch({type: 'querySys', params: {name: ''}});
	});
}

/**
 * 编辑系统信息
 */
export function editSys(state, params, put, dispatch) {
	let sysModalProps = state.sysModalProps;
	Object.assign(sysModalProps, {loading: true});
	put(sysModalProps);
	request.post('updateSys.do', params, function () {
		Object.assign(sysModalProps, {loading: false, visible: false});
		put(sysModalProps);
		dispatch({type: 'querySys', params: {name: ''}});
	}, function (err) {
		Object.assign(sysModalProps, {loading: false});
		put(sysModalProps);
	});
}

export function deleteSys(params, dispatch) {
	confirm({
		title: '确认删除这条记录吗？',
		onOk() {
			request.get('deleteSys.do', {id: params.id}, function (res) {
				message.success('删除功能模块成功！');
				dispatch({type: 'querySys', params: {name: ''}});
			});
		}
	});
}
