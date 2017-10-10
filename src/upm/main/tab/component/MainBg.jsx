/**
 * Created by wangjz on 2016/11/11.
 */
import React, {PropTypes, Component} from 'react';
import render from 'react-dom';

export default class Iframe extends Component {
  static contextTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }
  render() {

    return (
      <div style={{width: '100%', height: '100%', border:'none', overflow:'auto', background: 'url(upm/main/tab/img/main_bg.jpg) top center no-repeat', backgroundSize:'100% 100%'}}></div>
    );
  }
}
