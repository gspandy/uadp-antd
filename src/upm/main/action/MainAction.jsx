import {request} from 'uadp-react';
import {Modal} from 'antd';

const confirm = Modal.confirm;

export function mockLogin(mockUrl, url, that) {
	request.getp(mockUrl, function (res) {
		this.setState({src: url});
	});
}

export function queryUserCfg(that) {
	request.post('upm/login/main.do', function (res) {
		that.setState({userInfo: res});
	});
}

export function logout(that) {
	confirm({
		title: '确定退出系统吗？',
		onOk() {
			request.post('upm/login/logout.do', function (res) {
				location.href = 'login.html';
			});
		},
		onCancel() {
		}
	});
}

export function modifyPassword(passwod, callback) {
	console.log("修改密码")
	request.post('upm/login/modifyPassword.do', passwod, function (res) {
		callback(res);
	});
}

export function needtModifyPassword(that) {
	request.post('upm/login/needModifyPassword.do', function (res) {
		if (res == 1) {
			Modal.info({
				title: '密码修改提示',
				content: "您首次登录系统，必须修改初始密码！",
				onOk() {
					that.setState({isForceModifyPassword: true, modifyPwVisible: true})
				}
			});
			that.setState({isForceModifyPassword: true});
		}

		if (res == 2) {
			Modal.info({
				title: '密码修改提示',
				content: "您的登录密码已经超过3个月没有修改！",
				onOk() {
					that.setState({isForceModifyPassword: true, modifyPwVisible: true})
				}
			});
			that.setState({isForceModifyPassword: true});
		}
	});
}
