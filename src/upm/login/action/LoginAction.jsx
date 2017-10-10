import {request} from 'uadp-react';
import {message} from 'antd';

export function handleSubmit(event){
  event.preventDefault();
  this.props.form.validateFieldsAndScroll((err, values) => {
    if (!err) {
      request.post('upm/login/login.do', values, function (res) {
        if(res.success) {
          //location.href = './upm/welcome/index.html';
          //location.href = './upm/home/index.html';
          location.href = './main.html';
        }else {
          message.warning(res.msg);
        }
      });
    }
  });
}

export function getLatestClientVersion(callback){
  request.get('./upgrade/getLatestClientVersion.do', function (res) {
    if(callback) {
      callback(res);
    }
  });
}
