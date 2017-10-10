/**
 * Created by wangjz on 2016/11/11.
 */
import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import * as action from './action/MainAction';
import Tab from './tab/Tab'
import '../../themes/index.less';
export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {userInfo:{menu:[]}};
  }

  componentDidMount() {
    action.queryUserCfg(this);
  }

  render() {
    let userInfo = this.state.userInfo;
    if(userInfo.layout == 'window') {

    }else {
      return <Tab userInfo={userInfo}/>
    }
  }
}

render(<Root/>, document.getElementById('root'));
