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
      <iframe src={this.props.src} style={{width: this.context.width, height: this.context.height, border:'none', overflow:'auto'}}></iframe>
    );
  }
}
