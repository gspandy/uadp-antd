import React from 'react';
import {connect} from 'uadp-react';
import {Button, Table, Input, Layout} from 'antd';
import SysModal from './CfgDialog';
import '../../../themes/index.less';
const {Header, Content} = Layout;
const Search = Input.Search;

function Root({dispatch, mockUrl}) {
	return (
		<form action="form_action.asp" method="get">
			<p>First name: <input type="text" name="fname" /></p>
			<p>Last name: <input type="text" name="lname" /></p>
			<input type="submit" value="Submit" />
		</form>
	);
}

function mapStateToProps(state) {
	return {
		mockUrl: state.mockUrl,
	};
}

export default connect(mapStateToProps)(Root);
