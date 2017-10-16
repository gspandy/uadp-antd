/**
 * Created by wangjz on 2016/10/31.
 */
import React, {Component, PropTypes} from 'react';
import {Tree} from 'antd';
import {connect} from 'uadp-react';

const TreeNode = Tree.TreeNode;

function OrgTree({dispatch, orgTreeData, selectTreeKey}) {
	let loop = function (data) {
		return data.map((item) => {
			if (item.children && item.children.length > 0) {
				return <TreeNode title={item.name} key={item.id}>{loop(item.children)}</TreeNode>;
			}

			return <TreeNode title={item.name} key={item.id} isLeaf={item.isLeaf}/>;
		});
	}

	return (
		<Tree selectedKeys={['' + selectTreeKey]}
			  onSelect={selectKeys => dispatch({type: 'onOrgTreeSelect', params: {selectTreeKey: selectKeys[0]}})}
			  showLine>
			{loop(orgTreeData)}
		</Tree>
	);
}

function mapStateToProps(state) {
	return {
		orgTreeData: state.orgTreeData,
		selectTreeKey: state.selectTreeKey,
	}
}

export default connect(mapStateToProps)(OrgTree);
