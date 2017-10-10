/**
 * Created by Administrator on 2016/11/3.
 */
import React, {Component, PropTypes} from 'react';
import {Layout} from 'uadp-react';
import {render} from 'react-dom';
import {Popover, Button} from 'antd';
import './less/index.less'


export default class Root extends Component {

  jump() {
    if (top !== self) {
      top.location.href = "../../login.html"
    } else {
      location.href = "../../login.html"
    }
  }

  render() {
    return (
      <div
        style={{background:'url(img/delu_07.png) top center no-repeat', textAlign:"center", backgroundSize:'cover',width:'100%',height:'100%'}}>
        <div className="Logfixd">
          <div className="welHh">登录超时,无法打开页面</div>
          <div className="welButton">
            <Button type="ghost" onClick={this.jump.bind(this)}>返回登录</Button>
          </div>
        </div>

      </div>
    )
  }
}
render(<Root/>, document.getElementById('root'))
