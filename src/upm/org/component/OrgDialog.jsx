import React, {Component} from 'react';
import {Modal, Form, Input, Row, Col, Select} from 'antd';
import {connect} from 'uadp-react';

const FormItem = Form.Item;
const Option = Select.Option;

function OrgDialog({dispatch, form, visible, loading, isNew, editData, orgType}) {
	function onConfirm(e) {
		form.validateFields((err, values) => {
			if (!err) {
				dispatch({type: 'saveOrg', params: values});
			}
		});
	}

	function afterClose() {
		form.resetFields();
	}

	function onClose() {
		dispatch({type: "closeOrgDialog"});
	}

	let {getFieldDecorator} = form;
	let formItemLayout = {
		labelCol: {span: 8},
		wrapperCol: {span: 14},
		style: {marginBottom: 5}
	};
	let oneItemLayout = {
		labelCol: {span: 4},
		wrapperCol: {span: 19},
		style: {marginBottom: 5}
	};

	let title = isNew ? '新增机构' : '编辑机构';
	return (<Modal title={title} okText="保存" cancelText="返回" visible={visible} width={700} afterClose={afterClose}
				   confirmLoading={loading} onOk={e => onConfirm()} onCancel={() => onClose()}>
		<Form>
			{getFieldDecorator('id', {initialValue: editData.id})(<Input type="hidden"/>)}
			<Row>
				<Col span={12}>
					<FormItem {...formItemLayout} label="机构名称">
						{getFieldDecorator('name', {
							initialValue: editData.name,
							rules: [{
								required: true, message: '请输入机构名称！',
							}],
						})(
							<Input autoComplete="off"/>
						)}
					</FormItem>
				</Col>
				<Col span={12}>
					<FormItem {...formItemLayout} label="机构全称">
						{getFieldDecorator('fullName',
							{initialValue: editData.fullName})(<Input autoComplete="off"/>)}
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<FormItem {...formItemLayout} label="机构代码">
						{getFieldDecorator('code',
							{initialValue: editData.code})(<Input autoComplete="off"/>)}
					</FormItem>
				</Col>
				<Col span={12}>
					<FormItem {...formItemLayout} label="机构类型">
						{getFieldDecorator('type', {initialValue: editData.type})(
							<Select>
								{orgType.map(function (item, i) {
									if (!item.code) return;
									return <Select.Option key={item.code} value={item.code}>{item.value}</Select.Option>
								})}
							</Select>
						)}
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<FormItem {...formItemLayout} label="邮政编码">
						{getFieldDecorator('zipCode',
							{initialValue: editData.zipCode})(<Input autoComplete="off"/>)}
					</FormItem>
				</Col>
				<Col span={12}>
					<FormItem {...formItemLayout} label="联系电话">
						{getFieldDecorator('tel',
							{initialValue: editData.tel})(<Input autoComplete="off"/>)}
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<FormItem {...formItemLayout} label="传真">
						{getFieldDecorator('tax',
							{initialValue: editData.tax})(<Input autoComplete="off"/>)}
					</FormItem>
				</Col>
				<Col span={12}>
					<FormItem {...formItemLayout} label="email">
						{getFieldDecorator('email', {
							initialValue: editData.email,
							rules: [{
								type: 'email', message: '请输入有效格式的电子邮箱!',
							}]
						})(<Input autoComplete="off"/>)}
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<FormItem {...formItemLayout} label="联系人">
						{getFieldDecorator('contacter',
							{initialValue: editData.contacter})(<Input autoComplete="off"/>)}
					</FormItem>
				</Col>
				<Col span={12}>
					<FormItem {...formItemLayout} label="当前状态">
						{getFieldDecorator('status', {initialValue: editData.status})(
							<Select>
								<Select.Option key="1" value="1">启用</Select.Option>
								<Select.Option key="0" value="0">停用</Select.Option>
							</Select>
						)}
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<FormItem {...oneItemLayout} label="通讯地址">
						{getFieldDecorator('addr', {initialValue: editData.addr})(<Input autoComplete="off"/>)}
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<FormItem {...oneItemLayout} label="机构描述">
						{getFieldDecorator('remark',
							{initialValue: editData.remark})(<Input type="textarea" autosize autoComplete="off"/>)}
					</FormItem>
				</Col>
			</Row>
		</Form>
	</Modal>);
}

function mapStateToProps(state) {
	return {
		visible: state.visible,
		loading: state.loading,
		isNew: state.isNew,
		editData: state.editData,
		orgType: state.orgType,
	};
}

export default connect(mapStateToProps)(Form.create()(OrgDialog));
