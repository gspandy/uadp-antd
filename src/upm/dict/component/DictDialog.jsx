import React from 'react';
import {Modal, Form, Input, Select} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

function DictDialog({form, isNew, editData, visible, loading, onOk, onClose}) {
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

	let title = (isNew ? '新增字典' : '编辑字典');
	return (<Modal title={title} width={620} okText="保存" cancelText="返回" visible={visible} confirmLoading={loading}
				   onOk={e => onConfirm()} onCancel={() => onClose()} afterClose={afterClose}>
		<Form>
			{getFieldDecorator('id', {initialValue: editData.id})(<Input type="hidden"/>)}
			<FormItem {...formItemLayout} label="字典名称">
				{getFieldDecorator('name', {
					initialValue: editData.name,
					rules: [{
						required: true, message: '请输入字典名称！',
					}]
				})(
					<Input autoComplete="off"/>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label="字典标识">
				{getFieldDecorator('key', {
					initialValue: editData.key,
					rules: [{
						required: true, message: '请输入字典标识！',
					}]
				})(<Input autoComplete="off"/>)}
			</FormItem>
			<FormItem {...formItemLayout} label="对照码">
				{getFieldDecorator('code', {
					initialValue: editData.code,
					rules: [{
						required: true, message: '请输入字典标识！',
					}]
				})(<Input autoComplete="off"/>)}
			</FormItem>
			<FormItem {...formItemLayout} label="对照值">
				{getFieldDecorator('value', {
					initialValue: editData.value,
					rules: [{
						required: true, message: '请输入字典标识！',
					}]
				})(<Input autoComplete="off"/>)}
			</FormItem>
			<FormItem {...formItemLayout} label="排序号">
				{getFieldDecorator('idx',
					{initialValue: editData.idx})(<Input autoComplete="off"/>)}
			</FormItem>
			<FormItem {...formItemLayout} label="备注">
				{getFieldDecorator('remark',
					{initialValue: editData.remark})(<Input type="textarea" autosize autoComplete="off"/>)}
			</FormItem>
			<FormItem {...formItemLayout} label="是否启用">
				{getFieldDecorator('status', {initialValue: editData.status == null ? 'true' : '' + editData.status})(
					<Select>
						<Option value='true'>是</Option>
						<Option value='false'>否</Option>
					</Select>
				)}
			</FormItem>
		</Form>
	</Modal>);
}

export default Form.create()(DictDialog);
