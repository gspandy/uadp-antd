import React, {PropTypes, Component} from 'react';
import render from 'react-dom';
import {Icon} from 'antd';
import '../css/TopNav.less';

export default class TopNav extends Component {
  render() {
    let menu = this.props.dataSource;
    return (
      <div className="topNav">
        {menu.map(function(item, index) {
          return <div className="topNavItem" >
            <span style={{fontSize: 16}}>{item.icon == "" ? "": <Icon type={item.icon} style={{marginRight: 5}}/>}{item.name}</span>
          </div>;
        })}
      </div>
    );
  }
}

