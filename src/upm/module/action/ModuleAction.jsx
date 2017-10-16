/**
 * Created by wangjz on 2016/10/28.
 */
import {message, Modal} from 'antd';
import {eventBus, request} from 'uadp-react';
import ModuleEvent from '../event/ModuleEvent';

const confirm = Modal.confirm;

export function queryModule() {
	let selectedKey = this.tree.getSelectedKey();
	request.get('queryModule.do', {id: selectedKey, cascade: this.cascade}, function (res) {
		this.setState({dataSource: res});
	}.bind(this));
}

export function queryModuleByName(name) {
	request.get('queryModuleByName.do', {name: name}, function (res) {
		this.setState({dataSource: res});
	}.bind(this));
}

export function addModule() {
	eventBus.dispatchEvent(ModuleEvent.DLG_ACTION, {action: true, title: '新增功能模块'});
}

export function editModule(record) {
	eventBus.dispatchEvent(ModuleEvent.DLG_ACTION, {action: true, title: '修改功能模块', module: record});
}

export function delModule(record) {
	let _this = this;
	confirm({
		title: '确认删除这条记录吗？',
		onOk() {
			request.post('delModule.do', {id: record.id}, function () {
				message.success('删除功能模块成功！');
				queryModule.bind(_this)();
				_this.tree.refresh();
			});
		},
		onCancel() {
		},
	});
}

export function saveModule(edit, module) {
	this.setState({loading: true});
	if (edit) {
		request.post('updateModule.do', module, function () {
			queryModule.bind(this)();
			this.tree.refresh();
			this.setState({loading: false});
			eventBus.dispatchEvent(ModuleEvent.DLG_ACTION, {action: false});
			message.success('修改功能模块成功！');
		}.bind(this));
	} else {
		let selectedKey = this.tree.getSelectedKey();
		request.post('insertModule.do', Object.assign(module, {parentId: selectedKey}), function () {
			queryModule.bind(this)();
			this.tree.refresh();
			this.setState({loading: false});
			eventBus.dispatchEvent(ModuleEvent.DLG_ACTION, {action: false});
			message.success('新增功能模块成功！');
		}.bind(this));
	}
}

export function onSelect(selectedKey) {
	queryModule.bind(this)();
}
