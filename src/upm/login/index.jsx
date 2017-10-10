/**
 * Created by wangjz on 2016/5/24.
 */
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import {Layout} from 'uadp-react';
import {Card, Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd';
import '../../themes/index.less';
import './css/index.less';
import * as action from './action/LoginAction';

const FormItem = Form.Item;
const Box = Layout.Box;
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      verifyCodeSrc:  "upm/randomCode.do?rnd="+ Math.random(),// 验证码地址
    };
  }

  onClickVerifyCode() {
    this.setState({verifyCodeSrc:  "upm/randomCode.do?rnd="+ Math.random()});
  }

  componentDidMount() {
    if(self!=top){
      parent.window.location.replace(window.location.href);
    }
  }
  render() {
    const { getFieldDecorator} = this.props.form;

    return(
      <Layout bordered={false} style={{background:'url(upm/login/img/login.jpg) top center no-repeat', backgroundSize:'100% 100%'}}>
        <Box region="center">
          <div className="centerContent" >
            <div className="appTitle" style={{background:'url(upm/login/img/login_title.png) top center no-repeat', backgroundSize:'100% 100%'}}></div>
            <Card bordered={false} >
              <Form onSubmit={action.handleSubmit.bind(this)} className="login-form" layout="horizontal">
                <FormItem>
                  {getFieldDecorator('loginName', {
                    rules: [{ required: true, message: '请输入用户名！' }],
                  })(
                    <Input addonBefore={<Icon type="user" />} autoComplete="off" placeholder="用户名" style={{width:250}}/>
                  )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码！' }, {min: 8, message:'密码长度不能少于8位'}],
                })(
                  <Input addonBefore={<Icon type="lock" />} autoComplete="off" type="password" placeholder="密码" style={{width:250}}/>
                )}
              </FormItem>
              <Row>
                <Col span={17}>
                  <FormItem>
                    {getFieldDecorator('randomCode', {
                      rules: [{ required: true, message: '请输入验证码!' }, {len: 4, message:'验证码长度为4'}],
                    })(
                      <Input addonBefore={<Icon type="picture" />} autoComplete="off"  placeholder="验证码" />
                    )}
                  </FormItem>
                </Col>
                <Col span={7} style={{paddingLeft:10}}>
                  <img width="60px" height="30px"  title="点击刷新验证码" src={this.state.verifyCodeSrc} onClick={this.onClickVerifyCode.bind(this)}></img>
                </Col>
              </Row>

                <FormItem>
                  {/*{getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>记住我</Checkbox>
                  )}*/}
                  {/*<a className="login-form-forgot">忘记密码</a><br/>*/}
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </div>
        </Box>
        <Box region="south" style={{height:0, textAlign:'center', color:'white'}} >
          <div className="bottomBackground"></div>
          <div className="bottomContent"> {/*{config.copyRight}*/}</div>
        </Box>
      </Layout>
    );
  }
}
const Root = Form.create()(Login);
export default Root;
render(<Root/>, document.getElementById('root'))

