import {request} from 'uadp-react';
import {Modal, message} from 'antd';
import assign from 'object-assign';
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
	let OrgDialog = state.OrgDialog;
	assign(OrgDialog, {loading: true});
	put(OrgDialog);
	request.post('addSys.do', params, function () {
		assign(OrgDialog, {loading: false, visible: false});
		put(OrgDialog);
		dispatch({type: 'querySys', params: {name: ''}});
	});
}

/**
 * 编辑系统信息
 */
export function editSys(state, params, put, dispatch) {
	let OrgDialog = state.OrgDialog;
	assign(OrgDialog, {loading: true});
	put(OrgDialog);
	request.post('updateSys.do', params, function () {
		assign(OrgDialog, {loading: false, visible: false});
		put(OrgDialog);
		dispatch({type: 'querySys', params: {name: ''}});
	}, function (err) {
		assign(OrgDialog, {loading: false});
		put(OrgDialog);
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
