import React, {Component, PropTypes} from 'react';
import {Button, Modal, Form, Input, Icon, Radio, Tooltip} from 'antd';
import {eventBus} from 'uadp-react';
import evt from '../event/ModuleEvent'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class ModuleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, loading:false, edit: false};
  }
  onOk() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.props.onOk) {
          this.props.onOk(this.state.edit, this.state.edit ? Object.assign(values, {id: this.editModuleId}): values);
        }
      }
    });
  }

  dlgActionHandler(data) {
    if(data.action) {
      this.props.form.resetFields();
      let edit = false;
      if(data.module) {

        this.props.form.setFieldsValue(data.module);
        this.editModuleId = data.module.id;
        edit = true;
      }
      this.setState({visible: true, title: data.title, edit: edit});
    }else {
      this.setState({visible: false, loading: false});
    }
  }

  componentDidMount() {
    eventBus.addEventListener(evt.DLG_ACTION, this.dlgActionHandler.bind(this));
  }

  componentWillUnmount() {
    eventBus.removeEventListener(evt.DLG_ACTION, this.dlgActionHandler);
  }

  render() {
    let modalButtons = ([
      <Button key="back" type="ghost" size="default" onClick={()=>this.setState({visible: false})}>返回</Button>,
      <Button key="submit" type="primary" size="default" loading={this.props.loading} onClick={this.onOk.bind(this)}>保存</Button>]);

    const { getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: { span: 8},
      wrapperCol: { span: 14},
      style: {marginBottom:5}
    };

    return (<Modal title={this.state.title} footer = {modalButtons} visible = {this.state.visible} onCancel={()=>this.setState({visible: false})}>
      <Form >
        <FormItem {...formItemLayout}label="模块名称" >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入功能模块名称！',
            }],
          })(
            <Input autoComplete="off" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="请求路径" >
          {getFieldDecorator('url')(<Input autoComplete="off"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="模块描述" >
          {getFieldDecorator('remark')(<Input type="textarea" autosize autoComplete="off"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="模块图标" >
          {getFieldDecorator('icon')(
            <Input autoComplete="off"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="打开方式" >
          {getFieldDecorator('isPopup', {initialValue: 0})(
            <RadioGroup>
              <Radio value={0}>嵌入模式</Radio>
              <Radio value={1}>弹出模式</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={(
          <span>单例运行&nbsp;<Tooltip title="功能模块可否同时打开多个实例。">
                <Icon type="question-circle-o" />
              </Tooltip></span>)}>
          {getFieldDecorator('isSingle', {initialValue:0})(<RadioGroup>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </RadioGroup>)}
        </FormItem>
        <FormItem {...formItemLayout} label={(
              <span>自动运行&nbsp;<Tooltip title="进入系统后加载设置为自动运行的模块。">
                <Icon type="question-circle-o" />
              </Tooltip></span>)}>
          {getFieldDecorator('isAutorun', {initialValue: 0})(<RadioGroup>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </RadioGroup>)}
        </FormItem>
        <FormItem {...formItemLayout} label={(
          <span>启用标记&nbsp;<Tooltip title="启用标记可启用或停止该功能模块。">
                <Icon type="question-circle-o" />
              </Tooltip></span>)}>
          {getFieldDecorator('status',{initialValue: 1})(<RadioGroup>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </RadioGroup>)}
        </FormItem>
      </Form>
    </Modal>);
  }
}

export default Form.create()(ModuleModal);
