import React from 'react';
import {Modal, Form, Input, Icon, Radio, Tooltip} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function ModuleDialog({form, isNew, editData, visible, loading, onOk, onClose, selectKey}) {
	function onConfirm() {
		form.validateFields((err, values) => {
			if (err) return;
			onOk(isNew, values);
		});
	}

	function afterClose() {
		form.resetFields();
	}

	let {getFieldDecorator} = form;
	let formItemLayout = {
		labelCol: {span: 8},
		wrapperCol: {span: 14},
		style: {marginBottom: 5}
	};

	let title = (isNew ? '新增功能模块' : '编辑功能模块');

	return (<Modal title={title} width={620} okText="保存" cancelText="返回" visible={visible} confirmLoading={loading}
				   onOk={e => onConfirm()} onCancel={() => onClose()} afterClose={afterClose}>
			<Form>
				{getFieldDecorator('id', {initialValue: editData.id})(<Input type="hidden"/>)}
				{getFieldDecorator('parentId', {initialValue: selectKey})(<Input type="hidden"/>)}
				<FormItem {...formItemLayout} label="模块名称">
					{getFieldDecorator('name', {
						initialValue: editData.name,
						rules: [{
							required: true, message: '请输入功能模块名称！',
						}],
					})(
						<Input autoComplete="off"/>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="请求路径">
					{getFieldDecorator('url', {initialValue: editData.url,})(<Input autoComplete="off"/>)}
				</FormItem>
				<FormItem {...formItemLayout} label="模块描述">
					{getFieldDecorator('remark', {initialValue: editData.remark})(<Input type="textarea" autosize autoComplete="off"/>)}
				</FormItem>
				<FormItem {...formItemLayout} label="模块图标">
					{getFieldDecorator('icon', {initialValue: editData.icon})(
						<Input autoComplete="off"/>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="打开方式">
					{getFieldDecorator('isPopup', {initialValue: editData.isPopup == null ? 0 : editData.isPopup})(
						<RadioGroup>
							<Radio value={0}>嵌入模式</Radio>
							<Radio value={1}>弹出模式</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label={(
					<span>单例运行&nbsp;<Tooltip title="功能模块可否同时打开多个实例。">
                <Icon type="question-circle-o"/>
              </Tooltip></span>)}>
					{getFieldDecorator('isSingle', {initialValue: editData.isSingle == null ? 0 : editData.isSingle})(<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={0}>否</Radio>
					</RadioGroup>)}
				</FormItem>
				<FormItem {...formItemLayout} label={(
					<span>自动运行&nbsp;<Tooltip title="进入系统后加载设置为自动运行的模块。">
                <Icon type="question-circle-o"/>
              </Tooltip></span>)}>
					{getFieldDecorator('isAutorun', {initialValue: editData.isAutorun == null ? 0 : editData.isAutorun})(<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={0}>否</Radio>
					</RadioGroup>)}
				</FormItem>
				<FormItem {...formItemLayout} label={(
					<span>启用标记&nbsp;<Tooltip title="启用标记可启用或停止该功能模块。">
                <Icon type="question-circle-o"/>
              </Tooltip></span>)}>
					{getFieldDecorator('status', {initialValue: editData.status == null ? 1 : editData.status})(<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={0}>否</Radio>
					</RadioGroup>)}
				</FormItem>
			</Form>
		</Modal>);

}
export default Form.create()(ModuleDialog);
