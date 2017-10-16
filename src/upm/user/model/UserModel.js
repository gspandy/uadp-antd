import * as service from '../service/service';
import {message} from 'antd';

export default {
	namespace: 'user',
	state: {
		dataSource: [],
		orgTreeData: [],
		userProps: {
			editUser: {pinyin: ''},
			userType: [],
		},
		resetPasswordProps: {},
		setRoleProps: {},
		/*pagination: {
		  showSizeChanger: true,
		  pageSize: 20,
		  current: 1,
		  pageSizeOptions: [ '10', '20', '50', '100'],
		  total: 0,
		  showQuickJumper: true,
		}*/

	},

	reducers: {
		initOrgTree: function ({state, params, put, dispatch}) {
			service.initOrgTree(params, put, dispatch)
		},
		initUserType: function ({state, params, put, dispatch}) {
			service.initUserType(state, put);
		},
		/*选中组织机构树*/
		onOrgTreeSelect: function ({state, params, put}) {
			service.queryUserListByOrgId(params.selectTreeKey, put);
		},
		/*刷新用户列表*/
		refreshUserList: function ({state, params, put}) {
			service.queryUserListByOrgId(state.selectTreeKey, put);
		},
		/*打开用户弹出框*/
		openUserModal: function ({state, params}) {
			let userProps = state.userProps;
			if (params.isNew && state.selectTreeKey == null) {
				message.warning('请选择所属组织机构！', 3);
				return;
			}
			Object.assign(userProps, params, {visible: true});
			return {userProps: userProps};
		},
		/*关闭用户弹出框*/
		closeUserModal: function ({state, params}) {
			let userProps = state.userProps;
			Object.assign(userProps, {visible: false});
			return {userProps: userProps};
		},
		generatePinyin: function ({state, params, put}) {
			console.log(params);
			service.generatePinyin(state, params, put);
		},
		/*保存用户*/
		saveUser: function ({state, params, put, dispatch}) {
			service.saveUser(state, params, put, dispatch);
		},
		/*删除用户*/
		deleteUser: function ({state, params, put, dispatch}) {
			service.deleteUser(state, params, put, dispatch);
		},
		/*打开重置密码弹出框*/
		openResetPasswordModal: function ({state, params}) {
			let resetPasswordProps = state.resetPasswordProps;
			Object.assign(resetPasswordProps, {uid: params.uid}, {visible: true});
			return {resetPasswordProps: resetPasswordProps};
		},
		/*关闭重置密码弹出框*/
		closeResetPasswordModal: function ({state, params}) {
			let resetPasswordProps = state.resetPasswordProps;
			Object.assign(resetPasswordProps, {visible: false});
			return {resetPasswordProps: resetPasswordProps};
		},
		/*重置密码*/
		resetPassword: function ({state, params, put, dispatch}) {
			service.resetPassword(state, params, put);
		},
		/*打开设置用户角色弹出框*/
		openSetRoleModal: function ({state, params, put, dispatch}) {
			service.openSetRoleModal(state, params, put, dispatch);
			let setRoleProps = state.setRoleProps;
			Object.assign(setRoleProps, {visible: true});
			return {setRoleProps: setRoleProps};
		},
		/*关闭设置角色弹出框*/
		closeSetRoleModal: function ({state, params}) {
			let setRoleProps = state.setRoleProps;
			Object.assign(setRoleProps, {visible: false});
			return {setRoleProps: setRoleProps};
		},
		moveRole: function ({state, params}) {
			let setRoleProps = state.setRoleProps;
			setRoleProps.ownerRole = params;
			return {setRoleProps: setRoleProps};
		},
		saveUserRole: function ({state, params, put, dispatch}) {
			service.saveUserRole(state, params, put, dispatch);
		},
		getCurrentUserType: function ({state, params, put, dispatch}) {

		}

	}
}
