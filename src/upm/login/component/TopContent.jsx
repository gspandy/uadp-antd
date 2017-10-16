import React, {Component, PropTypes} from 'react';
import {getLatestClientVersion} from '../action/LoginAction'
import {config} from '../../../common/Config'

export default class TopContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientVersionData: {
				version: "",
				downloadUrl: ""
			}
		};
	}

	componentWillMount() {
		// getLatestClientVersion((versionData => {
		//   this.setState({clientVersionData:versionData});
		// }).bind(this));
	}

	download(clientVersionData) {
		location.href = clientVersionData.url;
	}

	render() {
		return (
			<div>
				{/*      <a href={this.state.clientVersionData.downloadUrl} target="blank"  className="download">
        下载客户端软件 {'V' + this.state.clientVersionData.version}
      </a>&nbsp;&nbsp;&nbsp;*/}
				<a href="#" target="blank" className="download">
					帮助
				</a>
			</div>
		);
	}
}
