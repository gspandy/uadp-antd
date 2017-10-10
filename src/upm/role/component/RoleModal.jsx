import React, {Component} from 'react';
import {Modal, Form, Input, Select} from 'antd';
import {connect} from 'uadp-react';
const FormItem = Form.Item;

function RoleModal ({dispatch, form, isNew, editData, visible, loading, orgType, currentUserType}) {
  function onConfirm() {
    form.validateFields((err, values) => {
      if (err) return;
      dispatch({type: 'saveRole', params: values});
    });
  }

  function afterClose() {
    form.resetFields();
  }

  let { getFieldDecorator} = form;
  let formItemLayout = {
    labelCol: { span: 8},
    wrapperCol: { span: 14},
    style: {marginBottom:5}
  };

  let title = (isNew ? '新增角色': '编辑角色');
  return (<Modal title={title} width={620} okText="保存" cancelText="返回"
                 visible = {visible} confirmLoading={loading}
                 onOk={e=>onConfirm()} onCancel={()=>dispatch({type: 'closeRoleModal'})} afterClose={afterClose}>
    <Form >
      {getFieldDecorator('id', {initialValue: editData.id})(<Input type="hidden"/>)}
      {getFieldDecorator('toOrgId', {initialValue: editData.toOrgId})(<Input type="hidden"/>)}
      <FormItem {...formItemLayout} label="角色名称" >
        {getFieldDecorator('name', {
          initialValue: editData.name,
          rules: [{
            required: true, message: '请输入角色名称！',
          }]})(<Input autoComplete="off"/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="角色代码" >
        {getFieldDecorator('code',
          {initialValue: editData.code})(<Input autoComplete="off"/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="角色描述" >
        {getFieldDecorator('remark',
          {initialValue: editData.remark})(<Input type="textarea" autosize autoComplete="off"/>)}
      </FormItem>
      {currentUserType != '1' ? '':
      <FormItem {...formItemLayout} label="是否全局" >
        {getFieldDecorator('isGlobal', {initialValue: editData.isGlobal==null?'0':''+ editData.isGlobal})(
          <Select onChange={value=>dispatch({type: 'isGlobalChange', scope: 'self', params: value})}>
            <Select.Option key="1" value="1">是</Select.Option>
            <Select.Option key="0" value="0">否</Select.Option>
          </Select>
        )}
      </FormItem>}
      {editData.isGlobal == '1'  ?
        <FormItem {...formItemLayout} label="适用范围" >
          {getFieldDecorator('orgType', {initialValue: editData.orgType})(
            <Select>
              {orgType.map(function(item, i) {
                if(!item.code) return;
                return <Select.Option key={item.code} value={item.code}>{item.value}</Select.Option>
              })}
            </Select>
          )}
        </FormItem>: ''}
    </Form>
  </Modal>);
}

function mapStateToProps(state) {
  return {
    isNew: state.roleProps.isNew,
    editData: state.roleProps.editData,
    visible: state.roleProps.visible,
    loading: state.roleProps.loading,
    orgType: state.roleProps.orgType,
    currentUserType: state.currentUserType,
  };
}
export default connect(mapStateToProps)(Form.create()(RoleModal));
