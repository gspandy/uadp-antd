import React, {Component, PropTypes} from 'react';
import {Tooltip, Modal, Form, Input, Row, Col, Select, Icon} from 'antd';
import {connect} from 'uadp-react';
const FormItem = Form.Item;
const Option = Select.Option;
function UserModal({dispatch, form, userType, visible, loading, isNew, editUser, currentUserType}){
  function onOk() {
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({type:'saveUser', params: values});
      }
    });
  }

  function checkPassword(that, rule, value, callback) {
    if (value && value !== form.getFieldValue('password')) {
      callback('您两次输入的密码不一样！');
    } else {
      callback();
    }
  }

  let { getFieldDecorator} = form;
  let formItemLayout = {labelCol: { span: 8}, wrapperCol: { span: 14}, style: {marginBottom:5}};
  let oneItemLayout = {labelCol: { span: 4}, wrapperCol: { span: 19}, style: {marginBottom:5}};
  let title = (isNew ? '新增用户':'编辑用户');

  return (<Modal title={title} okText="保存" cancelText="返回" visible = {visible} width={700} afterClose={()=>form.resetFields()}
                   confirmLoading={loading} onOk={e=>onOk()} onCancel={e=>dispatch({type: 'closeUserModal'})}>
      <Form>
        {getFieldDecorator('toOrgId', {initialValue: editUser.toOrgId})(<Input type="hidden"/>)}
        {getFieldDecorator('uid', {initialValue: editUser.uid})(<Input type="hidden"/>)}
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="用户姓名" >
              {getFieldDecorator('name', {
                initialValue: editUser.name,
                rules: [{
                  required: true, message: '请输入用户姓名！',
                }],
              })(
                <Input autoComplete="off" onChange={e=>dispatch({type: 'generatePinyin', scope:'self', params: {name: e.target.value}})}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="登录帐号" >
              {getFieldDecorator('loginName',{
                initialValue: editUser.loginName,
                rules: [{
                  required: true, message: '请输入登录帐号！',
                }],
              })(<Input autoComplete="off" disabled={isNew? false : true} />)}
            </FormItem>
          </Col>
        </Row>
        {!isNew? '' : <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="密码" >
              {getFieldDecorator('password', {
                initialValue: editUser.password,
                rules: [{
                  required: true, message: '请输入密码！',
                }],
              })(<Input type="password" autoComplete="off"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="确认密码" >
              {getFieldDecorator('confirmPassword', {
                rules: [{
                  required: true, message: '请输入确认密码！',
                },{
                  validator: (rule, value, callback)=>checkPassword(this, rule, value, callback),
                }],
              })(<Input type="password" autoComplete="off"/>)}
            </FormItem>
          </Col>
        </Row>}
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="手机号码" >
              {getFieldDecorator('mobile', {initialValue: editUser.mobile})(<Input autoComplete="off"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="联系电话" >
              {getFieldDecorator('tel', {initialValue: editUser.tel})(<Input autoComplete="off"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="传真" >
              {getFieldDecorator('fax', {initialValue: editUser.fax})(<Input autoComplete="off"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="email" >
              {getFieldDecorator('email', {
                initialValue: editUser.email,
                rules:[{
                  type: 'email', message: '请输入有效格式的电子邮箱!',
                }]
              })(<Input autoComplete="off"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="身份证号" >
              {getFieldDecorator('idNo', {initialValue: editUser.idNo})(<Input autoComplete="off"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="通讯地址" >
              {getFieldDecorator('addr', {initialValue: editUser.addr})(<Input autoComplete="off"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="姓名拼音" >
              {getFieldDecorator('pinyin', {initialValue: editUser.pinyin})(<Input autoComplete="off"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="用户状态" >
              {getFieldDecorator('status', {initialValue: editUser.status==null?'1':editUser.status})(
                <Select>
                  <Option value='1'>正常</Option>
                  <Option value='2'>冻结</Option>
                  <Option value='3'>注销</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label={(
              <span>扩展码&nbsp;<Tooltip title="扩展码不填写时，默认为组织机构代码。">
                <Icon type="question-circle-o" />
              </Tooltip></span>)}>
              {getFieldDecorator('extCode', {initialValue: editUser.extCode})(<Input autoComplete="off"/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            {currentUserType != '1'? '' :
            <FormItem {...formItemLayout} label="用户类型" >
              {getFieldDecorator('type', {initialValue: editUser.type})(
                <Select>
                  {userType.map(function(item, i) {
                    if(!item.code) return;
                    return <Select.Option key={item.code} value={item.code}>{item.value}</Select.Option>
                  })}
                </Select>
              )}
            </FormItem>}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem {...oneItemLayout} label="描述" >
              {getFieldDecorator('remark', {initialValue: editUser.remark})(<Input type="textarea" autosize autoComplete="off"/>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>);
}

function mapStateToProps(state) {
  return {
    userType: state.userProps.userType,
    visible: state.userProps.visible,
    loading: state.userProps.loading,
    isNew: state.userProps.isNew,
    editUser: state.userProps.editUser,
    currentUserType: state.currentUserType,
  };
}
export default connect(mapStateToProps)(Form.create()(UserModal));
