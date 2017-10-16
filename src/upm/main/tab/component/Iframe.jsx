/**
 * Created by wangjz on 2016/11/11.
 */
import React, {PropTypes, Component} from 'react';
import MainBg from './MainBg';
import render from 'react-dom';

export default class Iframe extends Component {
	static contextTypes = {
		width: React.PropTypes.number,
		height: React.PropTypes.number
	}

	render() {
		return (
			this.props.src == "" ? <MainBg></MainBg> :
				<iframe src={this.props.src}
						style={{width: '100%', height: '100%', border: 'none', overflow: 'auto'}}></iframe>
		);
	}
}
