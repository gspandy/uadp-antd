import React, {Component, PropTypes} from 'react'
import {Form, Input, message, Row, Col,Modal} from 'antd';

import {modifyPassword} from '../action/MainAction'
const createForm = Form.create;
const FormItem = Form.Item;

/**
 * 个人设置中心-修改密码
 */
class ModifyPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillUnmount() {
        this.props.form.resetFields();
    }

    checkOldPass(rule, value, callback) {
        if (!value) {
            callback([new Error('请输入原始密码')]);
        } else {
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(value)) {
                callback([new Error('密码必须由8-20位数字和字母组成')]);
            } else {
                callback();
            }
        }
    }
    checkNewPass(rule, value, callback) {
        if (!value) {
            callback([new Error('请输入新密码')]);
        } else {
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(value)) {
                callback([new Error('密码必须由8-20位数字和字母组成')]);
            } else {
                callback();
            }
        }
    }

    checkRePass(rule, value, callback) {
        if (!value) {
            callback([new Error('请输入确认密码')]);
        } else {
            const { getFieldValue } = this.props.form;
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(value)) {
                callback([new Error('密码必须由8-20位数字和字母组成')]);
            } else if(value && value !== getFieldValue('newPassword')) {
                callback([new Error('两次输入密码不一致')]);
            } else {
                callback();
            }
        }
    }
    handModifyPwOk() {
        let that = this;
        const params = this.props.form.getFieldsValue();
        this.props.form.validateFieldsAndScroll((errors, values) => {
            console.log("错误：" + errors)
            if (errors == null) {// 无错误
                modifyPassword(params, (res => {
                   if(res.success) {
                     message.success("密码修改成功！")
                     this.props.form.resetFields();
                     this.props.modifyPwOk();
                   }else {
                     message.success(res.message);
                   }
                }));
                return;
            }
        });
    }
    handModifyPwCancel() {
      this.props.form.resetFields();
      this.props.modifyPwCancel();
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        return (
        <Modal title="修改密码" visible={this.props.visible}
               onOk={this.handModifyPwOk.bind(this)} onCancel={this.handModifyPwCancel.bind(this)}>
            <Row>
                <Col>
                    <div className="pwd_right">
                        <Form horizontal form={this.props.form}>
                            <FormItem label="原始密码：" {...formItemLayout}>
                                {getFieldDecorator('oldPassword',{
                                    rules: [{validator: this.checkOldPass.bind(this)}],
                                })(<Input type="password" placeholder="请输入原始密码"/>)}
                            </FormItem>
                            <FormItem label="新&nbsp;&nbsp;密&nbsp;&nbsp;码：" {...formItemLayout}>
                                {getFieldDecorator('newPassword',{
                                    rules: [{validator: this.checkNewPass.bind(this)}],
                                })(<Input type="password" placeholder="请输入新密码（至少8位）"/>)}
                            </FormItem>
                            <FormItem label="确认密码：" {...formItemLayout}>
                                {getFieldDecorator('rePassword',{
                                    rules: [{validator: this.checkRePass.bind(this)}],
                                })(<Input type="password" placeholder="请输入确认密码"/>)}
                            </FormItem>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Modal>
        );
    }
}

ModifyPassword = createForm()(ModifyPassword);
export default ModifyPassword;
