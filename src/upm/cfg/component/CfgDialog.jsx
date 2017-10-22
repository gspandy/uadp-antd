import React from 'react';
import {Modal, Form, Input} from 'antd';

const FormItem = Form.Item;

function CfgDialog({form, isNew, editData, visible, loading, onOk, onClose}) {
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

	let title = (isNew ? '新增参数' : '编辑参数');
	return (<Modal title={title} width={620} okText="保存" cancelText="返回" visible={visible} confirmLoading={loading}
				   onOk={e => onConfirm()} onCancel={() => onClose()} afterClose={afterClose}>
		<Form>
			<FormItem {...formItemLayout} label="参数名称">
				{getFieldDecorator('name', {
					initialValue: editData.name,
					rules: [{
						required: true, message: '请输入参数名称！',
					}]
				})(
					<Input autoComplete="off"/>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label="参数键">
				{getFieldDecorator('key', {
					initialValue: editData.key,
					rules: [{
						required: true, message: '请输入参数键！',
					}]
				})(<Input autoComplete="off" disabled={isNew ? false : true}/>)}
			</FormItem>
			<FormItem {...formItemLayout} label="参数值">
				{getFieldDecorator('value',
					{initialValue: editData.value})(<Input autoComplete="off"/>)}
			</FormItem>
			<FormItem {...formItemLayout} label="参数选项">
				{getFieldDecorator('options',
					{initialValue: editData.options})(<Input autoComplete="off"/>)}
			</FormItem>
			<FormItem {...formItemLayout} label="备注">
				{getFieldDecorator('remark',
					{initialValue: editData.remark})(<Input type="textarea" autosize autoComplete="off"/>)}
			</FormItem>
		</Form>
	</Modal>);
}

export default Form.create()(CfgDialog);
