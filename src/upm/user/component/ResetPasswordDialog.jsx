import React, {Component, PropTypes} from 'react';
import {Modal, Form, Input} from 'antd';
import {connect} from 'uadp-react';

const FormItem = Form.Item;

function ResetPasswordModal({dispatch, form, visible, loading, uid}) {

  function checkPassword(rule, value, callback) {
    if (!value) {
      callback([new Error('请输入密码')]);
    } else {
      if (!/^[a-zA-Z0-9]{8,20}$/i.test(value)) {
        callback([new Error('密码必须为8-20位数字或字母')]);
      } else {
        callback();
      }
    }
  }

  function onOk() {
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({type: 'resetPassword', params: values});
      }
    });
  }

  const { getFieldDecorator} = form;
  const formItemLayout = {
    labelCol: { span: 8},
    wrapperCol: { span: 14},
    style: {marginBottom:5}
  };

  return (
    <Modal title="重置密码" okText="确认" cancelText="返回" visible = {visible}  afterClose={e=>form.resetFields()}
          confirmLoading={loading} onOk={e=>onOk()} onCancel={()=>dispatch({type: 'closeResetPasswordModal'})}>
      <Form >
        {getFieldDecorator('uid',{initialValue: uid})(
          <Input type="hidden"/>
        )}
        <FormItem {...formItemLayout} label="密码" >
          {getFieldDecorator('password', {
            rules: [{
              validator: checkPassword
            }],
          })(
            <Input autoComplete="off" />
          )}
        </FormItem>
      </Form>
    </Modal>);
}

function mapStateToProps(state) {
  return {
    visible: state.resetPasswordProps.visible,
    loading: state.resetPasswordProps.loading,
    uid: state.resetPasswordProps.uid,
  }
}

export default connect(mapStateToProps)(Form.create()(ResetPasswordModal));
